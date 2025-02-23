<?php 
namespace App\Repositories\User\Contract;
interface ContractInterface{
    public function getList($request);
    public function create($request);
    public function update($request, $id);
    public function delete($id);
}