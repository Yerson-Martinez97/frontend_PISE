$(document).ready(function () {
    var identity = $(this).val();
    mostrarBancos();
    //NOMBRE BANCO
    function mostrarBancos() {
        $.ajax({
            url: "http://localhost:3000/api/v1/bancos/",
            method: "GET",
            success: function (data) {
                var select = $("#banco-select");
                data.sort(function (a, b) {
                    return a.id - b.id;
                });
                $.each(data, function (index, item) {
                    select.append($("<option>").val(item.id).text(item.nombre));
                });
                select.val(data[0].id).trigger("change");
            },
        });
    }
    $("#banco-select").change(function () {
        identity = $(this).val();
        // Aquí puedes hacer lo que necesites con el valor seleccionado
        $("#data-table").DataTable().destroy();
        actualizarTabla();
    });

    $("#agregar-form").on("submit", function (event) {
        event.preventDefault();
        var id_banco = $("#banco-select").val();

        var numero_cuenta = $("#numero_cuenta").val();
        var tipo_moneda = $("#tipo_moneda").val();
        var saldo = $("#saldo").val();
        var fecha_ape = $("#fecha_apertura").val();
        //
        var fecha_apertura = moment(fecha_ape).format("DD/MM/YYYY");
        //
        var estado = "A";
        var id_contacto = $("#id_contacto").val();
        alert(
            id_banco +
                " " +
                numero_cuenta +
                " " +
                tipo_moneda +
                " " +
                saldo +
                " " +
                fecha_apertura +
                " " +
                estado +
                " " +
                id_contacto
        );

        // Crear objeto con datos a enviar
        // var dataToSend = {
        //     cuenta_bancos: {
        //         numero_cuenta: numero_cuenta,
        //     },
        // };
        // // Convertir objeto a JSON
        // var jsonData = JSON.stringify(dataToSend);

        // // Enviar datos a través de AJAX
        // $.ajax({
        //     url: "http://localhost:3000/api/v1/bancos/" + 1 + "/cuenta_bancos",
        //     type: "POST",
        //     contentType: "application/json",
        //     data: jsonData,
        //     success: function (response) {
        //         // Actualizar tabla después de agregar nueva sucursal
        //         $("#data-table").DataTable().destroy();
        //         actualizarTabla();
        //     },
        //     error: function (jqXHR, textStatus, errorThrown) {
        //         console.error(textStatus + " - " + errorThrown);
        //     },
        // });
    });
    //ACTUALIZAR
    $("#actualizar-form").on("submit", function (event) {
        event.preventDefault();
        var id = $("#actualizar-id").val();
        var nombre = $("#actualizar-nombre").val();

        // Crear objeto con datos a enviar
        var dataToSend = {
            banco: {
                nombre: nombre,
            },
        };

        // Convertir objeto a JSON
        var jsonData = JSON.stringify(dataToSend);

        // Enviar datos a través de AJAX
        $.ajax({
            url: "http://localhost:3000/api/v1/bancos/" + identity,
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
            url: "http://localhost:3000/api/v1/bancos/" + identity + "/cuenta_bancos",
            type: "GET",
            dataType: "json",
            success: function (data) {
                // Inicializar la tabla con DataTablesF
                $("#data-table").DataTable({
                    data: data,
                    columns: [
                        { title: "ID", data: "id" },
                        { title: "Cuenta", data: "numero_cuenta" },
                        { title: "Tipo Moneda", data: "tipo_moneda" },
                        { title: "Saldo", data: "saldo" },
                        { title: "Contacto", data: "id_contacto" },
                        { title: "Apertura", data: "fecha_apertura" },
                        { title: "Estado", data: "estado" },
                        { title: "Cierre", data: "fecha_cierre" },
                        { title: "Banco", data: "id_banco" },
                        {
                            title: "",
                            data: null,
                            render: function (data, type, row) {
                                return (
                                    "<button class='border-0 btn-actualizar' data-id='" +
                                    row.id +
                                    "' data-numero_cuenta='" +
                                    row.numero_cuenta +
                                    "' data-tipo_moneda='" +
                                    row.tipo_moneda +
                                    "' data-saldo='" +
                                    row.saldo +
                                    "' data-id_contacto='" +
                                    row.id_contacto +
                                    "' data-fecha_apertura='" +
                                    row.fecha_apertura +
                                    "' data-estado='" +
                                    row.estado +
                                    "' data-fecha_cierre='" +
                                    row.fecha_cierre +
                                    "' data-id_banco='" +
                                    row.id_banco +
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
                    var numero_cuenta = $(this).data("numero_cuenta");
                    var nombre = $(this).data("tipo_moneda");
                    var saldo = $(this).data("saldo");
                    var id_contacto = $(this).data("id_contacto");
                    var fecha_apertura = $(this).data("fecha_apertura");
                    var estado = $(this).data("estado");
                    var fecha_cierre = $(this).data("fecha_cierre");
                    var id_banco = $(this).data("id_banco");

                    // Prellenar campos del formulario con los valores de la sucursal
                    $("#actualizar-id").val(id);
                    $("#actualizar-numero_cuenta").val(numero_cuenta);
                    $("#actualizar-tipo_moneda").val(nombre);
                    $("#actualizar-saldo").val(saldo);
                    $("#actualizar-id_contacto").val(id_contacto);
                    $("#actualizar-fecha_apertura").val(fecha_apertura);
                    $("#actualizar-fec_ape").text(fecha_apertura);
                    $("#actualizar-estado").val(estado);
                    $("#actualizar-fecha_cierre").val(fecha_cierre);
                    $("#actualizar-fec_cie").text(fecha_cierre + "ok");
                    $("#actualizar-id_banco").val(id_banco);

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
