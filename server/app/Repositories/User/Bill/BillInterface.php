<?php 
namespace App\Repositories\User\Bill;
interface BillInterface{
    public function getList($request);
    public function create($request);
    public function update($request, $id);
    public function delete($id);
    public function getMyListUser($request);
    public function find($id);
    public function updateStatus($id, $request);
}