$(document).ready(function () {
    $.ajax({
        url: "http://localhost:3000/api/v1/movimiento_bancos/index_all",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var table = $("#data-table").DataTable({
                responsive: true,
                search: true,
                data: data,
                columns: [
                    { title: "Monto", data: "monto" },
                    { title: "fecha", data: "fecha" },
                    { title: "Descripción", data: "descripcion", width: "30%" },
                    { title: "Tipo", data: "tipo" },
                    { title: "Concepto", data: "concepto_movimiento_banco.nombre" },
                    { title: "Nro. cuenta", data: "cuenta_banco.numero_cuenta" },
                    { title: "Moneda", data: "cuenta_banco.tipo_moneda" },
                    { title: "Banco", data: "cuenta_banco.banco.nombre" },
                ],
                paging: true,
                pageLength: 10,
                lengthMenu: [5, 10, 30, 50],
                pagingType: "simple_numbers",
                language: {
                    lengthMenu: "Mostrar _MENU_ registros por página",
                    zeroRecords: "No se encontraron registros",
                    info: "Mostrando página _PAGE_ de _PAGES_",
                    infoEmpty: "No hay registros disponibles",
                    infoFiltered: "(filtrado de _MAX_ registros totales)",
                    paginate: {
                        first: "Primera",
                        last: "Última",
                        next: "Siguiente",
                        previous: "Anterior",
                    },
                },
            });

            $("#tipomovimiento").on("keyup", function () {
                table.columns(3).search($(this).val()).draw();
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus + " - " + errorThrown);
        },
    });
});
