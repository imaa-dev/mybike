<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceRequest;
use App\Models\Client;
use App\Models\Organization;
use App\Models\Product;
use App\Models\Servi;
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
    public function show(Request $request)
    {
        $countTypeService = [];
        $organization = Organization::where('user_id', $request->user()->id)
            ->where('active', true)
            ->with('file')
            ->first();
        $notOrganization = true;
        if($organization !== null){
            $notOrganization = false;
            $countTypeService = $this->serviService->getCountTypeService();
        }

        return Inertia::render('service/service', [
            'notOrganization' => $notOrganization,
            'countTypeService' => $countTypeService,
        ]);
    }

    public function listRepair(Request $request)
    {
        $organization = Organization::where('user_id', $request->user()->id)
            ->where('active', true)
            ->with('file')
            ->first();
        if($organization !== null){
            $services = Servi::where('organization_id', $organization->id)
                ->where('status', 'REPARADO')
                ->with('file')
                ->with('product')
                ->with('client')
                ->get();
            $notOrganization = false;
        }
        return Inertia::render('service/listRepairService', [
            'servis' => $services,
            'notOrganization' => $notOrganization
        ]);
    }
    public function listReception(Request $request)
    {
        $organization = Organization::where('user_id', $request->user()->id)
            ->where('active', true)
            ->with('file')
            ->first();
        if($organization->id)
            $services = Servi::where('organization_id', $organization->id)
                ->where('status_id', 1)
                ->with('file')
                ->with('product')
                ->with('client')
                ->with('reasons')
                ->with('status')
                ->get();
        return Inertia::render('service/listReceptionService',[
            'servis' => $services,
        ]);
    }

    public function listInRepair(Request $request){
        $organization = Organization::where('user_id', $request->user()->id)
            ->where('active', true)
            ->with('file')
            ->first();
        if($organization->id)
            $servicesInRepair = Servi::where('organization_id', $organization->id)
                ->where('status_id', 4)
                ->with('file')
                ->with('product')
                ->with('client')
                ->with('reasons')
                ->with('status')
                ->get();
        return Inertia::render('service/inRepairService', [
            'service' => $servicesInRepair
        ]);
    }

    public function create(Request $request)
    {
        $product = Product::where('user_id', $request->user()->id)->get();
        $client = Client::where('user_id', $request->user()->id)->get();
        return Inertia::render('service/createServis', [
            'products' => $product,
            'clients' => $client,
        ]);
    }
    public function store(StoreServiceRequest $request){
        $res = $this->serviService->create($request);
        session()->flash('message', $res['message']);
        return redirect()->route('services.list.reception.view');
    }

    public function getUpdate(Request $request,Servi $servi)
    {
        $serviceFile = Servi::where('id', $servi->id)
            ->with('file')
            ->with('product')
            ->with('client')
            ->with('reasons')
            ->first();
        $products = Product::where('user_id', $request->user()->id)->get();
        $clients = Client::where('user_id', $request->user()->id)->get();
        return Inertia::render('service/manageService', [
            'servi' => $serviceFile,
            'clients' => $clients,
            'products' => $products
        ]);
    }

    public function update(StoreServiceRequest $request){
        $res = $this->serviService->update($request);
        session()->flash('message', $res['message']);
        return redirect()->route('services.list.reception.view');
    }

    public function delete($id){
        $res = $this->serviService->delete($id);
        return response()->json($res);
    }

    public function toRepaired(Request $request){
        $data = [];
        try {
            $serviceToRepaired = Servi::where('id', $request->servi_id);
            $serviceToRepaired->status_id = 5;
            $data = [
                'code' => 200,
                'status' => 'success',
                'message' => 'Servicios cambiado de estado satisfactoriamente',
            ];
        } catch (\Throwable $th){
            $data = [
                'code' => 500,
                'status' => 'fail',
                'message' => 'ERROR',
            ];
        }

        return response()->json($data);
    }
    public function toDiagnosis(Request $request){

    }
    public function toInRepair(Request $request){

    }
    public function toDelivered(Request $request){

    }
    public function toAproveSpareParts(Request $request){

    }
}
