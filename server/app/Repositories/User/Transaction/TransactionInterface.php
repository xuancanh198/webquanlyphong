<?php 
namespace App\Repositories\User\Transaction;

interface TransactionInterface{
    public function getList($request);
    public function create($request);
    public function update($request, $id);
    public function delete($id);
}