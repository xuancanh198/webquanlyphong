<?php

namespace App\Service\Function\Action;

use App\Models\User\BilDetailModel;
use App\Models\User\ContractModel;
class Bill
{

    public function getRoomInfo($roomId)
    {
        $room = ContractModel::where('roomId', $roomId)->first();
        return $room;
    }
    public function BillService($services, $BillId)
    {
        try {
            foreach ($services as $key => $service) {
               BilDetailModel::create([
                    'bill_id' => $BillId,
                    'seviceId' => $service['serviceId'],
                    'quantity' => $service['quantity'],
                    'price' => $service['price'],
                ]);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    public function updateBillService($services, $billId)
    {
       
        $existingNotServicesId = BilDetailModel::where('bill_id', $billId)->whereNotIn('id', $this->getIdInArray($services))->pluck('id')
            ->toArray();
        $this->deleteBillServiceAll($existingNotServicesId);
        try {
            foreach ($services as $key => $service) {
                if (!isset($service['id'])) {
                    BilDetailModel::create([
                        'bill_id' => $billId,
                       'seviceId' => $service['serviceId'],
                        'quantity' => $service['quantity'],
                    ]);
                } else {
                    BilDetailModel::where('id', $service['id'])->update([
                        'bill_id' => $billId,
                        'seviceId' => $service['serviceId'],
                        'quantity' => $service['quantity'],
                    ]);
                }
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    public function deleteBillServiceAll($billId)
    {
        try {
            BilDetailModel::where('bill_id', $billId)->delete();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    protected function getIdInArray(array $services): array
    {
        return array_column($services, 'id');
    }
}
