<?php 

namespace App\Service\Middleware;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
class CheckToken 
{
    
    public function execute($request){
        $token = $request->bearerToken();
       
        if ($token) {
            $accessToken = PersonalAccessToken::findToken($token);    
            if ($accessToken) {
               
                Auth::login($accessToken->tokenable);
            } else {
                return 401;
            }
        } else {
            return 401;
        }

    }
}