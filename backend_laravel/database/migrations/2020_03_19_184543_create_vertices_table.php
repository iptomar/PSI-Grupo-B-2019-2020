<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVerticesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vertices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->double('coordinate1',12,8);
            $table->double('coordinate2',12,8);
            $table->integer('order');
			$table->unsignedBigInteger('building_id');
			$table->foreign('building_id')->references('id')->on('buildings');

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
        Schema::dropIfExists('vertices');
    }
}
