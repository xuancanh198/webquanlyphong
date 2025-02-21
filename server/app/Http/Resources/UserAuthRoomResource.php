<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserAuthRoomResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'length' => $this->length,
            'width' => $this->width,
            'height' => $this->height,
            'acreage' => $this->acreage,
            'status' => $this->status,
            'price' => $this->price,
            'name' => $this->name,
            'code' => $this->code,
            'typeRoom' => $this->type_room->name,
            'floor' => $this->floor->name,
            'building' => $this->building->name,
        ];
    }
}
