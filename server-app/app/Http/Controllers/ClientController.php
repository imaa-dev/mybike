<?php

namespace App\Http\Controllers;

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
        $clients = Client::where('user_id', auth()->user()->id)->with('file')->get();
        return Inertia::render('client', ['clients' => $clients]);
    }
    public function create()
    {
        return Inertia::render('forms/createClientForm');
    }
    public function store(Request $request)
    {
        $res = $this->clientService->create($request);
        session()->flash('message', $res['message']);
        return redirect()->route('clients.list.view');
    }
    public function getUpdate(Client $client)
    {
        $clientFile = Client::where('id', $client->id)->with('file')->first();
        return Inertia::render('forms/editClientForm', [
            'client' => $clientFile
        ]);
    }
    public function update(Request $request)
    {
        $res = $this->clientService->update($request);
        session()->flash('message', $res['message']);
        return redirect()->route('clients.list.view');
    }
    public function delete(Request $request)
    {
        $res = $this->clientService->delete($request);
        session()->flash('message', $res['message']);
        return redirect()->route('clients.list.view');
    }
}
