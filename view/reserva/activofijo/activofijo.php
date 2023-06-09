<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <link rel="stylesheet" href="activofijo.css" />
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
        <!-- Moment.js -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
    </head>

    <body class="">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="hit-the-floor">Activo Fijo</div>
                </div>

                <div class="col-md-8">
                    <!-- FORMULARIO -->
                    <form id="agregar-form">
                        <div class="mb-3">
                            <label for="nombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="nombre" name="nombre" />
                        </div>
                        <div class="mb-3">
                            <label for="fecha_adquisicion" class="form-label"
                                >Fecha Adquisicion</label
                            >
                            <input
                                type="date"
                                class="form-control"
                                id="fecha_adquisicion"
                                name="fecha_adquisicion"
                            />
                        </div>
                        <div class="mb-3">
                            <label for="costo_adquisicion" class="form-label"
                                >Costo Adquisicion</label
                            >
                            <input
                                type="number"
                                class="form-control"
                                id="costo_adquisicion"
                                name="costo_adquisicion"
                                pattern="[0-9]+(\.[0-9]+)?"
                            />
                        </div>

                        <div class="mb-3">
                            <label for="porcentaje_vida_util" class="form-label">% Vida Util</label>
                            <input
                                type="number"
                                class="form-control"
                                id="porcentaje_vida_util"
                                name="porcentaje_vida_util"
                                pattern="[0-9]+(\.[0-9]+)?"
                            />
                        </div>
                        <div class="mb-3">
                            <label for="codigo" class="form-label">Código</label>
                            <input type="text" class="form-control" id="codigo" name="codigo" />
                        </div>
                        <div class="mb-3">
                            <label for="sucursal-select" class="form-label">Sucursal</label>
                            <select
                                class="form-select form-select-lg mb-3"
                                id="sucursal-select"
                                name="sucursal-select"
                            ></select>
                        </div>
                        <div class="mb-3">
                            <label for="tipo_activo_fijos-select" class="form-label"
                                >Tipo Activo</label
                            >
                            <select
                                class="form-select form-select-lg mb-3"
                                id="tipo_activo_fijos-select"
                                name="tipo_activo_fijos-select"
                            ></select>
                        </div>
                        <button type="submit" class="btn btn-success">Agregar</button>
                    </form>
                </div>
                <div class="col-md-8 mb-4"></div>
                <!-- MOSTRAR TABLA -->
                <div class="col-md-8">
                    <table class="table-responsive w-100" id="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Fecha Adquisicion</th>
                                <th>Costo Adquisicion</th>
                                <th>% Vida Util</th>
                                <th>Fecha Baja</th>
                                <th>Código</th>
                                <th>Sucursal</th>
                                <th>Tipo Activo</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div class="col-md-8"></div>
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
                                <label for="actualizar-numero_cuenta" class="form-label"
                                    >Numero Cuenta</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="actualizar-numero_cuenta"
                                    name="actualizar-numero_cuenta"
                                />
                            </div>
                            <div class="mb-3">
                                <label for="actualizar-tipo_moneda" class="form-label"
                                    >Numero Cuenta</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="actualizar-tipo_moneda"
                                    name="actualizar-tipo_moneda"
                                />
                            </div>
                            <div class="mb-3">
                                <label for="actualizar-saldo" class="form-label">Saldo</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="actualizar-saldo"
                                    name="actualizar-saldo"
                                    pattern="[0-9]+([0-9]+)?"
                                />
                            </div>
                            <div class="mb-3">
                                <label for="actualizar-id_contacto" class="form-label"
                                    >Contacto</label
                                >
                                <input
                                    type="number"
                                    class="form-control"
                                    id="actualizar-id_contacto"
                                    name="actualizar-id_contacto"
                                    pattern="[0-9]+([0-9]+)?"
                                />
                            </div>
                            <div class="mb-3">
                                <label
                                    class="bg-white p-2 border border border-secondary rounded-2 w-100"
                                    style="color: #aaa"
                                    for="actualizar-fec_ape"
                                    id="actualizar-fec_ape"
                                ></label>

                                <input
                                    type="hidden"
                                    class="form-control"
                                    id="actualizar-fecha_apertura"
                                    name="actualizar-fecha_apertura"
                                    pattern="[0-9]+([0-9]+)?"
                                />
                            </div>
                            <div class="mb-3">
                                <label for="actualizar-estado" class="form-label">Estado</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="actualizar-estado"
                                    name="actualizar-estado"
                                    pattern="[0-9]+([0-9]+)?"
                                />
                            </div>
                            <label
                                class="bg-white p-2 border border border-secondary rounded-2 w-100"
                                style="color: #aaa"
                                for="actualizar-fec_cie"
                                id="actualizar-fec_cie"
                            ></label>

                            <div class="mb-3">
                                <label for="actualizar-estado" class="form-label">Cierre</label>
                                <input
                                    type="hidden"
                                    class="form-control"
                                    id="actualizar-fecha_cierre"
                                    name="actualizar-fecha_cierre"
                                    pattern="[0-9]+([0-9]+)?"
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

    <script src="activofijo.js"></script>
    <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
        crossorigin="anonymous"
    ></script>
</html>
