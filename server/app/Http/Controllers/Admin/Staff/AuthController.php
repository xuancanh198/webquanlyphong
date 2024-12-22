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

            $tokenResult = $user->createToken('Token admin', ['admin']);
            $accessToken = $tokenResult->accessToken;
            $token = $tokenResult->token;
            $token->expires_at = now()->addDays(7);
            $token->save();
            return response()->json([
                'status' => 'success',
                'token' => $accessToken,
                'type' => 'admin'
            ], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }
    public function getMyInfoAccount()
    {
        $staff = Auth::user()->load([
            'role' => function ($query) {
                $query->select('id', 'name'); 
            }
        ]);

        $permissions = $staff->permissions();
        $staff->permission_detail = $permissions;

        return $this->returnData($staff);
    }


}
