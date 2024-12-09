<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StaffResource extends JsonResource
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
            'role_id' => $this->role_id,
            'username' => $this->username,
            'phoneNumber' => $this->phoneNumber,
            'email' => $this->email,
            'password_default' => $this->password_default,
            'fullname' => $this->fullname,
            'permission_detail' => $this->permission_detail,
            'address' => $this->address,
            'note' => $this->note,
            'img' => $this->img,
            'status' => $this->status,
            'role_detail' => $this->role_detail,
            'ban_at' => $this->ban_at,
            'ban_expiration_at' => $this->ban_expiration_at,
            'verify_email_at' => $this->verify_email_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'role' => [
                'id' => $this->role->id,
                'name' => $this->role->name,
            ],
        ];
    }
}
