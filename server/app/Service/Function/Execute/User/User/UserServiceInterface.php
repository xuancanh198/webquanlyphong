<?php

namespace App\Service\Function\Execute\User\User;

interface UserServiceInterface
{
    public function getList();
    public function createAction();
    public function updateAction($id);
    public function deleteAction($id);
}