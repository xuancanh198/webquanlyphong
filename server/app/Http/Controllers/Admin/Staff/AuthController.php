<?php

namespace App\Http\Controllers\Admin\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Passport;
class AuthController extends Controller
{
    public function login(Request $request)
    {
      
        $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);
    
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('Personal Access Token')->accessToken; 
    
            return response()->json([
                'status' => 'success',
                'token' => $token,
            ], 200);
        }
    
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
