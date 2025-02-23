<?php

namespace App\Service\Function\Execute\User\Contract;

interface ContractServiceInterface
{
    public function getList();
    public function createAction();
    public function updateAction($id);
    public function deleteAction($id);

    public function getDataInRoom($roomId, $model, $relationship);
}