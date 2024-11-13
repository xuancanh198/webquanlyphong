<?php

namespace App\Models\User\Contract;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Room\FurnitureModel;
class FurnitureContractModel extends Model
{
    use HasFactory;
    protected $table = "tbl_contract_furniture";
    protected $primary = 'id';
    protected $fillable = ['contractId', 'furnitureId','quantity'];
    protected $hidden = ['contractId', 'furnitureId'];
     public $timestamps = false; 
     public function furniture(){
        return $this->belongsTo(FurnitureModel::class, 'furnitureId');
    }
}
