$(document).ready(function () {
    var identity = $(this).val();
    mostrarClientes();
    // mostrarCuentasBancos();

    // Agregamos un listener de eventos al select de bancos

    //------------------------------------------------------
    //-----------------MOSTRAR SUCURSAL---------------------
    //------------------------------------------------------
    function mostrarClientes() {
        $.ajax({
            url: "http://localhost:3000/api/v1/contactos/clientes/",
            method: "GET",
            success: function (data) {
                var select = $("#cliente-select");
                data.sort(function (a, b) {
                    return a.id - b.id;
                });
                $.each(data, function (index, item) {
                    select.append($("<option>").val(item.id).text(item.contacto.nombre));
                });
                select.val(data[0].id).trigger("change");
                // Disparamos el evento "change" para mostrar las cuentas del primer banco en la lista
            },
        });
    }

    // Agregamos un evento "change" al select
    $("#cliente-select").on("change", function () {
        // Obtenemos el id del cliente seleccionado
        var clienteId = $(this).val();
        // Realizamos una petición AJAX para obtener la información del cliente
        $.ajax({
            url: "http://localhost:3000/api/v1/clientes/" + clienteId,
            method: "GET",
            success: function (cliente) {
                // Actualizamos los valores en el card
                $("#cliente-nombre").text(cliente.contacto.nombre);
                $("#cliente-apellidos").text(
                    cliente.contacto.apellido_paterno + " " + cliente.contacto.apellido_materno
                );
                $("#cliente-credito_limite").text(cliente.credito_limite);
            },
        });
    });
    $("#btn-cuentas-cobrar").on("click", function (event) {
        event.preventDefault();
        var cliente = $("#cliente-select").val();
        if ($.fn.DataTable.isDataTable("#data-table")) {
            $("#data-table").DataTable().destroy();
        }
        mostrarCXC(cliente);
    });

    $("#btn-ver-cuotas").on("click", function (event) {
        event.preventDefault();
        var cliente = $("#cliente-select").val();
        if ($.fn.DataTable.isDataTable("#data-table")) {
            $("#data-table").DataTable().destroy();
        }
        mostrarCuotas(cliente);
    });

    //------------------------------------------------------
    //-----------------MOSTRAR CXC--------------------------
    //------------------------------------------------------
    function mostrarCXC(cliente) {
        $.ajax({
            url: "http://localhost:3000/api/v1/clientes/" + cliente + "/find_cxc",
            dataType: "json",
            success: function (data) {
                $("#data-table").DataTable({
                    responsive: true,
                    data: data,
                    columns: [
                        { title: "Vencimiento", data: "fecha_vencimiento", width: "10%" },
                        { title: "Registrado", data: "fecha_registro", width: "10%" },
                        { title: "Deuda Capital", data: "deuda_capital", width: "10%" },
                        { title: "Monto Pagado", data: "monto_pagado", width: "10%" },
                        { title: "Monto Deuda Actual", data: "monto_deuda_actual", width: "10%" },
                        { title: "Concepto", data: "id_concepto_cxc", width: "10%" },
                        {
                            title: "Estado",
                            data: "estado",
                            width: "10%",
                            render: function (data) {
                                return data === "P" ? "Pendiente" : "Cancelado";
                            },
                        },
                        {
                            title: "Cancelación",
                            data: "estado",
                            width: "10%",
                            render: function (data, type, row) {
                                if (row.estado == "P") {
                                    return (
                                        "<button class='border-0 btn-actualizar bg-transparent' data-id='" +
                                        row.id +
                                        "'><i class='fa-solid fa-hand-holding-dollar fa-2xl' style='color: #1f5135;'></i></button>"
                                    );
                                } else {
                                    return (
                                        "<button class='border-0 bg-transparent' data-id='" +
                                        row.id +
                                        "'><i class='fa-regular fa-circle-check fa-2xl' style='color: #C7E9B0;'></i></button>"
                                    );
                                }
                            },
                            orderable: false,
                        },
                    ],
                    paging: true,
                    pageLength: 5,
                    lengthMenu: [5, 10, 20, 50],
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
                    rowCallback: function (row, data) {
                        // Obtener el valor de la columna "Estado"
                        var estado = data.estado;
                        // Establecer el color de fondo de la fila según el estado
                        if (estado == "P") {
                            $(row).css("background-color", "#fff");
                        } else {
                            $(row).css("background-color", "#ddd");
                        }
                    },
                });
                $("#data-table").on("click", ".btn-actualizar", function () {
                    var id = $(this).data("id");
                    // Prellenar campos del formulario con los valores de la sucursal
                    $("#actualizar-id").val(id);
                    $("#modal-actualizar_cuota").modal("hide"); // Mostrar modal de actualización
                    $("#modal-actualizar_cxc").modal("show"); // Mostrar modal de actualización
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error al cargar los datos de la tabla: " + textStatus);
            },
        });
    }
    //------------------------------------------------------
    //-----------------KEYDOWN------------------------------
    //------------------------------------------------------
    $("#actualizar-monto_pagar").on("keydown", function (e) {
        if (e.which == 38) {
            // Flecha hacia arriba
            e.preventDefault(); // Evitar que se mueva el cursor
            actualizarValor(100);
        } else if (e.which == 40) {
            // Flecha hacia abajo
            e.preventDefault(); // Evitar que se mueva el cursor
            actualizarValor(-100);
        }
    });

    function actualizarValor(valor) {
        var input = $("#actualizar-monto_pagar");
        var monto = parseInt(input.val() || 0);
        if (valor < 0 && monto < 100) {
            return; // No se permite restar si el monto es menor a 100
        }
        input.val(monto + valor);
    }

    //------------------------------------------------------
    //-----------------MOSTRAR CUOTAS-----------------------
    //------------------------------------------------------
    function mostrarCuotas(cliente) {
        $.ajax({
            url: "http://localhost:3000/api/v1/clientes/" + cliente + "/cuotas",
            dataType: "json",
            success: function (data) {
                $("#data-table").DataTable({
                    responsive: true,
                    data: data,
                    columns: [
                        { title: "Fecha Pago", data: "fecha_pago", width: "10%" },
                        { title: "Interes", data: "interes", width: "10%" },
                        { title: "Capital", data: "capital", width: "10%" },
                        { title: "Total", data: "total", width: "10%" },
                        {
                            title: "Estado",
                            data: "estado",
                            width: "10%",
                            render: function (data) {
                                return data === "P" ? "Pendiente" : "Cancelado";
                            },
                        },
                        {
                            title: "Cancelación",
                            data: "estado",
                            width: "10%",
                            render: function (data, type, row) {
                                if (row.estado == "P") {
                                    return (
                                        "<button class='border-0 btn-actualizar_cuota bg-transparent' data-id='" +
                                        row.id +
                                        "'><i class='fa-solid fa-hand-holding-dollar fa-2xl' style='color: #1f5135;'></i></button>"
                                    );
                                } else {
                                    return (
                                        "<button class='border-0 bg-transparent' data-id='" +
                                        row.id +
                                        "'><i class='fa-regular fa-circle-check fa-2xl' style='color: #C7E9B0;'></i></button>"
                                    );
                                }
                            },
                            orderable: false,
                        },
                    ],
                    paging: true,
                    pageLength: 5,
                    lengthMenu: [5, 10, 20, 50],
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
                    rowCallback: function (row, data) {
                        // Obtener el valor de la columna "Estado"
                        var estado = data.estado;
                        // Establecer el color de fondo de la fila según el estado
                        if (estado == "P") {
                            $(row).css("background-color", "#fff");
                        } else {
                            $(row).css("background-color", "#ddd");
                        }
                    },
                });
                $("#data-table").on("click", ".btn-actualizar_cuota", function () {
                    var id = $(this).data("id");
                    // Prellenar campos del formulario con los valores de la sucursal
                    $("#actualizar-id_cuota").val(id);
                    $("#modal-actualizar_cxc").modal("hide"); // Mostrar modal de actualización
                    $("#modal-actualizar_cuota").modal("show"); // Mostrar modal de actualización
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error al cargar los datos de la tabla: " + textStatus);
            },
        });
    }

    //------------------------------------------------------
    //-----------------MODAL AGREGAR MONTO A CXC------------
    //------------------------------------------------------

    $("#actualizar-form_cxc").on("submit", function (event) {
        event.preventDefault();
        var id_cliente = $("#cliente-select").val();
        var id_caja = $("#id_caja").val();
        var id = $("#actualizar-id").val();

        $.ajax({
            url: "http://localhost:3000/api/v1/clientes/" + id_cliente + "/find_cxc",
            type: "GET",
            dataType: "json",
            success: function (response) {
                // Recorrer el arreglo con $.each()
                $.each(response, function (index, item) {
                    if (item.id == id) {
                        var cantidad = parseFloat($("#actualizar-monto_pagar").val());
                        // El valor de la propiedad "deuda_capital" del objeto actual es igual a la variable "cantidad"
                        if (cantidad <= item.monto_deuda_actual) {
                            alert("ok");
                            id = $("#actualizar-id").val();
                            var monto_pagar = $("#actualizar-monto_pagar").val();
                            var descripcion = $("#actualizar-descripcion").val();
                            console.log(id + " " + monto_pagar + " " + descripcion);
                            var dataToSend = {
                                movimiento_caja: {
                                    descripcion: descripcion,
                                    id_concepto_movimiento_caja: 2,
                                    monto: monto_pagar,
                                    id_caja: id_caja,
                                },
                            };
                            var jsonData = JSON.stringify(dataToSend);
                            $.ajax({
                                url: "http://localhost:3000/api/v1/cxc/" + id + "/ingreso_cxc",
                                type: "POST",
                                contentType: "application/json",
                                data: jsonData,
                                success: function (response) {
                                    // $("#modal-actualizar_cxc").modal("hide"); // Ocultar modal después de actualizar
                                    // $("#data-table").DataTable().destroy();
                                    // mostrarCXC(); // Actualizar tabla después de actualizar sucursal
                                    window.location.href = "index.php?page=movementhistorybox";
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    console.error(textStatus + " - " + errorThrown);
                                },
                            });
                        } else {
                            alert("Cantidad excedida");
                        }
                        // Salir del bucle $.each() con "return false;"
                        return false;
                    }
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus + " - " + errorThrown);
            },
        });
        //
        $("#modal-actualizar_cxc").modal("hide"); // Ocultar modal después de actualizar
    });

    //------------------------------------------------------
    //-----------------MODAL AGREGAR MONTO A OTRO---------------
    //------------------------------------------------------
    $("#btn-otros").on("click", function (event) {
        event.preventDefault();
        // var cliente = $("#cliente-select").val();
        if ($.fn.DataTable.isDataTable("#data-table")) {
            $("#data-table").DataTable().destroy();
        }
        var cli = $("#cliente-select").val();
        $("#actualizar-id_otro").val(cli);

        $("#modal-actualizar_otro").modal("show"); // Ocultar modal después de actualizar
    });

    //------------------------------------------------------
    //----------------- AGREGAR MONTO DE OTRO---------------
    //------------------------------------------------------

    $("#actualizar-form_otro").on("submit", function (event) {
        event.preventDefault();
        var id_contacto = $("#actualizar-id_otro").val();
        var descripcion = $("#actualizar-descripcion_otro").val();
        var monto = $("#actualizar-monto_otro").val();
        var id_caja = $("#id_caja").val();

        // alert(id_contacto + " " + descripcion + " " + monto);

        var dataToSend = {
            movimiento_caja: {
                descripcion: descripcion,
                id_concepto_movimiento_caja: 4,
                monto: monto,
                id_caja: id_caja,
                id_contacto: id_contacto,
            },
        };
        var jsonData = JSON.stringify(dataToSend);
        $.ajax({
            url: "http://localhost:3000/api/v1/movimiento_caja/ingreso",
            type: "POST",
            contentType: "application/json",
            data: jsonData,
            success: function (response) {
                alert("Monto ingresado correctamente");
                $("#actualizar-descripcion_otro").val("");
                $("#actualizar-monto_otro").val("");
                var descripcion = $("#actualizar-descripcion_otro").val();

                $("#modal-actualizar_otro").modal("hide"); // Ocultar modal después de actualizar
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus + " - " + errorThrown);
            },
        });
    });

    // $("#modal-actualizar_cxc").modal("hide"); // Ocultar modal después de actualizar

    //------------------------------------------------------
    //-----------------MODAL AGREGAR MONTO A CXC------------
    //------------------------------------------------------

    $("#actualizar-form_cuota").on("submit", function (event) {
        event.preventDefault();
        var id_caja = $("#id_caja").val();
        var id_cuota = $("#actualizar-id_cuota").val();
        var descripcion = $("#actualizar-descripcion_cuota").val();

        var dataToSend = {
            movimiento_caja: {
                descripcion: descripcion,
                id_concepto_movimiento_caja: 2,
                id_caja: id_caja,
            },
        };
        var jsonData = JSON.stringify(dataToSend);
        $.ajax({
            url: "http://localhost:3000/api/v1/cuota/" + id_cuota + "/ingreso_cuota",
            type: "POST",
            contentType: "application/json",
            data: jsonData,
            success: function (response) {
                window.location.href = "index.php?page=movementhistorybox";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus + " - " + errorThrown);
            },
        });
        //

        $("#modal-actualizar_cxc").modal("hide"); // Ocultar modal después de actualizar
    });
});
