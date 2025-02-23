<?php 
namespace App\Repositories\Permisstion\Action;

interface ActionInterface{
    
    public function getList($request);
    public function create($request);
    public function update($request, $id);
    public function delete($id);
}