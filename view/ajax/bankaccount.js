$(document).ready(function () {
    var identity = $(this).val();
    mostrarBancos();
    mostrarCuentaBanco();
    //------------------------------------------------------
    //-----------------MOSTRAR BANCOS-----------------------
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
            },
        });
    }
    //------------------------------------------------------
    //-----------------MOSTRAR CONTACTOS--------------------
    //------------------------------------------------------
    function mostrarContactos() {
        $.ajax({
            url: "http://localhost:3000/api/v1/contactos/",
            method: "GET",
            success: function (data) {
                var select = $("#contacto-select");
                data.sort(function (a, b) {
                    return a.id - b.id;
                });
                $.each(data, function (index, item) {
                    select.append(
                        $("<option>")
                            .val(item.id)
                            .text(item.ci + " " + item.nombre)
                    );
                });
                select.val(data[0].id).trigger("change");

                // Guardar los datos en el localStorage
                localStorage.setItem("contactos", JSON.stringify(data));
            },
        });
    }

    $("#saldo").on("keydown", function (e) {
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
        var input = $("#saldo");
        var monto = parseInt(input.val() || 0);
        input.val(monto + valor);
    }
    //------------------------------------------------------
    //-----------------FILTRAR CONTACTOS--------------------
    //------------------------------------------------------
    function filtrarContactos(term) {
        term = term.toLowerCase();
        var data = JSON.parse(localStorage.getItem("contactos"));
        var select = $("#contacto-select");
        select.empty();
        if (term === "") {
            return; // No mostrar nada si el término está vacío
        }
        var filtrados = data.filter(function (item) {
            return (
                (item.ci && item.ci.toLowerCase().startsWith(term)) ||
                (item.nombre && item.nombre.toLowerCase().startsWith(term))
            );
        });
        $.each(filtrados, function (index, item) {
            select.append(
                $("<option>")
                    .val(item.id)
                    .text(item.ci + " - " + item.nombre)
            );
        });
        if (filtrados.length > 0) {
            select.val(filtrados[0].id).trigger("change");
        }
        localStorage.setItem("contactos", JSON.stringify(data));
    }
    //------------------------------------------------------
    //-----------------BUSCAR CONTACTOS--------------------
    //------------------------------------------------------
    // mostrarContactos();
    $("#buscar-contacto").on("input", function () {
        var term = $(this).val();
        if (term) {
            filtrarContactos(term);
        }
        if (filtrarContactos(term)) {
            select.empty();
        }
    });

    //------------------------------------------------------
    //-----------------AGREGAR UNA CUENTA DE BANCO----------
    //------------------------------------------------------

    $("#agregar-form").on("submit", function (event) {
        event.preventDefault();
        var id_banco = $("#banco-select").val();
        var numero_cuenta = $("#numero_cuenta").val();
        var tipo_moneda = $("#tipo_moneda-select").val();
        var saldo = $("#saldo").val();
        var fecha_ape = $("#fecha_apertura").val();
        var fecha_apertura = moment(fecha_ape).format("DD-MM-YYYY");
        // fecha_apertura = fecha.format("YYYY-MM-DD");

        var estado = "A";
        var id_contacto = $("#contacto-select").val();
        // alert(
        //     id_banco +
        //         " " +
        //         numero_cuenta +
        //         " " +
        //         tipo_moneda +
        //         " " +
        //         saldo +
        //         " " +
        //         fecha_apertura +
        //         " " +
        //         estado +
        //         " " +
        //         id_contacto
        // );

        // Crear objeto con datos a enviar
        var dataToSend = {
            cuenta_banco: {
                numero_cuenta: numero_cuenta,
                tipo_moneda: tipo_moneda,
                saldo: saldo,
                fecha_apertura: fecha_apertura,
                estado: estado,
                id_contacto: id_contacto,
            },
        };
        // Convertir objeto a JSON
        var jsonData = JSON.stringify(dataToSend); // Convertir objeto a JSON
        // Enviar datos a través de AJAX
        $.ajax({
            url: "http://localhost:3000/api/v1/bancos/" + id_banco + "/cuenta_bancos",
            type: "POST",
            contentType: "application/json",
            data: jsonData,
            success: function (response) {
                // Actualizar tabla después de agregar nueva sucursal
                $("#data-table").DataTable().destroy();
                mostrarCuentaBanco();
                $("#numero_cuenta").val("");
                $("#fecha_apertura").val("");
                $("#saldo").val("");
                $("#buscar-contacto").val("");
                mostrarBancos();
                mostrarContactos();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus + " - " + errorThrown);
            },
        });
    });
    //------------------------------------------------------
    //-----------------ACTUALIZAR CUENTAS DE BANCOs---------
    //------------------------------------------------------

    $("#actualizar-form").on("submit", function (event) {
        event.preventDefault();
        var id = $("#actualizar-id").val();
        var estado = $("#actualizar-estado").val();
        var fecha = moment();
        var fecha_cierre = fecha.format("YYYY-MM-DD");
        if (estado == "I") {
            var dataToSend = {
                cuenta_banco: {
                    estado: estado,
                    fecha_cierre: fecha_cierre,
                },
            };
        } else {
            var dataToSend = {
                cuenta_banco: {
                    estado: estado,
                    fecha_cierre: null,
                },
            };
        }
        var jsonData = JSON.stringify(dataToSend);
        $.ajax({
            url: "http://localhost:3000/api/v1/cuenta_bancos/" + id,
            type: "PUT",
            contentType: "application/json",
            data: jsonData,
            success: function (response) {
                $("#data-table").DataTable().destroy();
                $("#modal-actualizar").modal("hide");
                mostrarCuentaBanco(); // Actualizar tabla después de actualizar sucursal
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus + " - " + errorThrown);
            },
        });
        $("#actualizar-modal").modal("hide"); // Ocultar modal después de actualizar
    });

    function llenarSelectEstado(id_banco, estado_actual) {
        // Obtener lista de bancos desde el servidor
        $.ajax({
            url: "http://localhost:3000/api/v1/cuenta_bancos/index_all",
            dataType: "json",
            success: function (data) {
                $("#actualizar-estado").empty(); // Vaciar el select actual
                // Agregar opciones de bancos
                var optionA = '<option value="A" class="text-success">Activo</option>';
                var optionI = '<option value="I" class="text-danger">Inactivo</option>';
                $("#actualizar-estado").append(optionA);
                $("#actualizar-estado").append(optionI);
                if (estado_actual === "A") {
                    // $("#actualizar-estado").val("A");
                    $("#actualizar-estado option[value='A']").prop("selected", true);
                } else if (estado_actual === "I") {
                    $("#actualizar-estado option[value='I']").prop("selected", true);
                }
            },
        });
    }

    //------------------------------------------------------
    //-----------------MOSTRAR CUENTAS BANCO----------------
    //------------------------------------------------------
    function mostrarCuentaBanco() {
        $.ajax({
            url: "http://localhost:3000/api/v1/cuenta_bancos/index_all",
            type: "GET",
            dataType: "json",
            success: function (data) {
                // Inicializar la tabla con DataTablesF
                $("#data-table").DataTable({
                    data: data,
                    columns: [
                        { title: "Cuenta", data: "numero_cuenta", orderable: false },
                        { title: "Moneda", data: "tipo_moneda" },
                        { title: "Saldo", data: "saldo" },
                        { title: "Contacto", data: "contacto.nombre" },
                        { title: "Apertura", data: "fecha_apertura" },
                        {
                            title: "Estado",
                            data: "estado",
                            render: function (data, type, row) {
                                return data === "A" ? "Activo" : "Inactivo";
                            },
                        },
                        { title: "Cierre", data: "fecha_cierre" },
                        { title: "Banco", data: "banco.nombre" },
                        {
                            title: "Accion",
                            data: null,
                            render: function (data, type, row) {
                                if (row.estado == "A") {
                                    return (
                                        "<button class='border-0 btn-actualizar bg-transparent' data-id='" +
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
                                        "'><i class='fa-solid fa-circle-arrow-down fa-lg' style='color: #ea5455;'></i></button>"
                                    );
                                } else if (row.estado == "I") {
                                    return (
                                        "<button class='border-0 btn-actualizar bg-transparent' data-id='" +
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
                                        "'><i class='fa-solid fa-ban fa-lg' style='color: #c3c6d1;'></i></button>"
                                    );
                                }
                            },
                            orderable: false,
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
                    rowCallback: function (row, data) {
                        // Obtener el valor de la columna "Estado"
                        var estado = data.estado;
                        // Establecer el color de fondo de la fila según el estado
                        if (data.estado == "A") {
                            $(row).css("background-color", "#fff");
                        } else if (estado === "I") {
                            $(row).css("background-color", "#CFD2CF");
                        }
                    },
                });

                //Agregar evento para el botón de actualización
                $("#data-table").on("click", ".btn-actualizar", function () {
                    var id = $(this).data("id");
                    var id_contacto = $(this).data("id_contacto");
                    var estado = $(this).data("estado");

                    // Prellenar campos del formulario con los valores de la sucursal
                    $("#actualizar-id").val(id);
                    $("#actualizar-id_contacto").val(id_contacto);
                    $("#actualizar-estado").val(estado);
                    llenarSelectEstado(id, estado);
                    // Mostrar modal de actualización
                    // if (estado == "A") {
                    //     $("#modal-actualizar").modal("show");
                    // }
                    $("#modal-actualizar").modal("show");
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus + " - " + errorThrown);
            },
        });
    }
});
