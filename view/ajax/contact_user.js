$(document).ready(function () {
    actualizarTabla();

    // setInterval(actualizarTabla, 5000);

    $("#agregar-form").on("submit", function (event) {
        event.preventDefault();
        var nombre = $("#nombre").val();
        var ape_pat = $("#ape_pat").val();
        var ape_mat = $("#ape_mat").val();
        var telefono = $("#telefono").val();
        var direccion = $("#direccion").val();
        var ci = $("#ci").val();
        var nit = $("#nit").val();
        var email = $("#email").val();
        var login = $("#login").val();
        var password = $("#password").val();
        // Crear objeto con datos a enviar
        var dataToSend = {
            sucursal: {
                nombre: nombre,
                direccion: direccion,
            },
        };
        // Convertir objeto a JSON
        var jsonData = JSON.stringify(dataToSend);

        // Enviar datos a través de AJAX
        $.ajax({
            url: "http://localhost:3000/api/v1/sucursales/",
            type: "POST",
            contentType: "application/json",
            data: jsonData,
            success: function (response) {
                // Actualizar tabla después de agregar nueva sucursal
                $("#data-table").DataTable().destroy();
                actualizarTabla();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus + " - " + errorThrown);
            },
        });
    });

    $("#actualizar-form").on("submit", function (event) {
        event.preventDefault();
        var id = $("#actualizar-id").val();
        var nombre = $("#actualizar-nombre").val();
        var direccion = $("#actualizar-direccion").val();

        // Crear objeto con datos a enviar
        var dataToSend = {
            sucursal: {
                nombre: nombre,
                direccion: direccion,
            },
        };

        // Convertir objeto a JSON
        var jsonData = JSON.stringify(dataToSend);

        // Enviar datos a través de AJAX
        $.ajax({
            url: "http://localhost:3000/api/v1/sucursales/" + id,
            type: "PUT",
            contentType: "application/json",
            data: jsonData,
            success: function (response) {
                // Actualizar tabla después de actualizar sucursal
                $("#data-table").DataTable().destroy();
                $("#modal-actualizar").modal("hide");
                actualizarTabla();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus + " - " + errorThrown);
            },
        });

        // Ocultar modal después de actualizar
        $("#actualizar-modal").modal("hide");
    });

    function actualizarTabla() {
        $.ajax({
            url: "http://localhost:3000/api/v1/usuarios",
            type: "GET",
            dataType: "json",
            success: function (data) {
                // Inicializar la tabla con DataTablesF
                $("#data-table").DataTable({
                    data: data,
                    columns: [
                        { title: "Nombre", data: "contacto.nombre" },
                        { title: "Apellido Paterno", data: "contacto.apellido_paterno" },
                        { title: "Apellido Materno", data: "contacto.apellido_materno" },
                        { title: "Login", data: "login" },
                        { title: "Password", data: "password" },
                        { title: "Estado", data: "estado" },
                        { title: "Tipo Usuario", data: "id_tipo_usuario" },
                        {
                            title: "Accion",
                            data: null,
                            render: function (data, type, row) {
                                return (
                                    "<button class='border-0 btn-actualizar' data-id='" +
                                    row.id +
                                    "' data-nombre='" +
                                    row.nombre +
                                    "' data-direccion='" +
                                    row.direccion +
                                    "'><i class='fa-regular fa-pen-to-square' style='color: #000;'></i></button>"
                                );
                            },
                        },
                    ],
                    paging: true,
                    pageLength: 5,
                    lengthMenu: [2, 5, 10, 20],
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

                // Agregar evento para el botón de actualización
                $("#data-table").on("click", ".btn-actualizar", function () {
                    var id = $(this).data("id");
                    var nombre = $(this).data("nombre");
                    var direccion = $(this).data("direccion");

                    // Prellenar campos del formulario con los valores de la sucursal
                    $("#actualizar-id").val(id);
                    $("#actualizar-nombre").val(nombre);
                    $("#actualizar-direccion").val(direccion);

                    // Mostrar modal de actualización
                    $("#modal-actualizar").modal("show");
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus + " - " + errorThrown);
            },
        });
    }
});
