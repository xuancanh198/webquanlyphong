<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User\BilDetailModel;
use App\Models\User\UserModel;
use App\Models\Room\RoomModel;
use App\Models\User\ContractModel;;
use App\Models\Staff\StaffModel;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
class BilModel extends Model
{
    use HasFactory, LogsActivity;
    protected $table = "tbl_bill";
    protected $primary = 'id';
    protected static $logName = 'bill';
    protected static $logOnlyDirty = true;
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
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('adminAction')
            ->logOnly([
            'code',
            'staffId',
            'roomId',
            'totalMoney',
            'status',
            'contractId',
            'userId',
            'image',
            'formPayment',
            'started_at',
            'ends_at',
            'pay_at',
            'note',
            ])
            ->logOnlyDirty();
    }

    public static function tapActivity(Activity $activity, string $eventName)
    {
        $mess = "";
        if ($eventName === 'updated' && isset($activity->causer_id)) {
            if (Auth::user()->id === $activity->subject->id) {
                $mess = "Người dùng : " . Auth::user()->username . " đã cập nhật thông tin của chính mình";
            } else {
                $mess = "Nhân viên : " . Auth::user()->username . " đã cập nhật thông tin của tài khoản người dùng : " . $activity->subject->username;
            }
        }


        $activity->description = match ($eventName) {
            'created' => "Nhân viên " . Auth::user()->username . " đã được tạo mới tài khoản nhân viên " . $activity->subject->username,
            'updated' => $mess,
            'deleted' => "Nhân viên " . Auth::user()->username . " đã được xóa tài khoản nhân viên " . $activity->subject->username,
            default => $activity->description,
        };
    }
}
