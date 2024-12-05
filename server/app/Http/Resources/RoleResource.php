<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoleResource extends JsonResource
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
            'name' => $this->name,
            'role_detail' => $this->role_detail,
            'permission_detail' => $this->permission_detail,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
