<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Twilio\Rest\Client;
class testSmsController extends Controller
{
    protected $twilio;

    public function __construct(Client $twilio)
    {
        $this->twilio = $twilio;
    }

    public function sendSms()
    {
        $this->twilio->messages->create("+84334206603", [
            'from' => env('TWILIO_TEST_FROM'), 
            'body' => "Xin chào",
        ]);

        return response()->json(['success' => true]);
    }
}
