<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserBillGetDataResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code   ,
            'totalMoney' => $this->totalMoney,
            'status' => $this->status,
            'formPayment' => $this->formPayment,
            'image' => $this->image,
            'note' => $this->note,
            'started_at' => $this->started_at,
            'ends_at' => $this->ends_at,
            'pay_at' => $this->pay_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
