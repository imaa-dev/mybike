<?php

namespace App\Http\Controllers;

use App\Http\Services\UserService;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    public function create()
    {
        return Inertia::render('user');
    }

    public function listClient()
    {
        $clients = User::where('role_id', 3)->where('role_id', 2)->get();

        return Inertia::render('client', [
            'clients' => $clients,
        ]);
    }
    public function createClient()
    {
        return Inertia::render('forms/createClientForm');
    }


    public function storeClient(Request $request)
    {
        $res = $this->userService->createClient($request);

    }
}
