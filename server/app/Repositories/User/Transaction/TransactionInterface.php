<?php 
namespace App\Repositories\User\Transaction;

interface TransactionInterface{
    public function getList($request);
    public function create($data);
    public function update($dataUpdate, $id);
    public function delete($id);
}