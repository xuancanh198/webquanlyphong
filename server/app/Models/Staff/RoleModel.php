<?php

namespace App\Models\Staff;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleModel extends Model
{
    use HasFactory;
    protected $table = "tbl_role";
    protected $primary = 'id';
    protected $fillable = ['name', 'role_detail','created_at', 'updated_at'];
}
