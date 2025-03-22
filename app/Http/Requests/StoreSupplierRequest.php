<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSupplierRequest extends FormRequest
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
        $suppliersId = $this->route('id'); 
        return [
            'name' => ['required', 'string', 'max:100', 'unique:suppliers,name,'.$suppliersId],
            'address' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20', 'unique:suppliers,phone,'.$suppliersId], 
            'email' => ['required', 'string', 'max:100', 'email', 'unique:suppliers,email,'.$suppliersId],
            'contact_person' => ['required', 'string', 'max:100', 'unique:suppliers,contact_person,'.$suppliersId],
            'nit' => ['required', 'string', 'max:50', 'unique:suppliers,nit,'.$suppliersId],
            'notes' => ['nullable', 'string'],
            'is_active' => ['required', 'boolean'],
        ];
    }
    
    public function messages(): array
    {
        return [
            'name.required' => 'El nombre del proveedor es obligatorio.',
            'name.string' => 'El nombre del proveedor debe ser una cadena de texto.',
            'name.max' => 'El nombre del proveedor no puede tener más de 100 caracteres.',
            'name.unique' => 'El nombre del proveedor ya está en uso.',
    

            'address.string' => 'La dirección debe ser una cadena de texto.',
            'address.max' => 'La dirección no puede tener más de 255 caracteres.',
    
            'phone.required' => 'El número de teléfono es obligatorio.', 
            'phone.string' => 'El teléfono debe ser una cadena de texto.',
            'phone.max' => 'El teléfono no puede tener más de 20 caracteres.',
            'phone.unique' => 'El teléfono ya está registrado.',
    
            'email.required' => 'El correo electronico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser válido.',
            'email.max' => 'El correo electrónico no puede tener más de 100 caracteres.',
            'email.unique' => 'El correo electrónico ya está registrado.',
    

            'contact_person.string' => 'La persona de contacto debe ser una cadena de texto.',
            'contact_person.max' => 'La persona de contacto no puede tener más de 100 caracteres.',
            'contact_person.unique' => 'La persona de contacto ya está registrada.',
    
            'nit.string' => 'El NIT debe ser una cadena de texto.',
            'nit.max' => 'El NIT no puede tener más de 50 caracteres.',
            'nit.unique' => 'El NIT ya está registrado.',
    
            'notes.string' => 'Las notas deben ser una cadena de texto.',
    
            'is_active.required' => 'El campo de estado activo es obligatorio.',
            'is_active.boolean' => 'El campo de estado activo debe ser verdadero o falso.',
        ];
    }
}
