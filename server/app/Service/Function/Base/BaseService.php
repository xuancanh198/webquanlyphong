<?php

namespace App\Service\Function\Base;

use Carbon\Carbon;
use Illuminate\Support\Str;

class BaseService
{
    public function getListBaseFun($model, $page = 1, $limit = 10, $search, $columSearch, $excel = false, $typeTime = null, $start = null, $end = null, $filtersBase64 = null, $isSelect = false, $columSelect = [])
    {
        $query = $model->newQuery();
        if ($isSelect === true) {
            $query->select($columSelect);
        }

        if ($excel === true) {
            return $query->get();
        }
        if ($search !== null) {
            foreach ($columSearch as $index => $item) {
                if ($index === 0) {
                    $query->where($item, 'LIKE', '%' . $search . '%');
                } else {
                    $query->orWhere($item, 'LIKE', '%' . $search . '%');
                }
            }
        }
        if ($start !== null && $end !== null && $typeTime !== null) {
            $query->whereBetween($typeTime, [$start, $end]);
        }

        if ($filtersBase64 !== null) {
            $arrayFilter = json_decode(base64_decode($filtersBase64), true);
            foreach ($arrayFilter as $key => $item) {
                $query->orderBy($item['colum'], $item['order_by']);
            }
        }
        $result =  $query->paginate($limit, ['*'], 'page', $page);
        return $result;
    }
    public function getStartDateBill()
    {
        $day = setting('start.date.bill');
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;
        return  $startDate = Carbon::createFromDate($currentYear, $currentMonth, (int)$day)->startOfDay();
    }

    public function getEndDateBill()
    {
        $day = setting('end.date.bill');
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;
        $nextMonth = $currentMonth + 1;
        if ($nextMonth > 12) {
            $nextMonth = 1;
            $currentYear += 1;
        }
        $endDate = Carbon::createFromDate($currentYear, $nextMonth, (int)$day)->endOfDay();

        return $endDate;
    }
    public function generateUniqueCode($model, $colum)
    {
        $letters = Str::upper(Str::random(6));
        $numbers = rand(100000, 999999);
        $code = $letters . $numbers;

        while ($model::where( $colum, $code)->exists()) {
            $letters = Str::upper(Str::random(6));
            $numbers = rand(100000, 999999);
            $code = $letters . $numbers;
        }

        return $code;
    }
}
