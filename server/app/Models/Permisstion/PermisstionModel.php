<?php

namespace App\Models\Permisstion;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Support\Facades\Auth;
use App\Enums\ActiveLog;
class PermisstionModel extends Model
{
    use HasFactory, LogsActivity;
    protected $table = "tbl_permission";
    protected $primary = 'id';
    protected $fillable = ['code', 'name', 'status','created_at', 'updated_at'];
    protected static $logName = ActiveLog::PERMISSTION_VALUE;
    protected static $logOnlyDirty = true;
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName(ActiveLog::TYPE_LOG_ADMIN)
            ->logOnly([
            'code',
            'name',
            'status',
            ])
            ->logOnlyDirty();
    }

    public static function tapActivity(Activity $activity, string $eventName)
    {

        $activity->description = match ($eventName) {
            'created' => "Nhân viên " . Auth::user()->username . " đã được tạo mới quyền " . $activity->subject->name,
            'updated' => "Nhân viên " . Auth::user()->username . " đã được cập nhật quyền " . $activity->subject->name,
            'deleted' => "Nhân viên " . Auth::user()->username . " đã được xóa quyền " . $activity->subject->name,
            default => $activity->description,
        };
        $activity->subject_type = self::$logName;
    }
}
