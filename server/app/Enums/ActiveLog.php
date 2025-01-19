<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class ActiveLog extends Enum
{
    const ROLE_VALUE = "role";
    const STAFF_VALUE = "staff";
    const TYPEROOM_VALUE = "typeRoom";
    const BUILDING_VALUE = "building";
    const FLOOR_VALUE = "floor";
    const SERVICE_VALUE = 'service';
    const FURNITURE_VALUE = 'furniture';
    const ROOM_VALUE = "room";
    const USER_VALUE = "user";
    const CONTRACT_VALUE = "contract";
    const BILL_VALUE = "bill";
    const PERMISSTION_VALUE = "permisstion";
    const ACTION_VALUE = "action";
    const PERMISSTION_DETAIL_VALUE = 'permisstion_detail';
    const SETTING_VALUE = "setting";
    const TYPE_LOG_ADMIN = "adminAction";
    const TYPE_LOG_USER = "userAction" ;
}
