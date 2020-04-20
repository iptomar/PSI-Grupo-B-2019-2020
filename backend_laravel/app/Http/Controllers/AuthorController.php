<?php

namespace App\Http\Controllers;


use App\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{

    /**
     * Method/endpoint to get all authors paginated
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $authors = Author::paginate(15);
        return response()->json($authors, 200);
    }

    /**
     * Method/endpoint to get all information related to an author
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id){
        $author = Author::findOrFail($id);
        return response()->json(['author' => $author], 200);
    }

    /**
     * Method/endpoint to create new author
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string'
        ]);

        $author = new Author(['name' => $request->name]);
        $author->save();

        return response()->json(['author' => $author], 201);
    }

    /**
     * Method/endpoint to update author
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request)
    {
        $author = Author::findOrFail($id);

        $this->validate($request, [
            'name' => 'nullable|string'
        ]);

        $author->update($request->only(['name']));
        $author->save();
        return response()->json(['author' => $author], 200);
    }

    /**
     * Method/endpoint to delete an author
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $author = Author::findOrFail($id);
        $response = $author->delete();
        return response()->json($response, 200);
    }

}