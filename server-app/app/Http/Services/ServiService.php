<?php

namespace App\Http\Services;

use App\Jobs\ProcessReceipt;
use App\Models\File;
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
            $servi->client_id  = $request->client_id;
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
        $reasonService = new ReasonService();
        try {
            $paths = [];
            if($request->hasFile('file')){
                foreach ($request->file('file') as $file){
                    $path =  $file->store('servi/'.$request->user()->id, 'public');
                    $paths[] = $path;
                }
            }
            $serviceUpdate = Servi::where('id', $request->id)->with('file')->first();
            if($request->hasFile('file')){
                foreach ($serviceUpdate->file as $file){
                    Storage::disk('public')->delete($file->path);
                }
            }
            $serviceUpdate->client_id  = $request->client_id;
            $serviceUpdate->organization_id = $request->organization_id;
            $serviceUpdate->product_id = $request->product_id;
            $serviceUpdate->status_id = $request->status_id;
            $serviceUpdate->date_entry = $request->date_entry;
            $serviceUpdate->save();
            //$reasonService->storeReasons($request->reason_notes, $serviceUpdate->id);
            if($request->hasFile('file')){
                foreach ($paths as $path){
                    $serviceUpdate->file()->delete();
                    $serviceUpdate->file()->create([
                        'path'=> $path
                    ]);
                }
            }
            //ProcessReceipt::dispatch($serviceUpdate)->onQueue('high')->afterResponse();
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

    public function delete($request)
    {
        try {
            $serviceDelete = Servi::where('id', $request->id)->with('file')->first();
            $serviceDelete->delete();
            $serviceDelete->file()->delete();
            if($request->hasFile('file')){
                Storage::disk('public')->delete($request->file->path);
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


}
