<?php

namespace App\Http\Controllers;

use App\Models\Servi;
use Illuminate\Http\Request;
use App\Http\Services\ServiService;
use Inertia\Inertia;

class ServiController extends Controller
{
    public function __construct(ServiService $serviService)
    {
        $this->serviService = $serviService;
    }
    public function list(Request $request)
    {
        return Inertia::render('service');
    }
    public function create()
    {
        return Inertia::render('forms/createServisForm');
    }
    public function store(Request $request)
    {
        $res = $this->serviService->create($request);
        dd($res);
    }

    public function getUpdate(Servi $servi)
    {
        return Inertia::render('forms/editServiForm', [
            'servi' => $servi
        ]);
    }

    public function update(Request $request){
        return true;
    }

    public function delete(Request $request){
        return true;
    }
}
