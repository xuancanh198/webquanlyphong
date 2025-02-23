<?php 
namespace App\Repositories\Permisstion\PermisstionDetail;

interface PermisstionDetailInterface{
    
    public function getList($request);
    public function create($request);
    public function update($request, $id);
    public function delete($id);
}