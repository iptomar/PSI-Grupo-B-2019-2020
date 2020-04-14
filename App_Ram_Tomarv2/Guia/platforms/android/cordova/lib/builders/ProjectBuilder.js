/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/
/* eslint no-self-assign: 0 */
/* eslint no-unused-vars: 0 */

var Q = require('q');
var fs = require('fs');
var path = require('path');
var shell = require('shelljs');
var spawn = require('cordova-common').superspawn.spawn;
var events = require('cordova-common').events;
var CordovaError = require('cordova-common').CordovaError;
var check_reqs = require('../check_reqs');

const MARKER = 'YOUR CHANGES WILL BE ERASED!';
const SIGNING_PROPERTIES = '-signing.properties';
const TEMPLATE =
    '# This file is automatically generated.\n' +
    '# Do not modify this file -- ' + MARKER + '\n';

class ProjectBuilder {
    constructor (rootDirectory) {
        this.root = rootDirectory || path.resolve(__dirname, '../../..');
        this.binDir = path.join(this.root, 'app', 'build', 'outputs', 'apk');
    }

    getArgs (cmd, opts) {
        if (cmd === 'release') {
            cmd = 'cdvBuildRelease';
        } else if (cmd === 'debug') {
            cmd = 'cdvBuildDebug';
        }

        let args = [cmd, '-b', path.join(this.root, 'build.gradle')];

        if (opts.arch) {
            args.push('-PcdvBuildArch=' + opts.arch);
        }

        args.push.apply(args, opts.extraArgs);

        return args;
    }

    /*
    * This returns a promise
    */
    runGradleWrapper (gradle_cmd) {
        var gradlePath = path.join(this.root, 'gradlew');
        var wrapperGradle = path.join(this.root, 'wrapper.gradle');
        if (fs.existsSync(gradlePath)) {
            // Literally do nothing, for some reason this works, while !fs.existsSync didn't on Windows
        } else {
            return spawn(gradle_cmd, ['-p', this.root, 'wrapper', '-b', wrapperGradle], { stdio: 'inherit' });
        }
    }

    readProjectProperties () {
        function findAllUniq (data, r) {
            var s = {};
            var m;
            while ((m = r.exec(data))) {
                s[m[1]] = 1;
            }
            return Object.keys(s);
        }

        var data = fs.readFileSync(path.join(this.root, 'project.properties'), 'utf8');
        return {
            libs: findAllUniq(data, /^\s*android\.library\.reference\.\d+=(.*)(?:\s|$)/mg),
            gradleIncludes: findAllUniq(data, /^\s*cordova\.gradle\.include\.\d+=(.*)(?:\s|$)/mg),
            systemLibs: findAllUniq(data, /^\s*cordova\.system\.library\.\d+=(.*)(?:\s|$)/mg)
        };
    }

    extractRealProjectNameFromManifest () {
        var manifestPath = path.join(this.root, 'app', 'src', 'main', 'AndroidManifest.xml');
        var manifestData = fs.readFileSync(manifestPath, 'utf8');
        var m = /<manifest[\s\S]*?package\s*=\s*"(.*?)"/i.exec(manifestData);
        if (!m) {
            throw new CordovaError('Could not find package name in ' + manifestPath);
        }

        var packageName = m[1];
        var lastDotIndex = packageName.lastIndexOf('.');
        return packageName.substring(lastDotIndex + 1);
    }

