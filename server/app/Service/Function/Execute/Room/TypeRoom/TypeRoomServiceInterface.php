<?php

namespace App\Service\Function\Execute\Room\TypeRoom;

interface TypeRoomServiceInterface
{
    public function getList();
    public function createAction();
    public function updateAction($id);
    public function deleteAction($id);
}