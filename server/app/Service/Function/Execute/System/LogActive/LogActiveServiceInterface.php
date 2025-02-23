<?php

namespace App\Service\Function\Execute\System\LogActive;

interface LogActiveServiceInterface
{
    public function getList();
    public function deleteAction($id);
}