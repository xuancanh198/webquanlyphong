<?php 
namespace App\Repositories\User\User;
interface UserInterface{
    public function getList($request);
    public function create($request);
    public function update($request, $id);
    public function delete($id);
}