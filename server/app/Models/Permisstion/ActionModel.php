<?php

namespace App\Models\Permisstion;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActionModel extends Model
{
    use HasFactory;
    protected $table = "tbl_acction";
    protected $primary = 'id';
    protected $fillable = ['code', 'name', 'status','created_at', 'updated_at'];
}
