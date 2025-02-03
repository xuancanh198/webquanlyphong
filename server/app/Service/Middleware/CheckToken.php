<?php

namespace App\Service\Middleware;

use Illuminate\Support\Facades\Auth;
use App\Models\OauthTokenModel;
use App\Models\Staff\StaffModel;
use App\Models\User\UserModel;

class CheckToken
{
    public function execute($request)
    {
        $token = $request->bearerToken();
        if ($token) {
            try {
                $decoded = $this->decodeJWT($token);

                if (isset($decoded->jti)) {
                    $jti = $decoded->jti;
                    $auth = OauthTokenModel::where('id', $jti)->first();
                    if (! $auth) {
                        return false;
                    }
                    $data = null;
                    if ($auth->name === "Token admin") {
                        $data =  StaffModel::find($auth->user_id);
                    } else {
                        $data =  UserModel::find($auth->user_id);
                    }
                    Auth::login($data);
                    return true;
                } else {
                    return false;
                }
            } catch (\Exception $e) {
                return false;
            }
        } else {
            return false;
        }
    }

    private function decodeJWT($token)
    {
        list($header, $payload, $signature) = explode('.', $token);
        $decodedPayload = $this->base64UrlDecode($payload);
        return json_decode($decodedPayload);
    }

    private function base64UrlDecode($data)
    {
        $data = str_replace(['-', '_'], ['+', '/'], $data);
        $data = str_pad($data, strlen($data) % 4, '=', STR_PAD_RIGHT);
        return base64_decode($data);
    }
}
