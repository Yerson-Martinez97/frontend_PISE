$(document).ready(function () {
    MostrarBancos();
    // setInterval(actualizarTabla, 5000);
    //------------------------------------------------------
    //-----------------AGREGAR BANCO------------------------
    //------------------------------------------------------
    $("#agregar-form").on("submit", function (event) {
        event.preventDefault();
        var nombre = $("#nombre").val();
        var dataToSend = {
            banco: {
                nombre: nombre,
            },
        };
        var jsonData = JSON.stringify(dataToSend); // Convertir objeto a JSON
        $.ajax({
            url: "http://localhost:3000/api/v1/bancos",
            type: "POST",
            contentType: "application/json",
            data: jsonData,
            success: function (response) {
                $("#data-table").DataTable().destroy();
                MostrarBancos();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus + " - " + errorThrown);
            },
        });
    });
    //------------------------------------------------------
    //-----------------ACTUALIZAR BANCO---------------------
    //------------------------------------------------------
    $("#actualizar-form").on("submit", function (event) {
        event.preventDefault();
        var id = $("#actualizar-id").val();
        var nombre = $("#actualizar-nombre").val();
        var dataToSend = {
            banco: {
                nombre: nombre,
            },
        }; // Crear objeto con datos a enviar
        var jsonData = JSON.stringify(dataToSend); // Convertir objeto a JSON
        $.ajax({
            url: "http://localhost:3000/api/v1/bancos/" + id,
            type: "PUT",
            contentType: "application/json",
            data: jsonData,
            success: function (response) {
                $("#data-table").DataTable().destroy(); //Destruir la tabla
                $("#modal-actualizar").modal("hide"); //Ocultar el modal
                MostrarBancos(); // Mostrar tabla después de actualizar sucursal
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus + " - " + errorThrown);
            },
        });
        $("#actualizar-modal").modal("hide"); // Ocultar modal después de actualizar
    });
    //------------------------------------------------------
    //-----------------MOSTRAR BANCOS-----------------------
    //------------------------------------------------------
    function MostrarBancos() {
        $.ajax({
            url: "http://localhost:3000/api/v1/bancos",
            type: "GET",
            dataType: "json",
            success: function (data) {
                // Inicializar la tabla con DataTables
                $("#data-table").DataTable({
                    data: data,
                    columns: [
                        { title: "Nombre", data: "nombre" },
                        {
                            title: "",
                            data: null,
                            render: function (data, type, row) {
                                return (
                                    "<button class='border-0 btn-actualizar' data-id='" +
                                    row.id +
                                    "' data-nombre='" +
                                    row.nombre +
                                    "'><i class='fa-regular fa-pen-to-square' style='color: #000;'></i></button>"
                                );
                            },
                            orderable: false,
                        },
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
                // Agregar evento para el botón de actualización
                $("#data-table").on("click", ".btn-actualizar", function () {
                    var id = $(this).data("id");
                    var nombre = $(this).data("nombre");
                    // Prellenar campos del formulario con los valores de la sucursal
                    $("#actualizar-id").val(id);
                    $("#actualizar-nombre").val(nombre);
                    $("#modal-actualizar").modal("show"); // Mostrar modal de actualización
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus + " - " + errorThrown);
            },
        });
    }
});
