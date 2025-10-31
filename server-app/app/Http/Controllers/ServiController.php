<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceRequest;
use App\Models\Organization;
use App\Models\Product;
use App\Models\Servi;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Services\ServiService;
use Illuminate\Support\Facades\Log;
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
            $countTypeService = $this->serviService->getCountTypeService($organization->id);
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
                ->where('status_id', 5)
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
                ->get();
        return Inertia::render('service/inRepairService', [
            'services' => $servicesInRepair
        ]);
    }

    public function create(Request $request)
    {
        $organization = Organization::where('user_id', $request->user()->id)->first();

        $product = Product::where('organization_id', $organization->id)->get();
        $client = User::where('rol', "CLIENT")->get();

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

    public function getUpdate(Request $request, Servi $servi)
    {
        $serviceFile = Servi::where('id', $servi->id)
            ->with('file')
            ->with('product')
            ->with('client')
            ->with('reasons')
            ->first();
        $organization = Organization::where('user_id', $request->user()->id)->first();
        $products = Product::where('organization_id', $organization->id)->get();
        $clients = User::where('rol', "CLIENT")->get();
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

        try {
            // ToDo
            // Si viene a true la variable se pasa a generar un mensaje de notificacion al cliente
            // Usar Jobs con dispatch
            $serviceToRepaired = Servi::where('id', $request->service_id)->first();
            $serviceToRepaired->status_id = 4;
            $serviceToRepaired->save();
            $data = [
                'message' => 'El servicio cambio a Reparación',
            ];
        } catch (\Throwable $th){
            $data = [
                'message' => 'ERROR',
            ];
            Log::error($th);
        }
        session()->flash('message', $data['message'] );
        return redirect()->route('services.list.repair.view');
    }
    public function toDiagnosis(Request $request){

    }
    public function toDelivered(Request $request){

    }
    public function toAproveSpareParts(Request $request){

    }
}
