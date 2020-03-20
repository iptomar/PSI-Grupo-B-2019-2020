<?php
/**
 * Created by PhpStorm.
 * User: marce
 * Date: 19/03/2020
 * Time: 22:17
 */

namespace App\Http\Controllers;


use App\Building;
use App\Image;
use App\Vertice;
use Illuminate\Http\Request;

class BuildingController extends Controller
{

    public function index(Request $request){

    }

    public function show($id){

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

            'vertices'=>'required|array|min:3',
            'vertices.*.coordinate1'=>'required|numeric',
            'vertices.*.coordinate2'=>'required|numeric',
            'vertices.*.order'=>'required|numeric|min:0',

            'images'=>'nullable|array|min:1',
            'images.*.image'=>'required|image|max:1000',
            'images.*.sourceAuthor'=>'required|string|min:1',
            'images.*.description'=>'required|string|min:1',

            'authors'=>'nullable|array|min:1',
            'authors.*.name'=>'required|string|min:1'

        ];

        $this->validate($request,$rules);

        $building=Building::create($request->only('buildingName','location','dates','buildingType','description','coordinate1','coordinate2'));

        $vertices=[];

        foreach($request->vertices as $v){
            array_push($vertices, new Vertice($v));
        }

        $building->vertices()->delete();
        $building->vertices()->saveMany($vertices);



        if($request->images != null){
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
        }


        return response()->json(['building'=>$building],200);

    }

    public function update($id,Request $request){

    }

    public function delete($id){

    }
}