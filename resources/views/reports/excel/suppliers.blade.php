<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Proveedores</title>
</head>
<body>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Persona de Contacto</th>
                <th>NIT</th>
                <th>Activo</th>
                <th>Fecha de Creación</th>
            </tr>
        </thead>
        <tbody>
            @foreach($suppliers as $supplier)
                <tr>
                    <td>{{ $supplier->id }}</td>
                    <td>{{ $supplier->name }}</td>
                    <td>{{ $supplier->address ?? 'N/A' }}</td>
                    <td>{{ $supplier->phone ?? 'N/A' }}</td>
                    <td>{{ $supplier->email ?? 'N/A' }}</td>
                    <td>{{ $supplier->contact_person ?? 'N/A' }}</td>
                    <td>{{ $supplier->nit ?? 'N/A' }}</td>
                    <td>{{ $supplier->is_active ? 'Sí' : 'No' }}</td>
                    <td>{{ $supplier->created_at }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>