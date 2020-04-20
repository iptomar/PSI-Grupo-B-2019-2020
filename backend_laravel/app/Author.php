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
        'name'
    ];

    protected $hidden=['created_at','updated_at'];

}