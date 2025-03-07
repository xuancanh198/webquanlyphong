<?php

namespace App\Helpers;
use App\Service\Function\Action\Firebase;
class Images 
{
  public function checkImageIsStringOrUpdate($image){
        if(is_string($image)){
            return $image;
        }
        $imageUpload = app(Firebase::class)->uploadImage($image);
        return $imageUpload;
  }
}
