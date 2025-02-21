<?php

namespace App\Service\Function\Execute\Room\Furniture;

interface FurnitureServiceInterface
{
    public function getList();
    public function createAction();
    public function updateAction($id);
    public function deleteAction($id);
}