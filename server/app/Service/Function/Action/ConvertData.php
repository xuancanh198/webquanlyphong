<?php

namespace App\Service\Function\Action;

use Carbon\Carbon;
class ConvertData
{
    function convertDateTimeFormat($dateString, $hour = '00', $minute = '00', $second = '00') {
        $date = Carbon::createFromFormat('m/d/Y', $dateString);
                if ($date) {
            return $date->setTime($hour, $minute, $second)->format('Y-m-d H:i:s');
        }
        return null;
    }
}