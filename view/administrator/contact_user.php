<?php
require_once("view/layouts/header.php");
if (isset($_SESSION['login']) && isset($_SESSION['id_tipo_usuario'])) {
    require_once("view/layouts/navadministrator.php");
?>
    <div class="">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="hit-the-floor">Contacto/Usuario</div>
            </div>

            <div class="col-md-8">
                <!-- FORMULARIO -->
                <form id="agregar-form">
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombre" />
                    </div>
                    <div class="row">
                        <div class="col-xs-12 col-md-6">
                            <label for="ape_pat" class="form-label">Apellido Paterno</label>
                            <div class="input-group mb-3">
                                <input type="text" id="ape_pat" name="ape_pat" class="form-control" placeholder="Apellido Paterno" autocomplete="off">
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-6">
                            <label for="ape_mat" class="form-label">Apellido Materno</label>
                            <div class="input-group mb-3">
                                <input type="text" id="ape_mat" name="ape_mat" class="form-control" autocomplete="off">
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="telefono" class="form-label">Teléfono</label>
                        <input type="text" class="form-control" id="telefono" name="telefono" pattern="[0-9]+(\.[0-9]+)?" autocomplete="off" />
                    </div>

                    <div class="mb-3">
                        <label for="direccion" class="form-label">Dirección</label>
                        <input type="text" class="form-control" id="direccion" name="direccion" autocomplete="off" />
                    </div>
                    <div class="mb-3">
                        <label for="ci" class="form-label">Carnet Identidad</label>
                        <input type="text" class="form-control" id="ci" name="ci" pattern="[0-9]+(\.[0-9]+)?" autocomplete="off" />
                    </div>
                    <div class="mb-3">
                        <label for="nit" class="form-label">NIT</label>
                        <input type="text" class="form-control" id="nit" name="nit" pattern="[0-9]+(\.[0-9]+)?" autocomplete="off" />
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" name="email" autocomplete="off" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Género</label><br>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="genero" id="genero_masculino" value="M">
                            <label class="form-check-label" for="genero_masculino">Masculino</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="genero" id="genero_femenino" value="F">
                            <label class="form-check-label" for="genero_femenino">Femenino</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12 col-md-6">
                            <label for="login" class="form-label">Login</label>
                            <div class="input-group mb-3">
                                <input type="text" id="login" name="login" class="form-control" autocomplete="off">
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-6">
                            <label for="password" class="form-label">Password</label>
                            <div class="input-group mb-3">
                                <input type="text" id="password" name="password" class="form-control" autocomplete="off">
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-success">Agregar</button>
                </form>
            </div>
            <div class="col-md-8 mb-4"></div>
            <!-- MOSTRAR TABLA -->
            <div class="col-md-8">
                <table class="table-responsive w-100" id="data-table">
                    <!-- <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido Paterno</th>
                            <th>Apellido Materno</th>
                            <th>Login</th>
                            <th>Password</th>
                            <th>Teléfono</th>
                            <th>Dirección</th>
                            <th>CI</th>
                            <th>NIT</th>
                            <th>Email</th>
                            <th>Género</th>
                        </tr>
                    </thead> -->
                    <tbody></tbody>
                </table>
            </div>
            <div class="col-md-8"></div>
        </div>
    </div>
    <!-- MODAL -->

    <div class="modal fade" id="modal-actualizar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Banco</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="actualizar-form">
                        <div class="mb-3">
                            <label for="actualizar-numero_cuenta" class="form-label">Numero Cuenta</label>
                            <input type="text" class="form-control" id="actualizar-numero_cuenta" name="actualizar-numero_cuenta" />
                        </div>
                        <div class="mb-3">
                            <label for="actualizar-tipo_moneda" class="form-label">Numero Cuenta</label>
                            <input type="text" class="form-control" id="actualizar-tipo_moneda" name="actualizar-tipo_moneda" />
                        </div>
                        <div class="mb-3">
                            <label for="actualizar-saldo" class="form-label">Saldo</label>
                            <input type="number" class="form-control" id="actualizar-saldo" name="actualizar-saldo" pattern="[0-9]+([0-9]+)?" />
                        </div>
                        <div class="mb-3">
                            <label for="actualizar-id_contacto" class="form-label">Contacto</label>
                            <input type="number" class="form-control" id="actualizar-id_contacto" name="actualizar-id_contacto" pattern="[0-9]+([0-9]+)?" />
                        </div>
                        <div class="mb-3">
                            <label class="bg-white p-2 border border border-secondary rounded-2 w-100" style="color: #aaa" for="actualizar-fec_ape" id="actualizar-fec_ape"></label>
                            <input type="hidden" class="form-control" id="actualizar-fecha_apertura" name="actualizar-fecha_apertura" pattern="[0-9]+([0-9]+)?" />
                        </div>
                        <div class="mb-3">
                            <label for="actualizar-estado" class="form-label">Estado</label>
                            <input type="text" class="form-control" id="actualizar-estado" name="actualizar-estado" pattern="[0-9]+([0-9]+)?" />
                        </div>
                        <label class="bg-white p-2 border border border-secondary rounded-2 w-100" style="color: #aaa" for="actualizar-fec_cie" id="actualizar-fec_cie"></label>

                        <div class="mb-3">
                            <label for="actualizar-estado" class="form-label">Cierre</label>
                            <input type="hidden" class="form-control" id="actualizar-fecha_cierre" name="actualizar-fecha_cierre" pattern="[0-9]+([0-9]+)?" />
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

    <script src="view/ajax/contact_user.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
<?php
} else {
    require_once("view/layouts/pagerestricted.php");
}
require_once("view/layouts/footer.php");
?>