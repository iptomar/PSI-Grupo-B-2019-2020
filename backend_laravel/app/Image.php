<?php
/**
 * Created by PhpStorm.
 * User: marce
 * Date: 19/03/2020
 * Time: 22:44
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class Image extends Model
{

    protected $fillable=[
        'description','sourceAuthor','base64','building_id'
    ];

    protected $hidden=['created_at','updated_at'];

    public function building(){
        return $this->belongsTo('\App\Building');
    }

}