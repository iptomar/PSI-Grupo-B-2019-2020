<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RouteController extends Controller
{

    public function index(Request $request){
        $routes = Route::paginate(15);
        return response()->json($routes, 200);
    }

    public function show($id){

    }

    public function store(Request $request){

    }

    public function update($id, Request $request){
        $route = User::findOrFail($id);

        $this->validate($request, [
            'name'=>'nullable|string'
        ]);

        $route->update($request->only(['name']));
        $route->save();
        return response()->json(['route' => $route], 200);
    }

    public function delete($id){
        $user = User::findOrFail($user);
        $response = $user->delete();
        return response()->json($response, 200);
    }
}