    // Makes the project buildable, minus the gradle wrapper.
    prepBuildFiles () {
        // Update the version of build.gradle in each dependent library.
        var pluginBuildGradle = path.join(this.root, 'cordova', 'lib', 'plugin-build.gradle');
        var propertiesObj = this.readProjectProperties();
        var subProjects = propertiesObj.libs;

        // Check and copy the gradle file into the subproject
        // Called by the loop before this function def

        var checkAndCopy = function (subProject, root) {
            var subProjectGradle = path.join(root, subProject, 'build.gradle');
            // This is the future-proof way of checking if a file exists
            // This must be synchronous to satisfy a Travis test
            try {
                fs.accessSync(subProjectGradle, fs.F_OK);
            } catch (e) {
                shell.cp('-f', pluginBuildGradle, subProjectGradle);
            }
        };

        for (var i = 0; i < subProjects.length; ++i) {
            if (subProjects[i] !== 'CordovaLib') {
                checkAndCopy(subProjects[i], this.root);
            }
        }
        var name = this.extractRealProjectNameFromManifest();
        // Remove the proj.id/name- prefix from projects: https://issues.apache.org/jira/browse/CB-9149
        var settingsGradlePaths = subProjects.map(function (p) {
            var realDir = p.replace(/[/\\]/g, ':');
            var libName = realDir.replace(name + '-', '');
            var str = 'include ":' + libName + '"\n';
            if (realDir.indexOf(name + '-') !== -1) {
                str += 'project(":' + libName + '").projectDir = new File("' + p + '")\n';
            }
            return str;
        });

        fs.writeFileSync(path.join(this.root, 'settings.gradle'),
            '// GENERATED FILE - DO NOT EDIT\n' +
            'include ":"\n' + settingsGradlePaths.join(''));

        // Update dependencies within build.gradle.
        var buildGradle = fs.readFileSync(path.join(this.root, 'app', 'build.gradle'), 'utf8');
        var depsList = '';
        var root = this.root;
        var insertExclude = function (p) {
            var gradlePath = path.join(root, p, 'build.gradle');
            var projectGradleFile = fs.readFileSync(gradlePath, 'utf-8');
            if (projectGradleFile.indexOf('CordovaLib') !== -1) {
                depsList += '{\n        exclude module:("CordovaLib")\n    }\n';
            } else {
                depsList += '\n';
            }
        };
        subProjects.forEach(function (p) {
            events.emit('log', 'Subproject Path: ' + p);
            var libName = p.replace(/[/\\]/g, ':').replace(name + '-', '');
            if (libName !== 'app') {
                depsList += '    implementation(project(path: ":' + libName + '"))';
                insertExclude(p);
            }
        });
        // For why we do this mapping: https://issues.apache.org/jira/browse/CB-8390
        var SYSTEM_LIBRARY_MAPPINGS = [
            [/^\/?extras\/android\/support\/(.*)$/, 'com.android.support:support-$1:+'],
            [/^\/?google\/google_play_services\/libproject\/google-play-services_lib\/?$/, 'com.google.android.gms:play-services:+']
        ];

        propertiesObj.systemLibs.forEach(function (p) {
            var mavenRef;
            // It's already in gradle form if it has two ':'s
            if (/:.*:/.exec(p)) {
                mavenRef = p;
            } else {
                for (var i = 0; i < SYSTEM_LIBRARY_MAPPINGS.length; ++i) {
                    var pair = SYSTEM_LIBRARY_MAPPINGS[i];
                    if (pair[0].exec(p)) {
                        mavenRef = p.replace(pair[0], pair[1]);
                        break;
                    }
                }
                if (!mavenRef) {
                    throw new CordovaError('Unsupported system library (does not work with gradle): ' + p);
                }
            }
            depsList += '    implementation "' + mavenRef + '"\n';
        });

        buildGradle = buildGradle.replace(/(SUB-PROJECT DEPENDENCIES START)[\s\S]*(\/\/ SUB-PROJECT DEPENDENCIES END)/, '$1\n' + depsList + '    $2');
        var includeList = '';

        propertiesObj.gradleIncludes.forEach(function (includePath) {
            includeList += 'apply from: "../' + includePath + '"\n';
        });
        buildGradle = buildGradle.replace(/(PLUGIN GRADLE EXTENSIONS START)[\s\S]*(\/\/ PLUGIN GRADLE EXTENSIONS END)/, '$1\n' + includeList + '$2');
        // This needs to be stored in the app gradle, not the root grade
        fs.writeFileSync(path.join(this.root, 'app', 'build.gradle'), buildGradle);
    }

    prepEnv (opts) {
        var self = this;
        return check_reqs.check_gradle()
            .then(function (gradlePath) {
                return self.runGradleWrapper(gradlePath);
            }).then(function () {
                return self.prepBuildFiles();
            }).then(function () {
                // If the gradle distribution URL is set, make sure it points to version we want.
                // If it's not set, do nothing, assuming that we're using a future version of gradle that we don't want to mess with.
                // For some reason, using ^ and $ don't work.  This does the job, though.
                var distributionUrlRegex = /distributionUrl.*zip/;
                var distributionUrl = process.env['CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL'] || 'https\\://services.gradle.org/distributions/gradle-4.10.3-all.zip';
                var gradleWrapperPropertiesPath = path.join(self.root, 'gradle', 'wrapper', 'gradle-wrapper.properties');
                shell.chmod('u+w', gradleWrapperPropertiesPath);
                shell.sed('-i', distributionUrlRegex, 'distributionUrl=' + distributionUrl, gradleWrapperPropertiesPath);

                var propertiesFile = opts.buildType + SIGNING_PROPERTIES;
                var propertiesFilePath = path.join(self.root, propertiesFile);
                if (opts.packageInfo) {
                    fs.writeFileSync(propertiesFilePath, TEMPLATE + opts.packageInfo.toProperties());
                } else if (isAutoGenerated(propertiesFilePath)) {
                    shell.rm('-f', propertiesFilePath);
                }
            });
    }

