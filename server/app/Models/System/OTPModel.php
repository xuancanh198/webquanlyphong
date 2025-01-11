<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OTPModel extends Model
{
    use HasFactory;
    protected $table = "tbl_otps";
    protected $primary = 'id';
    protected $fillable = [
        'userId',
        'staffId',
        'typeAuth',
        'phoneNumber',
        'email',
        'status',
        'expired_at',
        'created_at',
        'updated_at',
    ];
}
