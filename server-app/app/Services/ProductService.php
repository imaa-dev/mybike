<?php
namespace App\Services;

use App\Models\Organization;
use App\Models\Product;
use Illuminate\Support\Facades\Log;

class ProductService{

    public function create($request){
        try {
            if($request->file('file')){
                foreach($request->file('file') as $file){
                    $path =  $file->store('product/'.$request->user()->id, 'public');
                    $product_paths[] = $path;
                }
            }
            $organization = Organization::where('user_id', $request->user()->id)->first();

            $product = new Product();
            $product->organization_id = $organization->id;
            $product->name = $request->type;
            $product->brand  = $request->brand;
            $product->model  = $request->model;
            $product->save();
            $data = [
                'code' => 200,
                'message'=>'Producto Creado Correctamente',
                'success' => true,
                'product' => $product
            ];
        } catch (\Throwable $th) {
            Log::error($th);
            $data = [
                'code' => 500,
                'message' => "ERROR",
                'success' => false
            ];
        }
        return $data;
    }

    public function update($request){
        try {
            $productUpdate = Product::where('id', $request->id)->first();
            $productUpdate->type =  $request->type;
            $productUpdate->brand =  $request->brand;
            $productUpdate->model =  $request->model;
            $productUpdate->save();
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

    public function getProducts(){
        try {
            $data = Product::all();
        } catch (\Throwable $th) {
            Log::error($th);
            $data = [
                'code' => 500,
                'status' =>  'error',
                'message' => 'ERROR'
            ];
        }
        return $data;
    }
}
