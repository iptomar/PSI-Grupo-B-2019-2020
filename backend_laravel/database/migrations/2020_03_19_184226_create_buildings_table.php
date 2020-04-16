<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBuildingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('buildings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('buildingName',255);
            $table->string('location',255);
            $table->string('dates',10);
            $table->string('buildingType',255);
            $table->text('description');
            $table->string('coordinate1',255);
            $table->string('coordinate2',255);

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
        Schema::dropIfExists('buildings');
    }
}
