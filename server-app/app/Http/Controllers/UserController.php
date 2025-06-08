<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\StoreUpdateUserRequest;
use App\Http\Services\UserService;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    protected UserService $userService;
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

        $clients = User::where('role_id', 2)->with('file')->get();
        return Inertia::render('client', [
            'clients' => $clients,
        ]);
    }
    public function updateClient(StoreUpdateUserRequest $request, User $user)
    {
        $res = $this->userService->update($request);
        session()->flash('message', $res['message']);
        return redirect()->route('clients.list.view');
    }
    public function getClientUpdate(User $user)
    {

        $client = User::where('id', $user->id)->with('file')->first();
        return Inertia::render('forms/editClientForm', [
            'client' => $client
        ]);
    }
    public function createClient()
    {
        return Inertia::render('forms/createClientForm');
    }

    public function storeClient(StoreClientRequest $request)
    {
        $res = $this->userService->createClient($request);
        session()->flash('message', $res['message']);
        return redirect()->route('clients.list.view');
    }
}
