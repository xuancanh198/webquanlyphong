<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cache;

class testSmsController extends Controller
{
   
    public function sendSms()
    {
        Cache::put('user_1', ['name' => 'John', 'age' => 30], 3600);

        // Lấy dữ liệu từ cache Redis
        $user = Cache::get('user_1');

        return response()->json($user);
    }
}
