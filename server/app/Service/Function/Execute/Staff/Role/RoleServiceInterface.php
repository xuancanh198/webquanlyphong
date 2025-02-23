<?php

namespace App\Service\Function\Execute\Staff\Role;

interface RoleServiceInterface
{
    public function getList();
    public function createAction();
    public function updateAction($id);
    public function deleteAction($id);
}