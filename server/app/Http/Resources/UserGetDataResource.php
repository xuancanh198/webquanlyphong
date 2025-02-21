<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserBillGetDataResource;
use App\Http\Resources\UserContractGetDataResource;
use App\Http\Resources\UserAuthRoomResource;
use App\Http\Resources\UserRoommatesResource;
class UserGetDataResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'username' => $this->username,
            'fullname' => $this->fullname,
            'email' => $this->email,
            'dateOfBirth' => $this->dateOfBirth,
            'phoneNumber' => $this->phoneNumber,
            'address' => $this->address,
            'dateIssuanceCard' => $this->dateIssuanceCard,
            'placeIssue' => $this->placeIssue,
            'identificationCard' => $this->identificationCard,
            'imgLink' => $this->imgLink,
            'isVerifiedInfor' => $this->isVerifiedInfor,
            'status' => $this->status,
            'room' =>new UserAuthRoomResource($this->getMyRoom()),
            'roommates' => UserRoommatesResource::collection($this->getRoommates()),
            'contractNow' => new UserContractGetDataResource($this->getMyContractNow()),
            'billNow' => new UserBillGetDataResource($this->getMyBillNow()),
            'contracts' => UserContractGetDataResource::collection($this->getMyContracts()),
            'bills' => UserBillGetDataResource::collection($this->getMyBills()),
        ];
    }
}
