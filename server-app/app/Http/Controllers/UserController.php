<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Models\User;
use App\Services\UserService;
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

    public function listClient(Request $request)
    {
        $clients = User::where('rol', "CLIENT")->where('created_by_user_id', $request->user()->id)->with('file')->get();
        return Inertia::render('client/client', [
            'clients' => $clients,
        ]);
    }
    public function updateClient(Request $request)
    {
        $data = [
            'id' => $request->id,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone
        ];
        
        $res = $this->userService->update($data);
        session()->flash('message', $res['message']);
        return redirect()->route('users.client.list.view');
    }
    public function getUpdateClient(User $user)
    {
        $client = $this->userService->getClientById($user->id);
        return Inertia::render('client/editClient', [
            'client' => $client
        ]);
    }

    public function storeClient(StoreClientRequest $request)
    {
        $data = [
            'created_by_user_id' => $request->user()->id,
            'name' => $request->name,
            'email' => $request->email,
            'rol' => 'CLIENT',
            'phone' => $request->phone
        ];

        $res = $this->userService->createClient($data);
        return response()->json($res);
    }

    public function deleteClient(Request $request)
    {
        $id = $request->id;
        $res = $this->userService->deleteClient($id);
        return response()->json($res);
    }
}
