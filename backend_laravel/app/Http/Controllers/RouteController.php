<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RouteController extends Controller
{

    /**
     * Method/endpoint to get all routes paginated
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        if($request->user() == null){
            $routes = \App\Route::where('aproved', '=', 1)->orderBy('name','asc')->paginate(15);
            return response()->json($routes, 200);
        }
        else{
            $routes = \App\Route::orderBy('name','asc')->paginate(15);
            return response()->json($routes, 200);
        }     
    }

    /**
     * Method/endpoint to get all information related to a route
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id){
        $route = \App\Route::findOrFail($id);
        $route->buildings = $route->buildings()->with(['authors', 'images', 'vertices'=>function($q){ $q->orderBy('order','asc'); }])->get();

        return response()->json(['route' => $route], 200);
    }

    /**
     * Method/endpoint to create new route
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'buildings'=>'nullable|array',
            'buildings.*'=>'required|numeric|exists:buildings,id'
        ]);

        $route = new \App\Route(['name' => $request->name]);
        $route->aproved=0;
        $route->save();

        if($request->has('buildings')){
            $route->buildings()->sync($request->get('buildings'));
        }

        return response()->json(['route' => $route], 201);
    }

    /**
     * Method/endpoint to update route
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request)
    {
        $route = \App\Route::findOrFail($id);

        $this->validate($request, [
            'name' => 'nullable|string',
            'buildings'=>'nullable|array',
            'buildings.*'=>'required|numeric|exists:buildings,id'
        ]);

        $route->update($request->only(['name']));
        $route->aproved=0;
        $route->save();

        if($request->has('buildings')){
            $route->buildings()->sync($request->get('buildings'));
        }

        return response()->json(['route' => $route], 200);
    }

    /**
     * Method/endpoint to delete a route
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $route = \App\Route::findOrFail($id);
        $response = $route->delete();
        return response()->json($response, 200);
    }


    /**
     * Method/endpoint to approve a route
     * @param $id
     * @param Request $request
     */
    public function approve($id, Request $request){

        $route = \App\Route::findOrFail($id);

        if ($request->user()->cannot('superadmin')) {
            abort(403);
        }

        $route->aproved=1;
        $route->save();


        return response()->json(true,200);

    }
}
