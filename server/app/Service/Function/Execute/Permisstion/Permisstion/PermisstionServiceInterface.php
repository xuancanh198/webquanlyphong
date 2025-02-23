<?php

namespace App\Service\Function\Execute\Permisstion\Permisstion;

interface PermisstionServiceInterface
{
    public function getList();
    public function createAction();
    public function updateAction($id);
    public function deleteAction($id);
}