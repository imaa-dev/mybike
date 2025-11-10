<?php

namespace App\Http\Services;

use App\Models\Organization;
use App\Models\Servi;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ServiService
{
    public function getAll()
    {

    }
    public function create($request)
    {
        $reasonService = new ReasonService();
        try {
            if($request->hasFile('file')){
                foreach ($request->file('file') as $file){
                    $path =  $file->store('servi/'.$request->user()->id, 'public');
                    $servi_paths[] = $path;
                }
            }
            $servi = new Servi();
            $servi->client_id = $request->client_id;
            $servi->organization_id = $request->organization_id;
            $servi->product_id = $request->product_id;
            $servi->status_id = 1;
            $servi->date_entry = $request->date_entry;
            $servi->save();
            $reasonService->storeReasons($request->reason_notes, $servi->id);
            if($request->hasFile('file')){
                foreach ($servi_paths as $path){
                    $servi->file()->create([
                        'path'=> $path
                    ]);
                }
            }
            $data = [
                'status' => 'success',
                'code' => 200,
                'message' => 'Servicio creado satisfactoriamente',
                'data' => $servi
            ];
        } catch (\Throwable $th) {
            $data = [
                'code' => 500,
                'status' => 'fail',
                'message' => 'ERROR',
            ];
        }
        return $data;
    }

    public function update($request)
    {
        try {

            $serviceUpdate = Servi::where('id', $request->id)->first();
            $serviceUpdate->client_id  = $request->client_id;
            $serviceUpdate->organization_id = $request->organization_id;
            $serviceUpdate->product_id = $request->product_id;
            $serviceUpdate->date_entry = $request->date_entry;
            $serviceUpdate->save();
            $data = [
                'code' => 200,
                'status' => 'success',
                'message' => 'Servicio actualizado satisfactoriamente',
            ];
        } catch (\Throwable $th) {
            Log::error($th);
            $data = [
                'code' => 500,
                'status' => 'error',
                'message' => 'ERROR'
            ];
        }
        return $data;
    }

    public function delete($id)
    {
        try {
            $serviceDelete = Servi::where('id', $id)->with('file')->first();
            if($serviceDelete->file){
                foreach ($serviceDelete->file as $file){
                    Storage::disk('public')->delete($file->path);
                }
            }
            $serviceDelete->delete();
            if($serviceDelete->file){
                foreach ($serviceDelete->file as $file){
                    $file->delete();
                }
            }
            $data = [
                'code' => 200,
                'status' => 'success',
                'message' => 'Servicio eliminado satisfactoriamente',
            ];
        } catch (\Throwable $th) {
            Log::error($th);
            $data = [
                'code' => 500,
                'message' => 'ERROR',
                'status' => 'fail'
            ];
        }
        return $data;
    }


    public function getTypeService($user, $status_id){
        $organization = Organization::where('user_id', $user->id)
            ->where('active', true)
            ->with('file')
            ->first();
        $services = Servi::where('organization_id', $organization->id)
            ->where('status_id', $status_id)
            ->with('file')
            ->with('product')
            ->with('client')
            ->with('reasons')
            ->get();
        return  [
            'servis' => $services
        ];
    }
    public function getById($id)
    {

    }

    public function getByName($name)
    {

    }

    public function mediaTotal()
    {

    }

    public function mediaUnsatisfied()
    {

    }

    public function mediaSatisfied()
    {

    }

    public function mediaNotSatisfied()
    {

    }
    public function getCountTypeService($id)
    {
        $serviceRecepcionado = Servi::where('organization_id', $id)->where('status_id', 1)->count();
        $serviceDiagnosticado = Servi::where('organization_id', $id)->where('status_id', 2)->count();
        $serviceAR = Servi::where('organization_id', $id)->where('status_id', 3)->count();
        $serviceER = Servi::where('organization_id', $id)->where('status_id', 4)->count();
        $serviceReparado = Servi::where('organization_id', $id)->where('status_id', 5)->count();
        $serviceEntregado = Servi::where('organization_id', $id)->where('status_id', 6)->count();
        $serviceIncidencia = Servi::where('organization_id', $id)->where('status_id', 7)->count();
        return [
            'serviceRecepcionado' => $serviceRecepcionado,
            'serviceDiagnosticado' => $serviceDiagnosticado,
            'serviceAR' => $serviceAR,
            'serviceER' => $serviceER,
            'serviceReparado' => $serviceReparado,
            'serviceEntregado' => $serviceEntregado,
            'serviceIncidencia' => $serviceIncidencia
       ];
    }
}
