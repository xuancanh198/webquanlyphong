<?php

namespace App\Models\Permisstion;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermisstionModel extends Model
{
    use HasFactory;
    protected $table = "tbl_permission";
    protected $primary = 'id';
    protected $fillable = ['code', 'name', 'status','created_at', 'updated_at'];
}
