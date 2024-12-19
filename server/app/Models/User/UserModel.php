<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\User\ContractModel;
use App\Models\User\Contract\UserContractModel;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class UserModel extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = "tbl_user";
    protected $primary = 'id';
    protected $fillable = ['username', 'password', 'fullname', 'defaultPassword', 'email', 'dateOfBirth', 'phoneNumber', 'address','dateIssuanceCard','placeIssue','identificationCard','imgLink','isVerifiedInfor','status','note','created_at','updated_at'];
    public function scopeFindUsersByRoomId($query, $roomId)
    {
        $contract = ContractModel::where('roomId', $roomId)
            ->where('endTime', '>', Carbon::now())
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc')
            ->first();
        $user = $contract ?  UserContractModel::where('contractId', $contract->id)
            ->get()
            ->pluck('userId')
            ->toArray() : [];
        return $query->whereIn('id', $user);  
    }
//    public function contractActive() {
//         return $this->hasOne(ContractModel::class, 'userId')
//             ->where('end_at', '>', Carbon::now()) 
//             ->orderByDesc('created_at')
//             ->latest('id');
//     }
//     public function contracts(){
//         return $this->hasMany(ContractModel::class, 'userId');
//     } 
   
}
