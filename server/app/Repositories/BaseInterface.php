<?php 
namespace App\Repositories;
interface BaseInterface{
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
    );

    public function getStartDateBill();

    public function getEndDateBill();
}