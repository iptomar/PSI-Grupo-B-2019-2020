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


}