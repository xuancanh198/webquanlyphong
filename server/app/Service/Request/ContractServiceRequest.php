<?php

namespace App\Service\Request;
use App\Service\Function\Execute\User\Contract\ContractServiceInterface;
class ContractServiceRequest
{
    protected $contractService;

    public function __construct(ContractServiceInterface $contractService) {
        $this->contractService = $contractService;
    }
    public function execute($data) {
        $result = $this->contractService->checkIsStillValid($data);
      
    }
}
