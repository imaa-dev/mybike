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
                $reason->reason_note = $reasonInsert['reason_note'];
                $reason->save();
            }
        } catch(\Throwable $th){
            Log::error($th);
        }

    }

    public function store($reason, $id)
    {
        try {
            $reasonSave = new Reason();
            $reasonSave->servi_id = $id;
            $reasonSave->reason_note = $reason;
            $reasonSave->save();
            $reasonServi = Reason::where('servi_id', $id)->get();
            $data = [
                'code' => 200,
                'message' => 'Detalle de ingreso agregado satisfactoriamente',
                'status' => true,
                'reasons' => $reasonServi
            ];
        } catch (\Throwable $th){
            Log::error($th);
            $data = [
                'code' => 500,
                'mesaage' => 'ERROR',
                'status' => false
            ];
        }
        return $data;
    }
}
