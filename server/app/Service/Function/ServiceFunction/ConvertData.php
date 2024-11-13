<?php
namespace App\Service\Function\ServiceFunction;
use DateTime;
use Exception;
class ConvertData    
{
    
    public function convertToDate(string $dateString)
    {
        try {
            $date = DateTime::createFromFormat('d/m/Y', $dateString);
            if ($date && $date->format('d/m/Y') === $dateString) {
                return $date->format('Y-m-d');
            } else {
                return false;
            }
        } catch (Exception $e) {
          return false;
        }
    }
    public function convertToBool(string $excel)
    {
        try {
            $excel = strtolower(trim($excel));
          
            if ($excel === 'true') {
                return true;
            } elseif ($excel === 'false') {
                return false;
            } 
            return false;
        } catch (Exception $e) {
          return false;
        }
    }
    public function validateDate(string $dateString): string
    {
        $result = $this->convertToDate($dateString);
        
        if ($result && !is_string($result)) {
            return $result; 
        }
        return $result; 
    }
}