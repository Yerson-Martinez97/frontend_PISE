$(document).ready(function () {
    var identity = $(this).val();
    mostrarSucursal();
    mostrarUsuario();
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
    //-----------------MOSTRAR USUARIOs---------------------
    //------------------------------------------------------
    function mostrarUsuario() {
        $.ajax({
            url: "http://localhost:3000/api/v1/usuarios",
            method: "GET",
            success: function (data) {
                var select = $("#usuario-select");
                data.sort(function (a, b) {
                    return a.id - b.id;
                });
                $.each(data, function (index, item) {
                    select.append($("<option>").val(item.id).text(item.login));
                });
                select.val(data[0].id).trigger("change");
            },
        });
    }
    //------------------------------------------------------
    //-----------------CREAR CAJA------------------------
    //------------------------------------------------------
    $("#agregar-form").on("submit", function (event) {
        event.preventDefault();
        var sucursal = $("#sucursal-select").val();
        var saldo_inicial = $("#saldo_inicial").val();
        var nombre = $("#nombre").val();
        var descripcion = $("#descripcion").val();
        var usuario = $("#usuario-select").val();
        alert(sucursal + " " + saldo_inicial + " " + nombre + " " + descripcion + " " + usuario);
        var dataToSend = {
            caja: {
                nombre: nombre,
                saldo_inicial: saldo_inicial,
                observaciones: descripcion,
                id_usuario: usuario,
            },
        };
        var jsonData = JSON.stringify(dataToSend); // Convertir objeto a JSON
        $.ajax({
            url: "http://localhost:3000/api/v1/sucursales/" + sucursal + "/cajas",
            type: "POST",
            contentType: "application/json",
            data: jsonData,
            success: function (response) {
                $.ajax({
                    url: "http://localhost/pise/model/sessionopen.php",
                    type: "POST",
                    data: {
                        id_caja: response.id,
                    },
                    success: function (response) {
                        console.log(response);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus, errorThrown);
                    },
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus + " - " + errorThrown);
            },
        });
    });
});
