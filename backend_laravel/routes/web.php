<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

//All api routes go under this group
$router->group(['prefix'=>'api'], function()use($router){

    //All routes that need authentication go under this group
    $router->group([ 'middleware'=>'auth' ], function() use ($router) {
        $router->get('/me','UserController@me');
        $router->get('/users','UserController@index');
        $router->patch('/users/{user}','UserController@update');
        $router->post('/users','UserController@store');
        $router->delete('/users/{user}','UserController@delete');
    });

    //No-auth routes
    $router->post('/login','UserController@login'); 
});
