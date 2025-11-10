<?php

namespace App\Services;
use App\Models\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Throwable;

class FileService {

    public function removeImage($id)
    {
        try {
            $file = File::where('id', $id)->first();
            Storage::disk('public')->delete($file->path);
            $file->delete();
            $data = [
                'code' => 200,
                'message' => 'Imagen eliminada satisfactoriamente',
                'success' => true
            ];
        } catch(Throwable $th){
            Log::error($th);
            $data = [
                'code' => 500,
                'message' => 'ERROR',
                'success' => false
            ];
        }
        return $data;
    }
    public function addImage($request)
    {
        try {
            foreach ($request->file('file') as $file){
                $fileSave = new File();
                $path =  $file->store('servi/'.$request->user()->id, 'public');
                $fileSave->path = $path;
                $fileSave->fileable_type = 'App\Models\Servi';
                $fileSave->fileable_id = $request->service_id;
                $fileSave->save();
            }
            $files = File::where('fileable_id', $request->service_id)->get();
            $data = [
                'code' => 200,
                'message' => 'Imagen subida satisfactoriamente',
                'status' => 'success',
                'file' => $files
            ];
        } catch (Throwable $th){
            Log::error($th);
            $data = [
                'code' => 500,
                'message' => 'ERROR',
                'status' => 'fail'
            ];
        }
        return $data;
    }
}
