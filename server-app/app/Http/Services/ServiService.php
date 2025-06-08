<?php

namespace App\Http\Services;

use App\Models\Servi;

class ServiService
{
    public function getAll()
    {

    }
    public function create($request)
    {
        try {
            foreach ($request->file('file') as $file){
                $path =  $file->store('servi/'.$request->user()->id, 'public');
                $servi_paths[] = $path;
            }
            $servi = new Servi();
            $servi->user_id  = $request->user()->id;
            $servi->organization_id = $request->organization_id;
            $servi->product_id = $request->product_id;
            $servi->name = $request->name;
            $servi->master_note = $request->master_note;
            $servi->save();
            foreach ($servi_paths as $path){
                $servi->file()->create([
                    'path'=> $path
                ]);
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

    }

    public function delete($request)
    {

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
