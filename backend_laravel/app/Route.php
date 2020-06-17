<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Route extends Model
{

    protected $fillable = [
        'name', 'aproved'
    ];

    protected $hidden=['created_at','updated_at'];

    public function buildings(){
        return $this->belongsToMany('\App\Building', 'buildings_routes');
    }
}