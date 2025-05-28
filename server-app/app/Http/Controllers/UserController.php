<?php

namespace App\Http\Controllers;

use App\Http\Services\UserService;
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

    public function createClient()
    {
        return Inertia::render('client');
    }

    public function storeClient(Request $request)// create form request validations
    {
        $res = $this->userService->createClient($request);

    }
}
