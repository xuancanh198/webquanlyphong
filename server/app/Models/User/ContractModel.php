<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User\UserModel;
use App\Models\Staff\StaffModel;
use App\Models\Room\RoomModel;
use App\Models\User\Contract\FurnitureContractModel;
use App\Models\User\Contract\ServiceContractModel;
use App\Models\User\Contract\UserContractModel;
class ContractModel extends Model
{
    use HasFactory;
    protected $table = "tbl_contract";
    protected $primary = 'id';
    protected $fillable = ['code', 'staffId', 'roomId', 'priceTime', 'deposit', 'userId', 'img', 'startTime','endTime','note','created_at','updated_at'];
    protected $hidden = [ 'staffId', 'roomId','userId'];
    public function user(){
        return $this->belongsTo(UserModel::class,'userId');
    }
    public function staff(){
        return $this->belongsTo(StaffModel::class,'staffId');
    }
    public function room(){
        return $this->belongsTo(RoomModel::class,'roomId');
    }
    public function customer(){
        return $this->hasMany(UserContractModel::class,'contractId', 'id');
    }
    public function furniture(){
        return $this->hasMany(FurnitureContractModel::class,'contractId', 'id');
    }
    public function service(){
        return $this->hasMany(ServiceContractModel::class,'contractId', 'id');
    }
    public function scopeQueryUser($query, $userId)
    {
        return $query->where(function ($q) use ($userId) {
            $q->where('userId', $userId)
                ->orWhereHas('customer', function ($subQuery) use ($userId) {
                    $subQuery->where('userId', $userId);
                });
        });
    }

}
