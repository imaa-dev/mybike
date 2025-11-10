<?php

namespace App\Http\Services;

use App\Models\Organization;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class OrganizationService
{

    public function create($request)
    {
        try{
            if($request->hasFile('file')){

                $path = $request->file('file')->store('organization/'.$request->user()->id, 'public');
            }
            $organization = new Organization();
            $organization->user_id  = $request->user()->id;
            $organization->name = $request->name;
            $organization->description =  $request->description;
            $organization->active  = $request->active;
            $organization->save();
            if($request->hasFile('file')){
                $organization->file()->create([
                    'path' => $path
                ]);
            }
            $data = [
                'code' => 200,
                'success' => true,
                'message' => 'Organizacion Creada Satisfactoriamente',
            ];
        } catch(\Exception $e){
            Log::error($e->getMessage());
            $data = [
                'code' => 500,
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
        return $data;
    }

    public function update($request)
    {
        try{
            $organizationUpdate = Organization::where('id', $request->id)->with('file')->first();
            if($request->hasFile('file')){
                $path = $request->file('file')->store('organization/'.$request->user()->id, 'public');
            }
            $organizationUpdate->user_id = $request->user()->id;
            $organizationUpdate->name = $request->name;
            $organizationUpdate->description =  $request->description;
            $organizationUpdate->active  = $request->active;
            $organizationUpdate->save();
            if($organizationUpdate->file){
                Storage::disk('public')->delete($organizationUpdate->file->path);
            }
            if($request->hasFile('file')){
                $organizationUpdate->file()->create([
                    'path' => $path
                ]);
            }
            $data = [
                'code' => 200,
                'success' => true,
                'message' => 'Organizacion actualizada Satisfactoriamente',
            ];
        } catch(\Exception $e){
            Log::error($e->getMessage());
            $data = [
                'code' => 500,
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
        return $data;
    }

    public function delete($request)
    {
        try {
            $organizationDelete = Organization::where('id', $request->id)->with('file')->first();
            if($organizationDelete->servis()->exists() ){
                return [
                    'success' => false,
                    'code' => 400,
                    'message' => 'La organizacion tiene servicios asociados, no se puede eliminar'
                ];
            }
            $organizationDelete->delete();
            if($organizationDelete->file){
                $organizationDelete->file()->delete();
            }
            if($organizationDelete->file){
                Storage::disk('public')->delete($organizationDelete->file->path);
            }
            $data = [
                'code' => 200,
                'success' => true,
                'message' => 'Organizacion eliminada Satisfactoriamente',
            ];
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            $data = [
                'code' => 500,
                'status' => 'error',
                'message' => $th->getMessage()
            ];
        }
        return $data;
    }
}
