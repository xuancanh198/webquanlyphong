<?php

namespace App\Service\Function\Execute\Permisstion\PermisstionDetail;

interface PermisstionDetailServiceInterface
{
    public function getList();
    public function createAction();
    public function updateAction($id);
    public function deleteAction($id);
}