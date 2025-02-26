<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class BillTypeFormPayment extends Enum
{
    const BANKPAYMENTVALUE =  "bank";
    const VNPAYPAYMENTVALUE = "vnpay";
    const MOMOPAYMENTVALUE = "momo";
}
