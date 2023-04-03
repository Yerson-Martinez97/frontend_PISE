$(document).ready(function () {
    var identity = $(this).val();
    mostrarBancos();
    // mostrarCuentasBancos();
    mostrarConcepto();

    // Agregamos un listener de eventos al select de bancos

    //------------------------------------------------------
    //-----------------MOSTRAR SUCURSAL---------------------
    //------------------------------------------------------
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
                // Disparamos el evento "change" para mostrar las cuentas del primer banco en la lista
            },
        });
    }
    //------------------------------------------------------
    //-----------------MOSTRAR CUENTAS BANCOS---------------
    //------------------------------------------------------
    function mostrarCuentasBancos(id) {
        // alert(id);
        $.ajax({
            url: "http://localhost:3000/api/v1/bancos/" + id + "/cuenta_bancos",
            method: "GET",
            success: function (data) {
                var select = $("#cuenta_banco-select");
                select.empty(); // Vaciamos el select para mostrar las cuentas del banco seleccionado
                data.sort(function (a, b) {
                    return a.id - b.id;
                });
                $.each(data, function (index, item) {
                    select.append($("<option>").val(item.id).text(item.numero_cuenta));
                });
                // cuenta_banco.banco.nombre
            },
        });
    }
    $("#banco-select").on("change", function () {
        // Llamamos a la función para mostrar las cuentas del banco seleccionado
        var id = $(this).val();
        mostrarCuentasBancos(id);
    });
    //------------------------------------------------------
    //-----------------MOSTRAR CONCEPTO MOVIMIENTO----------
    //------------------------------------------------------
    function mostrarConcepto() {
        $.ajax({
            url: "http://localhost:3000/api/v1/concepto_movimiento_bancos",
            method: "GET",
            success: function (data) {
                var select = $("#concepto-select");
                data.sort(function (a, b) {
                    return a.id - b.id;
                });
                $.each(data, function (index, item) {
                    select.append($("<option>").val(item.id).text(item.nombre));
                });
            },
        });
    }
    //------------------------------------------------------
    //-----------------AGREGAR MOVIMIENTO DEPOSITO----------
    //------------------------------------------------------
    $("#agregar-form").on("submit", function (event) {
        if (confirm("¿Estás seguro que deseas retirar este monto?")) {
            // Ejecutar AJAX
            event.preventDefault();
            // var id_banco = $("#sucursal-select").val();
            var monto = $("#monto").val();
            var descripcion = $("#descripcion").val();
            // var id_banco = $("#banco-select").val();
            var id_cuenta_banco = $("#cuenta_banco-select").val();
            var id_concepto = $("#concepto-select").val();
            var id_usuario = $("#id_usuario").val();

            // Crear objeto con datos a enviar
            var dataToSend = {
                movimiento_banco: {
                    monto: monto,
                    id_concepto_movimiento_banco: id_concepto,
                    descripcion: descripcion,
                    id_usuario: id_usuario,
                },
            };
            // Convertir objeto a JSON
            var jsonData = JSON.stringify(dataToSend);

            // Enviar datos a través de AJAX
            $.ajax({
                url:
                    "http://localhost:3000/api/v1/cuenta_bancos/" +
                    id_cuenta_banco +
                    "/movimiento_bancos/create_withdrawal",
                type: "POST",
                contentType: "application/json",
                data: jsonData,
                success: function (response) {
                    // Actualizar tabla después de agregar nueva sucursal
                    if (response.status != "error") {
                        alert("Se ha retirado correctamente");
                        $("#monto").val("");
                        $("#descripcion").val("");
                        var sel_banco_select = $("#banco-select");
                        sel_banco_select.empty();
                        mostrarBancos();
                        var sel_concepto = $("#concepto-select");
                        sel_concepto.empty();
                        mostrarConcepto();
                        $("#id_usuario").val("");
                        window.location.href = "index.php?page=movementhistory";
                    } else {
                        alert(response.message);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error(textStatus + " - " + errorThrown);
                },
            });
        } else {
            // No hacer nada o cancelar el evento
            event.preventDefault();
        }
    });
    //------------------------------------------------------
    //-----------------MOSTRAR ACTIVO FIJO------------------
    //------------------------------------------------------
    function mostrarActivoFijo() {
        $.ajax({
            url: "http://localhost:3000/api/v1/movimiento_bancos/index_all",
            dataType: "json",
            success: function (data) {
                $("#data-table").DataTable({
                    responsive: true,
                    data: data,
                    columns: [
                        { title: "Monto", data: "monto", orderable: false, width: "10%" },
                        { title: "Fecha", data: "fecha", width: "10%" },
                        { title: "Cuenta", data: "id_cuenta_banco", width: "10%" },
                        {
                            title: "Concepto",
                            data: "concepto_movimiento_banco.nombre",
                            width: "10%",
                        },
                        { title: "Descripción", data: "descripcion", width: "10%" },
                        { title: "Usuario", data: "id_usuario", width: "10%" },

                        {
                            title: "",
                            orderable: false,
                            data: null,
                            render: function (data, type, row) {
                                return (
                                    "<button class='border-0 btn-actualizar bg-transparent' style='font-size:1.5rem;' " +
                                    "data-id='" +
                                    row.id +
                                    "'><i class='fa-solid fa-money-bill-transfer' style='color: #16FF00;'></i></button>"
                                );
                            },
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
                        if (data.fecha_baja == null) {
                            $(row).css("background-color", "#fff");
                        } else {
                            $(row).css("background-color", "#ddd");
                        }
                    },
                });
                $("#data-table").on("click", ".btn-actualizar", function () {
                    // var id = $(this).data("id");
                    // var asi_fecha_hora = $(this).data("fecha_hora");
                    // $("#asi_actualizar-id").val(id);
                    // $("#asi_actualizar-asi_fecha_hora").val(asi_fecha_hora);
                    // $("#modal-asignar").modal("show"); // Mostrar modal de actualización
                    var resultado = confirm("¿Estás seguro de que quieres continuar?");
                    if (resultado == true) {
                        var id_activo_fijo = $(this).data("id");
                        var fecha = moment();
                        var fecha_actual = fecha.format("YYYY-MM-DD");
                        var dataToSend = {
                            activo_fijo: {
                                fecha_baja: fecha_actual,
                            },
                        };
                        var jsonData = JSON.stringify(dataToSend);
                        // console.log(fechaString);
                        $.ajax({
                            url: "http://localhost:3000/api/v1/activo_fijos/" + id_activo_fijo,
                            type: "PUT",
                            contentType: "application/json",
                            data: jsonData,
                            success: function (response) {
                                $("#data-table").DataTable().destroy(); //Destruir la tabla
                                mostrarActivoFijo(); // Mostrar tabla después de actualizar sucursal
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                console.error(textStatus + " - " + errorThrown);
                            },
                        });
                    }
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error al cargar los datos de la tabla: " + textStatus);
            },
        });
    }
});
