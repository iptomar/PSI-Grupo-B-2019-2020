<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Create first user (superadmin)
        $user=new \App\User(['email'=>'admin@admin.com','name'=>'Admin']);
        $user->password=app('hash')->make('password');
        $user->save();

    }
}
