<?php

namespace App\Services;

use App\DAO\SparePartsDAO;
use Illuminate\Support\Facades\Log;

class SparePartsService
{

    private SparePartsDAO $sparePartsDAO;
    public function __construct(SparePartsDAO $sparePartsDAO)
    {
        $this->sparePartsDAO = $sparePartsDAO;
    }

    public function createSparePart(array $data)
    {
        try {
            $sparePart = $this->sparePartsDAO->createSparePart($data);
            $data = [
                'code' => 201,
                'message' => 'Pieza de repuesto creada satisfactoriamente',
                'success' => true,
                'spare_parts' => $sparePart
            ];
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            $data = [
                'code' => 503,
                'message' => 'ERROR',
                'success' => false,
                'spare_part' => null
            ];
        }
        return $data;
    }
}
