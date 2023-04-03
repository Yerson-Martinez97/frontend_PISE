$(document).ready(function () {
    $.ajax({
        url: "http://localhost:3000/api/v1/cajas/",
        method: "GET",
        success: function (response) {
            var id_usuario = $("#id_usuario").val();
            $.each(response, function (index, item) {
                if (id_usuario == item.id_usuario) {
                    console.log("Se encontró una coincidencia");
                    $.ajax({
                        url: "http://localhost/pise/model/sessionopen.php",
                        type: "POST",
                        data: {
                            id_caja: item.id,
                        },
                        success: function (response) {
                            alert(response);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log(textStatus, errorThrown);
                        },
                    });
                } else {
                    console.log("NO se encontró");
                }
            });
        },
    });
});
