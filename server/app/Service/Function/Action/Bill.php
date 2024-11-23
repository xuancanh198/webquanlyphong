<?php

namespace App\Service\Function\Action;

use App\Models\User\Contract\FurnitureContractModel;
use App\Models\User\Contract\UserContractModel;
use App\Models\User\Contract\ServiceContractModel;
use App\Models\Room\RoomModel;
class Bill
{

    public function getRoomInfo($roomId)
    {   
        $room = RoomModel::find($roomId);
        dd($room);
        return true;
    }
    public function ContractService($services, $ContractId)
    {
        try {
            foreach ($services as $key => $service) {
                $data = json_decode($service, true);
                ServiceContractModel::create([
                    'contractId' => $ContractId,
                    'serviceId' => $data['serviceId'],
                    'quantity' => $data['quantity'],
                ]);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    public function ContractCustomers($customers, $ContractId)
    {
        try {
            foreach ($customers as $key => $customer) {
                UserContractModel::create([
                    'contractId' => $ContractId,
                    'userId' => $customer,
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
    public function updateContractService($services, $ContractId)
    {
        $decodedServices = [];
        foreach ($services as $service) {
            $decodedServices[] = json_decode($service, true);
        }
        $existingNotServicesId = ServiceContractModel::where('contractId', $ContractId)->whereNotIn('id', $this->getIdInArray($decodedServices))->pluck('id')
            ->toArray();
        $this->deleteContractService($existingNotServicesId);
        try {
            foreach ($decodedServices as $key => $service) {
                if (!isset($service['id'])) {
                    ServiceContractModel::create([
                        'contractId' => $ContractId,
                        'serviceId' => $service['serviceId']
                    ]);
                } else {
                    ServiceContractModel::where('id', $service['id'])->update([
                        'contractId' => $ContractId,
                        'serviceId' => $service['serviceId']
                    ]);
                }
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    public function updateContractCustomers($customers, $ContractId)
    {
        
        $decodedCustomers = [];
        foreach ($customers as $customer) {
            $decodedCustomers[] = json_decode($customer, true);
        }
        $existingNotServicesId = UserContractModel::where('contractId', $ContractId)->whereNotIn('id', $this->getIdInArray($decodedCustomers))->pluck('id')
            ->toArray();
        $this->deleteContractService($existingNotServicesId);
     
       try {
            foreach ($decodedCustomers as $key => $user) {
                if (!isset($user['id'])) {
                    UserContractModel::create([
                        'contractId' => $ContractId,
                        'userId' => $user['user_id']
                    ]);
                } else {
                    UserContractModel::where('id', $user['id'])->update([
                        'contractId' => $ContractId,
                        'userId' => $user['user_id']
                    ]);
                }
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    public function ContractFurniture($furnitures, $ContractId)
    {

        try {
            foreach ($furnitures as $key => $furniture) {
                $data = json_decode($furniture, true);
                $this->createContractFurniture($data, $ContractId);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    public function updateContractFurniture($furnitures, $ContractId)
    {
        $decodedFurnitures = [];

        foreach ($furnitures as $furniture) {
            $decodedFurnitures[] = json_decode($furniture, true);
        }

        $existingNotFurnitureId = FurnitureContractModel::where('contractId', $ContractId)->whereNotIn('id', $this->getIdInArray($decodedFurnitures))->pluck('id')
            ->toArray();
        $this->deleteContractFurniture($existingNotFurnitureId);
        try {
            foreach ($decodedFurnitures as $furniture) {
                if (!isset($furniture['id'])) {
                    FurnitureContractModel::create([
                        'contractId' => $ContractId,
                        'furnitureId' => $furniture['furnitureId'],
                        'quantity' => $furniture['quantity'],
                    ]);
                } else {
                    FurnitureContractModel::where('id', $furniture['id'])->update([
                        'contractId' => $ContractId,
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

    public function createContractFurniture($furniture, $ContractId)
    {
        return  FurnitureContractModel::create([
            'contractId' => $ContractId,
            'furnitureId' => intval($furniture['furnitureId']),
            'quantity' => intval($furniture['quantity'])
        ]);
    }
    public function deleteContractService(array $arrId)
    {
        return FurnitureContractModel::whereIn('id', $arrId)->delete();
    }
    public function deleteContractFurniture(array $arrId)
    {
        return FurnitureContractModel::whereIn('id', $arrId)->delete();
    }
    public function deleteContractServiceAll($ContractId)
    {
        try {
            ServiceContractModel::where('contractId', $ContractId)->delete();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    public function deleteContractFurnitureAll($ContractId)
    {
        try {
            FurnitureContractModel::where('contractId', $ContractId)->delete();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    public function deleteContractCustomersAll($ContractId)
    {
        try {
            UserContractModel::where('contractId', $ContractId)->delete();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
