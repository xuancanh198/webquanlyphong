<?php

namespace App\Service\Function\Action;

use App\Models\Room\RoomServiceModel;
use App\Models\Room\RoomFurnitureModel;
use App\Models\Room\RoomImageModel;
use Carbon\Carbon;
use App\Service\Function\Action\Firebase;

class Room
{

    public function roomImg($images, $roomId)
    {
        $imageGetFirebase = app(Firebase::class)->uploadImages($images);
        try {
            foreach ($imageGetFirebase as $key => $image) {
                RoomImageModel::create([
                    'roomId' => $roomId,
                    'imgLink' => $image
                ]);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    public function updateRoomImg($images, $roomId)
    {
        $imageGetFirebase = app(Firebase::class)->uploadImages($images);
        RoomImageModel::where('roomId', $roomId)->delete();
        try {
            foreach ($imageGetFirebase as $key => $image) {
                RoomImageModel::create([
                    'roomId' => $roomId,
                    'imgLink' => $image
                ]);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    public function roomService($services, $roomId)
    {
        try {
            foreach ($services as $key => $service) {
                RoomServiceModel::create([
                    'roomId' => $roomId,
                    'serviceId' => $service
                ]);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    protected function getIdInArray(array $services): array
    {
        return array_column($services, 'id');
    }
    public function updateRoomService($services, $roomId)
    {
        $decodedServices = [];
        foreach ($services as $service) {
            $decodedServices[] = json_decode($service, true);
        }
        $existingNotServicesId = RoomServiceModel::where('roomId', $roomId)->whereNotIn('id', $this->getIdInArray($decodedServices))->pluck('id')
            ->toArray();
        $this->deleteRoomService($existingNotServicesId);
        try {
            foreach ($decodedServices as $key => $service) {
                if (!isset($service['id'])) {
                    RoomServiceModel::create([
                        'roomId' => $roomId,
                        'serviceId' => $service['serviceId']
                    ]);
                } else {
                    RoomServiceModel::where('id', $service['id'])->update([
                        'roomId' => $roomId,
                        'serviceId' => $service['serviceId']
                    ]);
                }
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    public function roomFurniture($furnitures, $roomId)
    {

        try {
            foreach ($furnitures as $key => $furniture) {
                $data = json_decode($furniture, true);
                $this->createRoomFurniture($data, $roomId);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    public function updateRoomFurniture($furnitures, $roomId)
    {
        $decodedFurnitures = [];

        foreach ($furnitures as $furniture) {
            $decodedFurnitures[] = json_decode($furniture, true);
        }

        $existingNotFurnitureId = RoomFurnitureModel::where('roomId', $roomId)->whereNotIn('id', $this->getIdInArray($decodedFurnitures))->pluck('id')
            ->toArray();
        $this->deleteRoomFurniture($existingNotFurnitureId);
        try {
            foreach ($decodedFurnitures as $furniture) {
                if (!isset($furniture['id'])) {
                    RoomFurnitureModel::create([
                        'roomId' => $roomId,
                        'furnitureId' => $furniture['furnitureId'],
                        'quantity' => $furniture['quantity'],
                    ]);
                } else {
                    RoomFurnitureModel::where('id', $furniture['id'])->update([
                        'roomId' => $roomId,
                        'furnitureId' => $furniture['furnitureId'],
                        'quantity' => $furniture['quantity'],
                    ]);
                }
            }

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function createRoomFurniture($furniture, $roomId)
    {
        return  RoomFurnitureModel::create([
            'roomId' => $roomId,
            'furnitureId' => intval($furniture['furnitureId']),
            'quantity' => intval($furniture['quantity'])
        ]);
    }
    public function deleteRoomService(array $arrId)
    {
        return RoomFurnitureModel::whereIn('id', $arrId)->delete();
    }
    public function deleteRoomFurniture(array $arrId)
    {
        return RoomFurnitureModel::whereIn('id', $arrId)->delete();
    }
    public function deleteRoomImgAll($roomId)
    {
        try {
            RoomImageModel::where('roomId', $roomId)->delete();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    public function deleteRoomServiceAll($roomId)
    {
        try {
            RoomServiceModel::where('roomId', $roomId)->delete();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    public function deleteRoomFurnitureAll($roomId)
    {
        try {
            RoomFurnitureModel::where('roomId', $roomId)->delete();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
