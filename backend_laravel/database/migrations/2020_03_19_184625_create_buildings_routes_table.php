<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBuildingsRoutesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('buildings_routes', function (Blueprint $table) {
	    $table->unsignedBigInteger('building_id');
  	    $table->foreign('building_id')->references('id')->on('buildings');
	    $table->unsignedBigInteger('route_id');
  	    $table->foreign('route_id')->references('id')->on('routes');

	    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('buildings_routes');
    }
}
