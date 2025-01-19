<?php

namespace App\Service\Function\ServiceFunction;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Response;

class Email
{
    public function sendOTPByEmail(Request $request)
    {
        $otp = rand(10000, 99999);

        
    }
}
