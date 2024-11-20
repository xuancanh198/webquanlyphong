<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SettingModel extends Model
{
    use HasFactory;
    protected $table = "tbl_setting";
    protected $primary = 'id';
    protected $fillable = [
        'key',
        'value',
        'note',
        'created_at',
        'updated_at',
    ];
}
