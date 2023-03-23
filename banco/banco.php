<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <link rel="stylesheet" href="banco.css" />
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
            crossorigin="anonymous"
        />
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
            integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
        />
        <!-- jQuery -->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

        <!-- Incluir los estilos CSS de DataTables -->
        <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.datatables.net/v/dt/dt-1.11.3/datatables.min.css"
        />

        <!-- Incluir la biblioteca DataTables -->
        <script
            type="text/javascript"
            src="https://cdn.datatables.net/v/dt/dt-1.11.3/datatables.min.js"
        ></script>

        <!-- Bootstrap JS -->
        <script
            type="text/javascript"
            src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/js/bootstrap.min.js"
        ></script>
    </head>

    <body class="">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="hit-the-floor">Banco</div>
                </div>
                <div class="col-md-8">
                    <form id="agregar-form">
                        <div class="mb-3">
                            <label for="nombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="nombre" name="nombre" />
                        </div>
                        <button type="submit" class="btn btn-success">Agregar</button>
                    </form>
                </div>
                <div class="col-md-8 mb-4"></div>
                <div class="col-md-8">
                    <table class="table-responsive w-100" id="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- MODAL -->

        <div
            class="modal fade"
            id="modal-actualizar"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Banco</h1>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form id="actualizar-form">
                            <div class="mb-3">
                                <label for="actualizar-nombre" class="form-label">Nombre</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="actualizar-nombre"
                                    name="nombre"
                                />
                            </div>
                            <input type="hidden" id="actualizar-id" name="id" />
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Cancelar
                        </button>
                        <button type="submit" form="actualizar-form" class="btn btn-primary">
                            Guardar cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </body>

    <script src="banco.js"></script>
    <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
        crossorigin="anonymous"
    ></script>
</html>
