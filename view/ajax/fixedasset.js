$(document).ready(function () {
    var identity = $(this).val();
    mostrarSucursal();
    mostrarTipoActivoFijo();
    mostrarActivoFijo();
    //------------------------------------------------------
    //-----------------MOSTRAR SUCURSAL---------------------
    //------------------------------------------------------
    function mostrarSucursal() {
        $.ajax({
            url: "http://localhost:3000/api/v1/sucursales/",
            method: "GET",
            success: function (data) {
                var select = $("#sucursal-select");
                data.sort(function (a, b) {
                    return a.id - b.id;
                });
                $.each(data, function (index, item) {
                    select.append(
                        $("<option>")
                            .val(item.id)
                            .text(item.nombre + " - " + item.direccion)
                    );
                });
                select.val(data[0].id).trigger("change");
            },
        });
    }
    //------------------------------------------------------
    //-----------------MOSTRAR TIPO ACTIVO FIJO-------------
    //------------------------------------------------------
    function mostrarTipoActivoFijo() {
        $.ajax({
            url: "http://localhost:3000/api/v1/tipo_activo_fijos",
            method: "GET",
            success: function (data) {
                var select = $("#tipo_activo_fijos-select");
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
    //-----------------AGREGAR ACTIVO-----------------------
    //------------------------------------------------------
    $("#agregar-form").on("submit", function (event) {
        event.preventDefault();
        // var id_banco = $("#sucursal-select").val();
        var nombre = $("#nombre").val();
        var fecha_adquisicion = $("#fecha_adquisicion").val();
        var costo_adquisicion = $("#costo_adquisicion").val();
        var porcentaje_vida_util = $("#porcentaje_vida_util").val();
        var codigo = $("#codigo").val();
        var id_sucursal = $("#sucursal-select").val();
        var id_tipo_activo_fijo = $("#tipo_activo_fijos-select").val();

        alert(
            nombre +
                " " +
                fecha_adquisicion +
                " " +
                costo_adquisicion +
                " " +
                porcentaje_vida_util +
                " " +
                codigo +
                " " +
                id_sucursal +
                " " +
                id_tipo_activo_fijo
        );

        // if (fecha_adq != "") {
        //     fecha_adquisicion = moment(fecha_adq).format("DD/MM/YYYY");
        // } else {
        //     fecha_adquisicion = "";
        // }
        //

        // // Crear objeto con datos a enviar
        var dataToSend = {
            activo_fijo: {
                nombre: nombre,
                fecha_adquisicion: fecha_adquisicion,
                costo_adquisicion: costo_adquisicion,
                porcentaje_vida_util: porcentaje_vida_util,
                codigo: codigo,
                id_sucursal: id_sucursal,
                id_tipo_activo_fijo: id_tipo_activo_fijo,
            },
        };
        // Convertir objeto a JSON
        var jsonData = JSON.stringify(dataToSend);

        // Enviar datos a través de AJAX
        $.ajax({
            url: "http://localhost:3000/api/v1/sucursales/" + id_sucursal + "/activo_fijos",
            type: "POST",
            contentType: "application/json",
            data: jsonData,
            success: function (response) {
                // Actualizar tabla después de agregar nueva sucursal
                $("#data-table").DataTable().destroy();
                mostrarActivoFijo();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus + " - " + errorThrown);
            },
        });
    });
    //------------------------------------------------------
    //-----------------MOSTRAR ACTIVO FIJO------------------
    //------------------------------------------------------
    function mostrarActivoFijo() {
        $.ajax({
            url: "http://localhost:3000/api/v1/activo_fijos/index_all",
            dataType: "json",
            success: function (data) {
                $("#data-table").DataTable({
                    responsive: true,
                    data: data,
                    columns: [
                        { title: "Nombre", data: "nombre", orderable: false, width: "10%" },
                        { title: "Fecha Adquisición", data: "fecha_adquisicion", width: "10%" },
                        { title: "Costo Adquisición", data: "costo_adquisicion", width: "10%" },
                        {
                            title: "% Vida Útil",
                            data: "porcentaje_vida_util",
                            width: "10%",
                        },
                        { title: "Fecha Baja", data: "fecha_baja", width: "10%" },
                        { title: "Código", data: "codigo", width: "10%" },
                        { title: "Sucursal", data: "sucursal.nombre", width: "10%" },
                        { title: "Tipo Activo", data: "tipo_activo_fijo.nombre" },
                        {
                            title: "Valor Depreciado",
                            render: function (data, type, row, meta) {
                                var depreciatedValue =
                                    parseFloat(row.costo_adquisicion) *
                                    (parseFloat(row.porcentaje_vida_util / 12) / 100);
                                var fecha_adquisicion = moment(row.fecha_adquisicion, "YYYY-MM-DD");
                                var now = moment();
                                var months = now.diff(fecha_adquisicion, "month");
                                // console.log("Diferencia en meses: ", months);
                                var depreciation =
                                    row.costo_adquisicion - depreciatedValue * months;
                                return parseFloat(depreciation).toFixed(2);
                            },
                            width: "10%",
                            orderable: false,
                        },

                        {
                            title: "",
                            orderable: false,
                            data: null,
                            render: function (data, type, row) {
                                if (row.fecha_baja != null) {
                                    return (
                                        "<button class='border-0 bg-transparent' data-id='" +
                                        row.id +
                                        "'><i class='fa-solid fa-ban fa-lg' style='color: #c3c6d1;'></i></button>"
                                    );
                                } else {
                                    return (
                                        "<button class='border-0 btn-actualizar bg-transparent' style='font-size:1.5rem;' " +
                                        "data-id='" +
                                        row.id +
                                        "'><i class='fa-regular fa-circle-down fa-lg' style='color: #A41D1A;'></i></button>"
                                    );
                                }
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
