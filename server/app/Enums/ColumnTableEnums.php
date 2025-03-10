<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class ColumnTableEnums extends Enum
{
    const COLUMNTABLESEARCHDEFAULT = ['name', 'code'];

    const COLUMNTABLESELECTROOM = ['id', 'name', 'code'];
 
}
