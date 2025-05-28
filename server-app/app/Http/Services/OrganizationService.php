<?php

namespace App\Http\Services;

use App\Models\Organization;
use Illuminate\Support\Facades\Log;

class OrganizationService
{

    public function create($request)
    {
        try{
            foreach ($request->file('file') as $file) {
                $path = $file->store('organization/'.$request->user()->id, 'public');
            }
            $organization = new Organization();
            $organization->user_id  = $request->user()->id;
            $organization->name = $request->name;
            $organization->description =  $request->description;
            $organization->save();
            $organization->files()->create([
                'path' => $path
            ]);
            $data = [
                'code' => 200,
                'success' => true,
                'message' => 'Organization Created Successfully',
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
}
