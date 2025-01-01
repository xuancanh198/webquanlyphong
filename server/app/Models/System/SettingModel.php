<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Support\Facades\Auth;
class SettingModel extends Model
{
    use HasFactory, LogsActivity;
    protected $table = "tbl_setting";
    protected $primary = 'id';
    protected static $logName = 'setting';
    protected static $logOnlyDirty = true;
    protected $fillable = [
        'key',
        'value',
        'note',
        'created_at',
        'updated_at',
    ];
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('adminAction')
            ->logOnly([
                'name',
                'role_detail',
            ])
            ->logOnlyDirty();
    }

    public static function tapActivity(Activity $activity, string $eventName)
    {

        $activity->description = match ($eventName) {
            'created' => "Nhân viên " . Auth::user()->username . " đã  tạo mới cấu hình " . $activity->subject->name,
            'updated' => "Nhân viên " . Auth::user()->username . " đã  cập nhật cấu hình " . $activity->subject->name,
            'deleted' => "Nhân viên " . Auth::user()->username . " đã  xóa cấu hình " . $activity->subject->name,
            default => $activity->description,
        };
    }
}
