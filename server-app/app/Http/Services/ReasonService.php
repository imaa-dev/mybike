<?php
namespace App\Http\Services;


use App\Models\Reason;
use Illuminate\Support\Facades\Log;

class ReasonService{

    public function storeReasons($reasons, $id): void
    {
        try {
            foreach ($reasons as $reasonInsert){
                $reason = new Reason();
                $reason->servi_id = $id;
                $reason->reason_note = $reasonInsert['note'];
                $reason->save();
            }
        } catch(\Throwable $th){
            Log::error($th);
        }

    }
}
