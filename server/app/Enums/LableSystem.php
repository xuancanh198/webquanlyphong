<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class LableSystem extends Enum
{
    const FILTER_TYPE_CHECK_NULL = "checkNull";
    const FILTER_VALUE_NULL = "null";
    const FILTER_VALUE_NOT_NULL = "notNull";
    const FILTER_TYPE_COLUMN = "filterColumn";
    const FILTER_TYPE_RELATIONSHIP = "filterRelationship";
    const FILTER_TYPE_CHECK_STATUS = "checkStatus";
}
