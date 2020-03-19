<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Route extends Model
{

    protected $fillable = [
        'name'
    ];

    public function buildings(){
        return $this->belongsToMany('\App\Building');
    }
}