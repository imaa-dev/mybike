<?php

namespace App\Http\Controllers;

use App\Http\Services\ReasonService;
use Illuminate\Http\Request;

class ReasonController extends Controller
{

    protected ReasonService $reasonService;

    public function __construct(ReasonService $reasonService)
    {
        $this->reasonService = $reasonService;
    }

    public function store(Request $request)
    {
        $res = $this->reasonService->store($request->reason, $request->id);
        return response()->json($res);
    }
}
