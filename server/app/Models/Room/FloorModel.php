<?php

namespace App\Models\Room;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FloorModel extends Model
{
    use HasFactory;
    protected $table = "tbl_floor";
    protected $primary = 'id';
    protected $fillable = ['code', 'name', 'created_at', 'updated_at'];
}
