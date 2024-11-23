<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Room\ServiceModel;
class BilDetailModel extends Model
{
    use HasFactory;
    protected $table = "tbl_bill_detail";
    protected $primary = 'id';
    protected $fillable = ['bill_id', 'seviceId', 'quantity', 'price'];
    protected $hidden = [ 'bill_id', 'seviceId'];
    public function service(){
        return $this->belongsTo(ServiceModel::class, 'seviceId', 'id');
    }
}
