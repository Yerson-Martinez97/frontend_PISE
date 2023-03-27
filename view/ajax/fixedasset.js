$(document).ready(function () {
    var identity = $(this).val();
    mostrarSucursal();
    mostrarTipoActivoFijo();
    //NOMBRE BANCO
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
    $("#sucursal-select").change(function () {
        identity = $(this).val();
        // Aquí puedes hacer lo que necesites con el valor seleccionado
        $("#data-table").DataTable().destroy();
        mostrarActivoFijo();
    });
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
    $("#agregar-form").on("submit", function (event) {
        event.preventDefault();
        // var id_banco = $("#sucursal-select").val();
        var nombre = $("#nombre").val();
        var fecha_adq = $("#fecha_adquisicion").val();
        //
        var fecha_adquisicion;
        if (fecha_adq != "") {
            fecha_adquisicion = moment(fecha_adq).format("DD/MM/YYYY");
        } else {
            fecha_adquisicion = "";
        }
        //
        var costo_adquisicion = $("#costo_adquisicion").val();
        var porcentaje_vida_util = $("#porcentaje_vida_util").val();
        var fecha_baja = "null";
        var codigo = $("#codigo").val();
        var id_sucursal = $("#sucursal-select").val();
        var id_tipo_activo_fijo = $("#tipo_activo_fijos-select").val();

        // Crear objeto con datos a enviar
        var dataToSend = {
            activo_fijo: {
                nombre: nombre,
                fecha_adquisicion: fecha_adquisicion,
                costo_adquisicion: costo_adquisicion,
                porcentaje_vida_util: porcentaje_vida_util,
                codigo: codigo,
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
                $("#nombre").val("");
                $("#fecha_adquisicion").val("");
                $("#costo_adquisicion").val();
                $("#porcentaje_vida_util").val();
                fecha_baja = "null";
                $("#codigo").val();
                $("#sucursal-select").val();
                $("#tipo_activo_fijos-select").val();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus + " - " + errorThrown);
            },
        });
    });

    function mostrarActivoFijo() {
        $.ajax({
            url: "http://localhost:3000/api/v1/sucursales/" + identity + "/activo_fijos",
            type: "GET",
            dataType: "json",
            success: function (data) {
                // Inicializar la tabla con DataTablesF
                $("#data-table").DataTable({
                    data: data,
                    columns: [
                        { title: "ID", data: "id" },
                        { title: "Nombre", data: "nombre" },
                        { title: "Fecha Adquisicion", data: "fecha_adquisicion" },
                        { title: "Costo Adquisicion", data: "costo_adquisicion" },
                        { title: "% Vida Util", data: "porcentaje_vida_util" },
                        { title: "Fecha Baja", data: "fecha_baja" },
                        { title: "Código", data: "codigo" },
                        { title: "Sucursal", data: "sucursal.nombre" },
                        { title: "Tipo Activo Fijo", data: "tipo_activo_fijo.nombre" },
                        {
                            title: "Accion",
                            data: null,
                            render: function (data, type, row) {
                                return (
                                    "<button class='border-0 btn-actualizar' data-id='" +
                                    row.id +
                                    "' data-nombre='" +
                                    row.nombre +
                                    "' data-fecha_adquisicion='" +
                                    row.fecha_adquisicion +
                                    "' data-costo_adquisicion='" +
                                    row.costo_adquisicion +
                                    "' data-porcentaje_vida_util='" +
                                    row.porcentaje_vida_util +
                                    "' data-fecha_baja='" +
                                    row.fecha_baja +
                                    "' data-codigo='" +
                                    row.codigo +
                                    "' data-id_sucursal='" +
                                    row.id_sucursal +
                                    "' data-id_tipo_activo_fijo='" +
                                    row.id_tipo_activo_fijo +
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
