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

        $router->post('/buildings', 'BuildingController@store');
        $router->patch('/buildings/{id}', 'BuildingController@update');
        $router->delete('/buildings/{id}', 'BuildingController@delete');

        $router->post('/routes', 'RouteController@store');
        $router->patch('/routes/{id}', 'RouteController@update');
        $router->delete('/routes/{id}', 'RouteController@delete');

        $router->post('/routes', 'RouteController@store');
        $router->patch('/routes/{id}', 'RouteController@update');
        $router->delete('/routes/{id}', 'RouteController@delete');

        $router->post('/authors', 'AuthorController@store');
        $router->patch('/authors/{id}', 'AuthorController@update');
        $router->delete('/authors/{id}', 'AuthorController@delete');
    });

    //No-auth routes
    $router->get('/buildings', 'BuildingController@index');
    $router->get('/buildings/{id}', 'BuildingController@show');

    $router->get('/authors', 'AuthorController@index');
    $router->get('/authors/{id}', 'AuthorController@show');
    
    $router->post('/login','UserController@login');

    $router->get('/routes', 'RouteController@index');
    $router->get('/routes/{id}', 'RouteController@show');
});