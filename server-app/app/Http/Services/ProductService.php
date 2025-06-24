<?php
namespace App\Http\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProductService{

    public function create($request){
        $product_paths = [];
        try {
            if($request->file('file')){
                foreach($request->file('file') as $file){
                    $path =  $file->store('product/'.$request->user()->id, 'public');
                    $product_paths[] = $path;
                }
            }
            $product = new Product();
            $product->user_id  = $request->user()->id;
            $product->type =  $request->type;
            $product->brand  = $request->brand;
            $product->model  = $request->model;
            $product->save();
            if($request->file('file')){
                foreach ($product_paths as $path){
                    $product->file()->create([
                        'path' => $path
                    ]);
                }
            }

            $data = ['status'=>'success','message'=>'Producto Creado Correctamente'];
        } catch (\Throwable $th) {
            Log::error($th);
            $data = [
                'error' => $th,
                'code' => 500,
            ];
        }
        return $data;
    }

    public function update($request){
        try {
            if($request->hasFile('file')){
                foreach($request->file('file') as $file){
                    $path =  $file->store('product/'.$request->user()->id, 'public');
                    $product_paths[] = $path;
                }
            }

            $productUpdate = Product::where('id', $request->id)->with('file')->first();
            $productUpdate->type =  $request->type;
            $productUpdate->brand =  $request->brand;
            $productUpdate->model =  $request->model;
            if($request->hasFile('file')){
                foreach ($productUpdate->file as $file){
                    Storage::disk('public')->delete($file->path);
                }
            }
            $productUpdate->save();
            if($request->hasFile('file')){
                $productUpdate->file()->delete();
                foreach ($product_paths as $path){
                    $productUpdate->file()->create([
                        'path' => $path
                    ]);
                }
            }
            $data = [
                'code' => 200,
                'status' =>  'success',
                'message' =>  'Producto Actualizado Correctamente'
            ];
        } catch (\Throwable $th) {
            Log::error($th);
            $data = [
                'error' => 'Error al eliminar producto',
                'code' => 500,
                'message' => $th->getMessage()
            ];
        }

        return $data;
    }

    public function delete($id){
        try {
            $productDelete = Product::where('id', $id)->first();
            if ($productDelete->servis()->count() > 0) {
                return [
                    'success' => false,
                    'code' => 400,
                    'message' => 'Este producto tiene servicios asociados y no puede ser eliminado.'
                ];
            }
            $productDelete->delete();
            $data = [
                'code' => 200,
                'status' =>  'success',
                'message' =>  'Producto eliminado Correctamente'
            ];
        } catch  (\Throwable $th) {
            Log::error($th);
            $data = [
                'error' => 'Error al eliminar producto',
                'code' => 500,
            ];
        }
        return $data;
    }
}
