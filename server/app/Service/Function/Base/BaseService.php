<?php

namespace App\Service\Function\Base;
use Carbon\Carbon;

class BaseService
{
    public function getListBaseFun($model, $page = 1, $limit = 10, $search, $columSearch, $excel = false, $typeTime = null, $start = null, $end = null)
    {
        if ($excel === true) {
            return $model->get();
        }
        $query = $model->newQuery();
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
        $result =  $query->paginate($limit, ['*'], 'page', $page);

        return $result;
    }
   
}
