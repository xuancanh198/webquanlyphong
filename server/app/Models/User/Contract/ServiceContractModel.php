<?php

namespace App\Models\User\Contract;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Room\ServiceModel;
class ServiceContractModel extends Model
{
    use HasFactory;
    protected $table = "tbl_contract_service";
    protected $primary = 'id';
    protected $fillable = ['contractId', 'serviceId','quantity'];
    protected $hidden = ['contractId', 'serviceId'];
     public $timestamps = false; 
     public function service(){
        return $this->belongsTo(ServiceModel::class, 'serviceId');
    }
}
