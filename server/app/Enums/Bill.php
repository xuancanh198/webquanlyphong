<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

final class Bill extends Enum
{
    const BILLSTATUSPAYED = 1;
    const BILLSTATUSPNOTYET = 0;
    const APPROVED = 1;
    const NOTAPPROVEDYET = 0;
    const STATUSTRANSACTIONAPPROVED = 1;
    const STATUSTRANSACTIONWAITING = 0;
}
