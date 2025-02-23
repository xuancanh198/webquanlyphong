<?php

namespace App\Service\Function\Execute\Permisstion\Action;

interface ActionServiceInterface
{
    public function getList();
    public function createAction();
    public function updateAction($id);
    public function deleteAction($id);
}