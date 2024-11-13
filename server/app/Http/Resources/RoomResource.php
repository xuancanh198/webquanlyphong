<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
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
            'length' => $this->length,
            'width' => $this->width,
            'height' => $this->height,
            'acreage' => $this->acreage,
            'status' => $this->status,
            'price' => $this->price,
            'name' => $this->name,
            'code' => $this->code,
            'note' => $this->note,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'img' => $this->img->map(function ($img) {
                return [
                    'id' => $img->id,
                    'imgLink' => $img->imgLink,
                ];
            }),
            'service_room' => $this->service_room->map(function ($serviceRoom) {
                return [
                    'id' => $serviceRoom->id,
                    'service' => [
                        'id' => $serviceRoom->service->id,
                        'name' => $serviceRoom->service->name,
                    ],
                ];
            }),
            'furniture_room' => $this->furniture_room,  // Assuming it's an empty collection, keep it as is
            'building' => [
                'id' => $this->building->id,
                'name' => $this->building->name,
            ],
            'floor' => [
                'id' => $this->floor->id,
                'name' => $this->floor->name,
            ],
            'type_room' => [
                'id' => $this->type_room->id,
                'name' => $this->type_room->name,
            ],
        ];
    }
}
