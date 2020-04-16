<?php
/**
 * Created by PhpStorm.
 * User: marce
 * Date: 19/03/2020
 * Time: 21:44
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class Building extends Model
{

    protected $fillable=[
        'buildingName','location','dates','buildingType','description','coordinate1','coordinate2'
    ];

    protected $hidden=['created_at','updated_at'];

    //Relacoes
    public function authors(){
        return $this->hasMany('\App\Author');
    }

    public function routes(){
        return $this->belongsToMany('\App\Route', 'buildings_routes');
    }

    public function vertices(){
        return $this->hasMany('\App\Vertice');
    }

    public function images(){
        return $this->hasMany('\App\Image');
    }

}