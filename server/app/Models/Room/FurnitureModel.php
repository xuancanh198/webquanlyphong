<?php

namespace App\Models\Room;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FurnitureModel extends Model
{
    use HasFactory;
    protected $table = "tbl_furnitures";
    protected $primary = 'id';
    protected $fillable = ['code', 'name','price', 'created_at', 'updated_at'];
}
