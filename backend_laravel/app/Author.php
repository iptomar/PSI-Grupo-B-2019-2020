<?php
/**
 * Created by PhpStorm.
 * User: marce
 * Date: 19/03/2020
 * Time: 21:51
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class Author extends Model
{

    protected $fillable=[
        'name','building_id'
    ];

    public function building(){
        return $this->belongsTo('\App\Building');
    }

}