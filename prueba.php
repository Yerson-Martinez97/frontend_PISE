<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <label for="busqueda">Buscar:</label>
    <input type="text" id="busqueda" name="busqueda" placeholder="Ingrese el término de búsqueda...">
    <select id="miSelect">
        <!-- Agregar opciones al select -->
    </select>
    <script>
        $(document).ready(function() {
            // Evento de cambio en el campo de búsqueda
            $('#busqueda').on('input', function() {
                var term = $(this).val(); // Obtener el término de búsqueda
                $.ajax({
                    url: 'http://localhost:3000/api/v1/bancos', // URL del archivo PHP que devuelve los resultados
                    type: 'POST',
                    data: {
                        busqueda: term
                    }, // Enviar el término de búsqueda al servidor
                    dataType: 'json', // Especificar que se espera recibir un objeto JSON
                    success: function(response) {
                        // Limpiar el select
                        $('#miSelect').empty();
                        // Agregar cada resultado como una opción en el select
                        $.each(response, function(index, item) {
                            $('#miSelect').append('<option value="' + item.id + '">' + item.nombre + '</option>');
                        });
                    },
                    error: function(xhr, status, error) {
                        // Manejar el error de la solicitud AJAX
                        console.error(xhr.responseText);
                    }
                });
            });
        });
    </script>
</body>

</html>