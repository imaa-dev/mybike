<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Services\ClientService;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    protected ClientService $clientService;

    public function __construct(ClientService $clientService)
    {
        $this->clientService = $clientService;
    }

    public function list()
    {
        $clients = Client::where('user_id', auth()->user()->id)->get();
        return Inertia::render('client/client', ['clients' => $clients]);
    }
    public function create()
    {
        return Inertia::render('client/createClient');
    }
    public function store(StoreClientRequest $request)
    {
        $res = $this->clientService->create($request);
        return response()->json($res);
    }
    public function getUpdate(Client $client)
    {
        $clientFile = Client::where('id', $client->id)->first();
        return Inertia::render('client/editClient', [
            'client' => $clientFile
        ]);
    }
    public function update(UpdateClientRequest $request)
    {
        $res = $this->clientService->update($request);
        session()->flash('message', $res['message']);
        return redirect()->route('clients.list.view');
    }
    public function delete(Request $request)
    {
        $res = $this->clientService->delete($request);
        return response()->json($res);
    }
}
