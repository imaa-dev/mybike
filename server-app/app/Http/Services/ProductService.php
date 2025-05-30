<?php
namespace App\Http\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Log;

class ProductService{

    public function create($request){
        try {
            foreach($request->file('file') as $file){
                $path =  $file->store('product/'.$request->user()->id, 'public');
                $paths[] = $path;
            }
            $product = new Product();
            $product->user_id  = $request->user()->id;
            $product->name =  $request->name;
            $product->description  = $request->description;
            $product->brand  = $request->brand;
            $product->model  = $request->model;
            $product->save();
            foreach ($paths as $path){
                $product->files()->create([
                    'path' => $path
                ]);
            }
            $data = ['status'=>'success','message'=>'Product Created Successfully'];
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
            ];
        }

        return $data;
    }

    public function delete($request){
        try {

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
    }
}
