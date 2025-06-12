<?php

namespace App\Http\Services;

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
            $servi->name = $request->name;
            $servi->master_note = $request->master_note;
            $servi->status = 'REPARACION';
            $servi->save();
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
                'status' => 'error',
                'message' => $th->getMessage()
            ];
        }
        return $data;
    }

    public function update($request)
    {
        try {
            if($request->hasFile('file')){
                foreach ($request->file('file') as $file){
                    $path =  $file->store('servi/'.$request->user()->id, 'public');
                    $paths[] = $path;
                }
            }
            $serviceUpdate = Servi::where('id', $request->id)->with('file')->first();
            if($serviceUpdate->file){
                foreach ($serviceUpdate->file as $file){
                    Storage::disk('public')->delete($file->path);
                }
            }
            $serviceUpdate->name = $request->name;
            $serviceUpdate->master_note = $request->master_note;
            $serviceUpdate->status = 'REPARADO';
            $serviceUpdate->note_exit = $request->note_exit;
            $serviceUpdate->price = $request->price;
            $serviceUpdate->save();
            if($request->hasFile('file')){
                foreach ($paths as $path){
                    $serviceUpdate->file()->delete();
                    $serviceUpdate->file()->create([
                        'path'=> $path
                    ]);
                }
            }
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
                'message' => 'error al eliminar registro',
                'status' => 'error'
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
