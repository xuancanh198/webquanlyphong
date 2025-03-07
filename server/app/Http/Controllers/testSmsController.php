<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redis;

class testSmsController extends Controller
{


    public function index()
    {
        Redis::set('name', 'Laravel');
        dd(Redis::set('name', 'Laravel'));
        $name = Redis::get('name');
       dd($name);
    }
}
