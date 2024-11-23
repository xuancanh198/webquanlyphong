<?php

namespace App\Service\Function\Base;
use Carbon\Carbon;

class BaseService
{
    public function getListBaseFun($model, $page = 1, $limit = 10, $search, $columSearch, $excel = false, $typeTime = null, $start = null, $end = null, $filtersBase64 = null, $isSelect = false, $columSelect = [])
    {
        $query = $model->newQuery();
        if($isSelect === true){
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
 
        if($filtersBase64 !== null){
            $arrayFilter = json_decode(base64_decode($filtersBase64), true);
           foreach($arrayFilter as $key => $item){
            $query->orderBy($item['colum'], $item['order_by']);
           }
        }
        $result =  $query->paginate($limit, ['*'], 'page', $page);
        return $result;
    }
   
}