    /*
    * Builds the project with gradle.
    * Returns a promise.
    */
    build (opts) {
        var wrapper = path.join(this.root, 'gradlew');
        var args = this.getArgs(opts.buildType === 'debug' ? 'debug' : 'release', opts);

        return spawn(wrapper, args, { stdio: 'pipe' })
            .progress(function (stdio) {
                if (stdio.stderr) {
                    /*
                    * Workaround for the issue with Java printing some unwanted information to
                    * stderr instead of stdout.
                    * This function suppresses 'Picked up _JAVA_OPTIONS' message from being
                    * printed to stderr. See https://issues.apache.org/jira/browse/CB-9971 for
                    * explanation.
                    */
                    var suppressThisLine = /^Picked up _JAVA_OPTIONS: /i.test(stdio.stderr.toString());
                    if (suppressThisLine) {
                        return;
                    }
                    process.stderr.write(stdio.stderr);
                } else {
                    process.stdout.write(stdio.stdout);
                }
            }).catch(function (error) {
                if (error.toString().indexOf('failed to find target with hash string') >= 0) {
                    return check_reqs.check_android_target(error).then(function () {
                        // If due to some odd reason - check_android_target succeeds
                        // we should still fail here.
                        return Q.reject(error);
                    });
                }
                return Q.reject(error);
            });
    }

    clean (opts) {
        var builder = this;
        var wrapper = path.join(this.root, 'gradlew');
        var args = builder.getArgs('clean', opts);
        return Q().then(function () {
            return spawn(wrapper, args, { stdio: 'inherit' });
        })
            .then(function () {
                shell.rm('-rf', path.join(builder.root, 'out'));

                ['debug', 'release'].forEach(function (config) {
                    var propertiesFilePath = path.join(builder.root, config + SIGNING_PROPERTIES);
                    if (isAutoGenerated(propertiesFilePath)) {
                        shell.rm('-f', propertiesFilePath);
                    }
                });
            });
    }

    findOutputApks (build_type, arch) {
        return findOutputApksHelper(this.binDir, build_type, arch).sort(apkSorter);
    }

    fetchBuildResults (build_type, arch) {
        return {
            apkPaths: this.findOutputApks(build_type, arch),
            buildType: build_type
        };
    }
}

module.exports = ProjectBuilder;

function apkSorter (fileA, fileB) {
    // De-prioritize arch specific builds
    var archSpecificRE = /-x86|-arm/;
    if (archSpecificRE.exec(fileA)) {
        return 1;
    } else if (archSpecificRE.exec(fileB)) {
        return -1;
    }

    // De-prioritize unsigned builds
    var unsignedRE = /-unsigned/;
    if (unsignedRE.exec(fileA)) {
        return 1;
    } else if (unsignedRE.exec(fileB)) {
        return -1;
    }

    var timeDiff = fs.statSync(fileB).mtime - fs.statSync(fileA).mtime;
    return timeDiff === 0 ? fileA.length - fileB.length : timeDiff;
}

function findOutputApksHelper (dir, build_type, arch) {
    var shellSilent = shell.config.silent;
    shell.config.silent = true;

    // list directory recursively
    var ret = shell.ls('-R', dir).map(function (file) {
        // ls does not include base directory
        return path.join(dir, file);
    }).filter(function (file) {
        // find all APKs
        return file.match(/\.apk?$/i);
    }).filter(function (candidate) {
        var apkName = path.basename(candidate);
        // Need to choose between release and debug .apk.
        if (build_type === 'debug') {
            return /-debug/.exec(apkName) && !/-unaligned|-unsigned/.exec(apkName);
        }
        if (build_type === 'release') {
            return /-release/.exec(apkName) && !/-unaligned/.exec(apkName);
        }
        return true;
    }).sort(apkSorter);

    shellSilent = shellSilent;

    if (ret.length === 0) {
        return ret;
    }
    // Assume arch-specific build if newest apk has -x86 or -arm.
    var archSpecific = !!/-x86|-arm/.exec(path.basename(ret[0]));
    // And show only arch-specific ones (or non-arch-specific)
    ret = ret.filter(function (p) {
        return !!/-x86|-arm/.exec(path.basename(p)) === archSpecific;
    });

    if (archSpecific && ret.length > 1 && arch) {
        ret = ret.filter(function (p) {
            return path.basename(p).indexOf('-' + arch) !== -1;
        });
    }

    return ret;
}

function isAutoGenerated (file) {
    return fs.existsSync(file) && fs.readFileSync(file, 'utf8').indexOf(MARKER) > 0;
}
