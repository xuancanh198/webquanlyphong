<?php

namespace App\Service\Function\Execute\User\Payment;


interface PaymentServiceInterface
{
    public function payVNPay();
    public function payViaBankAccount();
}