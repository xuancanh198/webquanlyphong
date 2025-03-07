<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service\Function\Execute\User\Payment\PaymentServiceInterface;
class PaymentController extends Controller
{
    protected $paymentService;
    public function __construct(PaymentServiceInterface $paymentService) {
        $this->paymentService = $paymentService;
    }
    public function payBill(){
        
    }
}
