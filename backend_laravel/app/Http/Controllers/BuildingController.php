<?php
/**
 * Created by PhpStorm.
 * User: marce
 * Date: 19/03/2020
 * Time: 22:17
 */

namespace App\Http\Controllers;


use App\Author;
use App\Building;
use App\Image;
use App\Vertice;
use Illuminate\Http\Request;

class BuildingController extends Controller
{



    protected function saveRelated(Building $building, Request $request){

        if($request->has('authors') && $request->authors != null){
            $building->authors()->sync($request->authors);
        }

        if($request->has('vertices') && $request->vertices != null){
            $vertices=[];

            foreach($request->vertices as $v){
                array_push($vertices, new Vertice($v));
            }

            $building->vertices()->delete();
            $building->vertices()->saveMany($vertices);
        }


        if($request->has('images')){
            $images=[];

            foreach($request->images as $img){


                array_push($images, new Image([
                    'description'=>$img['description'],
                    'sourceAuthor'=>$img['sourceAuthor'],
                    'base64'=>base64_encode(file_get_contents($img['image'])),
                ]));

            }

            $building->images()->delete();
            $building->images()->saveMany($images);
        } else {
            $building->images()->delete();
        }

        if($request->has('routes') && $request->routes != null){
            $building->routes()->sync($request->routes);
        }

        return true;
    }

    public function index(Request $request){

        $buildings=Building::with(['authors','images','routes','vertices'])->orderBy('buildingName','asc')->paginate(10);

        if($request->has('search')){
            $buildings=Building::where('buildingName','like', '%'.$request->search.'%')->orWhere('buildingType','like', '%'.$request->search.'%')->orderBy('buildingName','asc')->with(['authors','images','routes','vertices'])->paginate(10);
        }

        return response()->json($buildings,200);

    }

    public function show($id){

        $building=Building::findOrFail($id);
        return response()->json(['building'=>$building->load(['authors','images','routes','vertices'=>function($q){ $q->orderBy('order','asc'); }])],200);
    }

    public function store(Request $request){

        $rules = [

            //Building
            'buildingName'=>'required|string|min:1',
            'location'=>'required|string|min:1',
            'dates'=>'required|numeric|digits_between:4,4',
            'buildingType'=>'required|string|min:1',
            'description'=>'required|string|min:1',
            'coordinate1'=>'required|numeric',//Latitude
            'coordinate2'=>'required|numeric',//Longitude

            //Vertices
            'vertices'=>'required|array|min:3',
            'vertices.*.coordinate1'=>'required|numeric',//Latitude
            'vertices.*.coordinate2'=>'required|numeric',//Longitude
            'vertices.*.order'=>'required|numeric|min:0',

            //Images
            'images'=>'nullable|array|min:1',
            'images.*.image'=>'required|image|max:1000',
            'images.*.sourceAuthor'=>'required|string|min:1',
            'images.*.description'=>'required|string|min:1',

            //Authors
            'authors'=>'nullable|array',
            'authors.*'=>'required|numeric|exists:authors,id',

            //Routes

            'routes'=>'nullable|array|min:1',
            'routes.*'=>'required|numeric|exists:routes,id'

        ];

        $this->validate($request,$rules);

        $building=Building::create($request->only('buildingName','location','dates','buildingType','description','coordinate1','coordinate2'));
        $building->approved = false;

        $this->saveRelated($building,$request);

        return response()->json(['building'=>$building->load(['authors','images','routes','vertices', 'approved'])],200);

    }

    public function update($id,Request $request){

        $building=Building::findOrFail($id);

        $rules = [

            //Building
            'buildingName'=>'nullable|string|min:1',
            'location'=>'nullable|string|min:1',
            'dates'=>'nullable|numeric|digits_between:4,4',
            'buildingType'=>'nullable|string|min:1',
            'description'=>'nullable|string|min:1',
            'coordinate1'=>'nullable|numeric',//Latitude
            'coordinate2'=>'nullable|numeric',//Longitude

            //Vertices
            'vertices'=>'nullable|array|min:3',
            'vertices.*.coordinate1'=>'required|numeric',//Latitude
            'vertices.*.coordinate2'=>'required|numeric',//Longitude
            'vertices.*.order'=>'required|numeric|min:0',

            //Images
            'images'=>'nullable|array',
            'images.*.image'=>'required|image|max:1000',
            'images.*.sourceAuthor'=>'required|string|min:1',
            'images.*.description'=>'required|string|min:1',

            //Authors
            'authors'=>'nullable|array',
            'authors.*'=>'required|numeric|exists:authors,id',

            //Routes

            'routes'=>'nullable|array|min:1',
            'routes.*'=>'required|numeric|exists:routes,id'

        ];

        $this->validate($request,$rules);

        $building->update($request->only('buildingName','location','dates','buildingType','description','coordinate1','coordinate2'));

        $this->saveRelated($building,$request);

        return response()->json(['building'=>$building->load(['authors','images','routes','vertices'])],200);

    }

    public function delete($id){
        $building=Building::findOrFail($id);

        $building->authors()->delete();
        $building->routes()->detach();
        $building->vertices()->delete();
        $building->images()->delete();
        $building->delete();

        return response()->json(['success'=>true],200);

    }
}