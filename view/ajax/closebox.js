$(document).ready(function () {
    //------------------------------------------------------
    //-----------------CERRAR CAJA------------------------
    //------------------------------------------------------
    $("#agregar-form").on("submit", function (event) {
        event.preventDefault();
        var monto = $("#monto").val();
        var descripcion = $("#descripcion").val();
        var id_usuario = $("#id_usuario").val();
        var id_caja = $("#id_caja").val();
        alert(monto + " " + descripcion + " " + id_usuario + " " + id_caja);
        var dataToSend = {
            cierre_caja: {
                monto_efectivo: monto,
                observaciones: descripcion,
                id_usuario: id_usuario,
            },
        };
        var jsonData = JSON.stringify(dataToSend); // Convertir objeto a JSON
        $.ajax({
            url: "http://localhost:3000/api/v1/cajas/" + id_caja + "/cierre",
            type: "POST",
            contentType: "application/json",
            data: jsonData,
            success: function (response) {
                alert("Caja Cerrada");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus + " - " + errorThrown);
            },
        });
    });
});
