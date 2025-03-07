<?php

namespace App\Service\Function\Execute\User\Transaction;

interface TransactionServiceInterface
{
    public function getList();
    public function createAction();
    public function updateAction($id);
    public function deleteAction($id);

}