$(document).ready(function () {
    var identity = $(this).val();
    mostrarBancos();
    //------------------------------------------------------
    //-----------------METODOS------------------------------
    //------------------------------------------------------

    //-----------------MOSTRAR BANCOS-----------------------
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
        $("#data-table").DataTable().destroy();
        mostrarCuentaBanco();
    });
    //-----------------MOSTRAR CONTACTOS--------------------
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
    function filtrarContactos(term) {
        term = term.toLowerCase();
        var data = JSON.parse(localStorage.getItem("contactos"));
        var select = $("#contacto-select");
        select.empty();
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
    mostrarContactos();
    $("#buscar-contacto").on("input", function () {
        var term = $(this).val();
        filtrarContactos(term);
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
        var fecha_apertura = moment(fecha_ape).format("DD/MM/YYYY");
        var estado = "A";
        var id_contacto = $("#contacto-select").val();
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
        var dataToSend = {
            cuenta_banco: {
                estado: estado,
                fecha_cierre: fecha_cierre,
            },
        };
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
            url: "http://localhost:3000/api/v1/bancos/" + id_banco + "/cuenta_bancos",
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
    //-----------------METODO MOSTRA CUENTA BANCO-----------
    //------------------------------------------------------
    function mostrarCuentaBanco() {
        $.ajax({
            url: "http://localhost:3000/api/v1/bancos/" + identity + "/cuenta_bancos",
            type: "GET",
            dataType: "json",
            success: function (data) {
                // Inicializar la tabla con DataTablesF
                $("#data-table").DataTable({
                    data: data,
                    columns: [
                        { title: "Cuenta", data: "numero_cuenta" },
                        { title: "Tipo Moneda", data: "tipo_moneda" },
                        { title: "Saldo", data: "saldo" },
                        { title: "Contacto", data: "contacto.nombre" },
                        { title: "Apertura", data: "fecha_apertura" },
                        { title: "Estado", data: "estado" },
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
                                } else {
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

                // Agregar evento para el botón de actualización
                $("#data-table").on("click", ".btn-actualizar", function () {
                    var id = $(this).data("id");
                    //var numero_cuenta = $(this).data("numero_cuenta");
                    //var nombre = $(this).data("tipo_moneda");
                    // var saldo = $(this).data("saldo");
                    var id_contacto = $(this).data("id_contacto");
                    // var fecha_apertura = $(this).data("fecha_apertura");
                    var estado = $(this).data("estado");
                    // var fecha_cierre = $(this).data("fecha_cierre");
                    // // var id_banco = $(this).data("id_banco");
                    // var id_banco = $(this).data("id_banco");

                    // Prellenar campos del formulario con los valores de la sucursal
                    $("#actualizar-id").val(id);
                    //$("#actualizar-numero_cuenta").val(numero_cuenta);
                    //$("#actualizar-tipo_moneda").val(nombre);
                    // $("#actualizar-saldo").val(saldo);
                    $("#actualizar-id_contacto").val(id_contacto);
                    // $("#actualizar-fecha_apertura").val(fecha_apertura);
                    $("#actualizar-estado").val(estado);
                    // $("#actualizar-fecha_cierre").val(fecha_cierre);
                    // $("#actualizar-id_banco").val(id_banco);
                    // llenarSelectBancos(id_banco);
                    llenarSelectEstado(id, estado);
                    // Mostrar modal de actualización
                    if (estado == "A") {
                        $("#modal-actualizar").modal("show");
                    }
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus + " - " + errorThrown);
            },
        });
    }
});
