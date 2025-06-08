<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'product_id' => 'required|integer',
            'user_id' => 'required|integer',
            'organization_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'master_note' => 'required|string|max:255',
            'files' => ['nullable', 'array'],
            'files.*' => ['file', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'product_id.required' => 'El producto es requerido',
            'user_id.required' => 'El cliente es requerido',
            'organization_id.required' => 'La Organizacion es requerida',
            'name.required' => 'El nombre es requerido',
            'name.string' => 'El nombre tiene que ser una cadena de caracteres',
            'name.max' => 'El nombre tiene que tener maximo de 255 caracteres',
            'master_note.required' => 'La master_note es requerido',
            'master_note.string' => 'La master_note tiene que ser una cadena de caracteres',
            'master_note.max' => 'La master_note tiene que tener maximo de 255 caracteres',
            'file.required' => 'El archivo es requerido',
            'file.mimes' => 'El archivo debe ser un archivo valido'
        ];
    }
}
