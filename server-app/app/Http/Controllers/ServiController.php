<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceRequest;
use App\Models\Client;
use App\Models\Organization;
use App\Models\Product;
use App\Models\Servi;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Services\ServiService;
use Inertia\Inertia;

class ServiController extends Controller
{
    protected ServiService $serviService;

    public function __construct(ServiService $serviService)
    {
        $this->serviService = $serviService;
    }
    public function list(Request $request)
    {
        $organization = Organization::where('user_id', $request->user()->id)
            ->where('active', true)
            ->with('file')
            ->first();
        if($organization !== null){
            $services = Servi::where('organization_id', $organization->id)
                ->with('file')
                ->with('product')
                ->with('user')
                ->get();
            $notOrganization = false;
        }else{
            $services = [];
            $notOrganization = true;
        }

        return Inertia::render('service', [
            'servis' => $services,
            'notOrganization' => $notOrganization
        ]);
    }
    public function create(Request $request)
    {
        $product = Product::where('user_id', $request->user()->id)->with('file')->get();
        $client = Client::where('user_id', $request->user()->id)->with('file')->get();
        return Inertia::render('forms/createServisForm', [
            'products' => $product,
            'clients' => $client,
        ]);
    }
    public function store(StoreServiceRequest $request){

        $res = $this->serviService->create($request);
        session()->flash('message', $res['message']);
        return redirect()->route('services.list.view');

    }

    public function getUpdate(Servi $servi)
    {
        $serviceFile = Servi::where('id', $servi->id)
            ->with('file')
            ->with('product')
            ->with('user')
            ->first();
        return Inertia::render('forms/manageServiceForm', [
            'servi' => $serviceFile
        ]);
    }

    public function update(Request $request){
        return true;
    }

    public function delete(Request $request){
        $res = $this->serviService->delete($request);
        session()->flash('message', $res['message']);
        return redirect()->route('services.list.view');
    }
}
