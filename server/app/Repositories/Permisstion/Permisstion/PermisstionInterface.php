<?php 
namespace App\Repositories\Permisstion\Permisstion;

interface PermisstionInterface{
    
    public function getList($request);
    public function create($request);
    public function update($request, $id);
    public function delete($id);
}