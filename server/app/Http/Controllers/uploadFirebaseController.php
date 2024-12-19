<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service\Function\Action\Firebase;
use App\Models\Category;
class uploadFirebaseController extends Controller
{
    protected $firebaseService;

    public function __construct(Firebase $firebaseService)
    {
        $this->firebaseService = $firebaseService;
    }

    public function upload(Request $request)
    {
        $request->validate([
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('images')) {
            $imageUrls = $this->firebaseService->uploadImages($request->file('images'));
            return response()->json(['message' => 'Images uploaded successfully!', 'urls' => $imageUrls], 200);
        }

        return response()->json(['message' => 'No image file found!'], 400);
    }




     public function findCategory($id){
      $data =   Category::find($id)->getAllChildren();
     }
}
