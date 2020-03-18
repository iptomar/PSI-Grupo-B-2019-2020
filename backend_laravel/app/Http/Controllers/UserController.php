<?php
/**
 * Created by PhpStorm.
 * User: marce
 * Date: 17/03/2020
 * Time: 01:06
 */

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    /**
     * Returns standard response with token information
     * @param $token
     * @return \Illuminate\Http\JsonResponse
     */
    public function tokenResponse($token){
        return response()->json([
            'token'=>$token,
            'token_type'=>'bearer',
            'expires_in'=> Auth::factory()->getTTL() * 60
        ], 200);
    }

    /**
     * Endpoint to execute login in the API. Returns token or error (401 - failed login or 422 - password required)
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(Request $request){

        /*
         * Validates the current request given the request it self and the rules (array with ruling - see https://laravel.com/docs/7.x/validation#available-validation-rules)
         * If validation fails auto returns a response with json object of errors and code 422
        */
        $this->validate($request, [
            'email'=>'required|string|email',
            'password'=>'required|string'
        ]);

        //Extracts email and password from request (either as query string or body). Returns array with both
        $creds=$request->only(['email','password']);

        //Tries to login with the email and password extracted before
        $token=Auth::attempt($creds);

        //If it fails returns 401 error and json object with error for message
        if(!$token){
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        //If everything goes as planned returns token information for said user
        return $this->tokenResponse($token);
    }

    /**
     * Method/endpoint to retreive current user information (requires auth)
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(){
        return response()->json(['user' => Auth::user()], 200);
    }

    /**
     * Method/endpoint that returns users with pagination (requires auth)
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(){
        $users = User::paginate(15);
        return response()->json($users, 200);
    }

    /**
     * Method/endpoint to update user
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $user){
        $user = User::findOrFail($user);

        $this->validate($request, [
            'email'=>'nullable|string|email',
            'name'=>'nullable|string',
            'password'=>'nullable|confirmed|string'
        ]);

        $user->update($request->only(['email', 'name']));
        $user->password = app('hash')->make('password');
        $user->save();
        return response()->json(['user' => $user], 200);
    }

    /**
     * Method/endpoint to create new user
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request){
        $this->validate($request, [
            'email'=>'required|string|email',
            'name'=>'required|string',
            'password'=>'required|confirmed|string'
        ]);

        $user = new User(['email' => $request->email ,'name' => $request->name]);
        $user->password = app('hash')->make($request->password);
        $user->save();

        return response()->json(['user' => $user], 201);
    }

    /**
     * Method/endpoint to delete user
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($user){
        $user = User::findOrFail($user);
        $response = $user->delete();
        return response()->json($response, 200);
    }
}