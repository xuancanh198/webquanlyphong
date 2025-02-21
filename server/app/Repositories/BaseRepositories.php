<?php

namespace App\Repositories;

use App\Models\System\SettingModel;
use Carbon\Carbon;
use App\Enums\LableSystem;

class BaseRepositories implements BaseInterface
{
    public function getListBaseFun(
        $model,
        $page = 1,
        $limit = 10,
        $search,
        $columSearch,
        $excel = false,
        $typeTime = null,
        $start = null,
        $end = null,
        $filtersBase64 = null,
        $isSelect = false,
        $columSelect = [],
        $filterBaseDecode = null
    ) {
        $query = $model->newQuery();

        if ($isSelect === true) {

            try {
                $query->select($columSelect);
            } catch (\Throwable $e) {
            }
        }

        if ($excel === true) {
            return $query->get();
        }

        if ($search !== null) {
            try {
                foreach ($columSearch as $index => $item) {
                    if ($index === 0) {
                        $query->where($item, 'LIKE', '%' . $search . '%');
                    } else {
                        $query->orWhere($item, 'LIKE', '%' . $search . '%');
                    }
                }
            } catch (\Throwable $e) {
            }
        }

        if ($start !== null && $end !== null && $typeTime !== null) {
            try {
                $query->whereBetween($typeTime, [$start, $end]);
            } catch (\Throwable $e) {
            }
        }
        if ($filterBaseDecode !== null) {
            try {
                $filterDecode = json_decode(base64_decode($filterBaseDecode));
                foreach ($filterDecode as $item) {
                    if ($item?->type === LableSystem::FILTER_TYPE_CHECK_NULL) {
                        if ($item?->value === LableSystem::FILTER_VALUE_NULL) {
                            $query->whereNull($item->column);
                        } elseif ($item?->value === LableSystem::FILTER_VALUE_NOT_NULL) {
                            $query->whereNotNull($item->column);
                        }
                    } elseif ($item?->type === LableSystem::FILTER_TYPE_COLUMN) {
                        $query->where($item->column, $item->value);
                    } elseif ($item?->type === LableSystem::FILTER_TYPE_RELATIONSHIP && $item?->relationship) {
                        $query->whereHas($item->relationship, function ($query) use ($item) {
                            $query->whereIn($item->column, $item->value);
                        });
                    } elseif ($item?->type === LableSystem::FILTER_TYPE_RELATIONSHIP && $item?->relationship) {
                        $query->where($item->column, (int) $item->value);
                    } elseif ($item?->type === LableSystem::FILTER_TYPE_METHOD) {
                        $method = $item->column;
                        $query->$method((int) $item->value);
                    } elseif ($item?->type === LableSystem::FILTER_CHECK_TIME_NOW) {
                        $query->where($item->column, $item->value, Carbon::now());
                    }
                }
            } catch (\Throwable $e) {
            }
        }
        if ($filtersBase64 !== null) {
            try {
                $arrayFilter = json_decode(base64_decode($filtersBase64), true);
                foreach ($arrayFilter as $item) {
                    $query->orderBy($item['colum'], $item['order_by']);
                }
            } catch (\Throwable $e) {
            }
        }
        try {
            $result = $query->paginate($limit, ['*'], 'page', $page);
            return $result;
        } catch (\Throwable $e) {
            return null;
        }
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
}
