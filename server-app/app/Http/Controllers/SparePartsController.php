<?php

namespace App\Http\Controllers;

use App\Services\SparePartsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SparePartsController extends Controller
{

    private SparePartsService $sparePartsService;

    public function __construct( SparePartsService $sparePartsService )
    {
        $this->sparePartsService = $sparePartsService;
    }

    public function create(Request $request)
    {
        Log::debug($request->user()->id);
        $data = [
            'user_id' => $request->user()->id,
            'model' => $request->model,
            'brand' => $request->brand,
            'price' => $request->price,
            'note' => $request->note
        ];
        $res = $this->sparePartsService->createSparePart($data);
        return response()->json($res);
    }
}
