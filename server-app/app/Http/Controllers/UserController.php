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
        return Inertia::render('client/createClient');
    }

    public function listClient()
    {
        $clients = User::where('rol', "CLIENT")->with('file')->get();
        return Inertia::render('client/client', [
            'clients' => $clients,
        ]);
    }
    public function updateClient(Request $request)
    {
        $res = $this->userService->update($request);
        session()->flash('message', $res['message']);
        return redirect()->route('users.client.list.view');
    }
    public function getUpdateClient(User $user)
    {
        $client = User::where('id', $user->id)->with('file')->first();
        return Inertia::render('client/editClient', [
            'client' => $client
        ]);
    }

    public function storeClient(StoreClientRequest $request)
    {
        $res = $this->userService->createClient($request);
        return response()->json($res);
    }

    public function deleteClient(Request $request)
    {
        $res = $this->userService->deleteClient($request);
        return response()->json($res);
    }
}
