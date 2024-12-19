<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User\BilDetailModel;
use App\Models\User\UserModel;
use App\Models\Room\RoomModel;
use App\Models\User\ContractModel;;
use App\Models\Staff\StaffModel;
class BilModel extends Model
{
    use HasFactory;
    protected $table = "tbl_bill";
    protected $primary = 'id';
    protected $fillable = ['code', 'staffId', 'roomId', 'totalMoney', 'status','contractId', 'userId', 'image','formPayment', 'started_at','ends_at','pay_at','note','created_at','updated_at'];
    protected $hidden = [ 'staffId', 'roomId','userId'];
    public function detail(){
        return $this->hasMany(BilDetailModel::class,'bill_id','id');
    }
    public function user(){
        return $this->belongsTo(UserModel::class,'userId');
    }
    public function room(){
        return $this->belongsTo(RoomModel::class,'roomId');
    }
    public function contract(){
        return $this->belongsTo(ContractModel::class,'contractId');
    }
    public function staff(){
        return $this->belongsTo(StaffModel::class,'staffId');
    }
    public function scopeQueryBuilding($query, $BuildingId){
        return $query->where(function ($q) use ($BuildingId) {
            $q->where('buildingId', $BuildingId)
                ->orWhereHas('room', function ($subQuery) use ($BuildingId) {
                    $subQuery->where('buildingId', $BuildingId);
                });
        });
    }
}
