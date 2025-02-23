<?php

namespace App\Repositories\Staff\Role;

interface RoleInterface{

    public function getList($request);
    public function create($request);
    public function update($request, $id);
    public function delete($id);
}