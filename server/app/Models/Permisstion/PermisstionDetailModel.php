<?php

namespace App\Models\Permisstion;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Permisstion\ActionModel;
use App\Models\Permisstion\PermisstionModel;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Support\Facades\Auth;
use App\Enums\ActiveLog;

class PermisstionDetailModel extends Model
{
    use HasFactory, LogsActivity;
    protected $table = "tbl_permission_detail";
    protected $primary = 'id';
    protected $fillable = ['permissionId', 'acctionId','name','code','url', 'status','created_at', 'updated_at'];

    protected static $logName = ActiveLog::PERMISSTION_DETAIL_VALUE;
    protected static $logOnlyDirty = true;
    public function acction(){
        return $this->belongsTo(ActionModel::class, 'acctionId', 'id');
    }
    public function permission(){
        return $this->belongsTo(PermisstionModel::class, 'permissionId', 'id');
    }
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName(ActiveLog::TYPE_LOG_ADMIN)
            ->logOnly([
            'permissionId',
            'acctionId',
            'name',
            'code',
            'url',
            'status',
            ])
            ->logOnlyDirty();
    }

    public static function tapActivity(Activity $activity, string $eventName)
    {

        $activity->description = match ($eventName) {
            'created' => "Nhân viên " . Auth::user()->username . " đã được tạo mới quyền chi tiết " . $activity->subject->name,
            'updated' => "Nhân viên " . Auth::user()->username . " đã được cập nhật quyền chi tiết " . $activity->subject->name,
            'deleted' => "Nhân viên " . Auth::user()->username . " đã được xóa quyền chi tiết " . $activity->subject->name,
            default => $activity->description,
        };
        $activity->subject_type = self::$logName;
    }
}
