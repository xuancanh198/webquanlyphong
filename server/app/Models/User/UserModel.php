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
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use App\Enums\ActiveLog;
use App\Enums\StaffsEnum;

class UserModel extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, LogsActivity;
    protected $table = "tbl_user";
    protected $primary = 'id';
    protected static $logName = ActiveLog::USER_VALUE;
    protected static $logOnlyDirty = true;
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
    
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName(ActiveLog::TYPE_LOG_ADMIN)
            ->logOnly([
            'username',
            'password',
            'fullname',
            'defaultPassword',
            'email',
            'dateOfBirth',
            'phoneNumber',
            'address',
            'dateIssuanceCard',
            'placeIssue',
            'identificationCard',
            'imgLink',
            'isVerifiedInfor',
            'status',
            'note',
            ])
            ->logOnlyDirty();
    }
    public function getAuthPassword()
    {
        return $this->clave;
    }
    // public function scopeGetInBuildingIdInStaff($query)
    // {
    //     if (Auth::user()->buildingId !== StaffsEnum::SUPPER_ROLE_DEFAULt) {
    //         return $query->where('buildingId', Auth::user()->buildingId);
    //     }
    //     return $query;
    // }
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
        $activity->subject_type = self::$logName;

    }
}
