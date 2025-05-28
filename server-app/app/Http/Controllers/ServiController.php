<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\ServiService;
use Inertia\Inertia;

class ServiController extends Controller
{
    public function __construct(ServiService $serviService)
    {
        $this->serviService = $serviService;
    }
    public function create()
    {
        return Inertia::render('service');
    }

    public function store(Request $request)
    {
        $res = $this->serviService->create($request);
        dd($res);
    }
}
