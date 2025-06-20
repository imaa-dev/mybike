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
            'client_id' => 'required|integer',
            'organization_id' => 'required|integer',
            'date_entry' => 'required|string',
            'reason_notes' => 'required|array',
            'files' => ['nullable', 'array', 'max:5'],
            'files.*' => ['file', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'product_id.required' => 'El producto es requerido',
            'user_id.required' => 'El cliente es requerido',
            'organization_id.required' => 'La Organizacion es requerida',
            'date_entry.required' => 'La fecha ingreso es requerida',
            'date_entry.string' => 'La fecha debe ser una cadena de texto',
            'reason_notes.required' => 'Los detalles de ingreso son requiridos',
            'file.required' => 'El archivo es requerido',
            'file.mimes' => 'El archivo debe ser un archivo valido',
            'file.max' => 'La cantidad de imagenes no puede ser superior a 5'
        ];
    }
}
