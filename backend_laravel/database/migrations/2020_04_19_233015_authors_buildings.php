<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AuthorsBuildings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
		Schema::create('authors_buildings', function (Blueprint $table) {
	    $table->unsignedBigInteger('building_id');
  	    $table->foreign('building_id')->references('id')->on('buildings');
	    $table->unsignedBigInteger('author_id');
  	    $table->foreign('author_id')->references('id')->on('authors');
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
		Schema::dropIfExists('authors_buildings');
    }
}
