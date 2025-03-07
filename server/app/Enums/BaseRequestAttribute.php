<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class BaseRequestAttribute extends Enum
{
    const PAGE_DEFAULT = 1;
    const LIMIT_DEFAULT = 10;
    const DEFAULT_NULL =  null;
}
