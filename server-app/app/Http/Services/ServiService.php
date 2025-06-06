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
            $servi = new Servi();

            $servi->save();
            $data = [
                'status' => 'success',
                'code' => 200,
                'message' => 'Servi Created Successfully',
                'data' => $servi
            ];
        } catch (\Throwable $th) {
            $data = [
                'status' => 'error',
                'message' => $th->getMessage()
            ];
        }
        return response()->json($data);
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
