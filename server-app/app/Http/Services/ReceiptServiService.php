<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Log;

class ReceiptServiService
{
    public function pdfService($data){
        Log::debug('CREATE RECEIPT', $data->toArray());
        return true;
    }
}
