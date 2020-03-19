<?php
/**
 * Created by PhpStorm.
 * User: marce
 * Date: 19/03/2020
 * Time: 22:52
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class Vertice extends Model
{

    protected $fillable=[
        'coordinate1','coordinate2','order','building_id'
    ];

    public function building(){
        return $this->belongsTo('\App\Building');
    }
}