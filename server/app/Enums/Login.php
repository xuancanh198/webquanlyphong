<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class Login extends Enum
{
    const LOGINUSERBYPASSWORD = "password";
    const LOGINUSERBYEMAIL = 'email';
    const LOGINUSERBYPHONE = 'phone';
}
