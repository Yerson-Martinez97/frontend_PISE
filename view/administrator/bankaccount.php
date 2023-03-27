<?php
require_once("view/layouts/header.php");
if (isset($_SESSION['login']) && isset($_SESSION['id_tipo_usuario'])) {
    require_once("view/layouts/navadministrator.php");
?>
    <div class="">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="hit-the-floor">Cuenta Banco</div>
            </div>
            <div class="col-md-8">
                <form id="agregar-form">
                    <div class="mb-3">
                        <select class="form-select form-select-lg mb-3" id="banco-select" name="banco-select"></select>
                    </div>
                    <div class="mb-3">
                        <label for="numero_cuenta" class="form-label">Numero Cuenta</label>
                        <input type="text" class="form-control" id="numero_cuenta" name="numero_cuenta" required autocomplete="off" />
                    </div>

                    <div class="row">
                        <div class="col-xs-12 col-md-3">
                            <label for="saldo" class="form-label">Saldo</label>
                            <input type="number" class="form-control" id="saldo" name="saldo" pattern="[0-9]+([0-9]+)?" required autocomplete="off" min="1" />

                        </div>
                        <div class="col-xs-12 col-md-4">
                            <label for="tipo_moneda-select" class="form-label">Tipo Moneda</label>
                            <select class="form-select" id="tipo_moneda-select" name="tipo_moneda-select" required>
                                <option value="BOB">BOB</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                            </select>
                        </div>

                    </div>

                    <!-- <div class="mb-3">
                        <label for="tipo_moneda-select" class="form-label">Tipo Moneda</label>
                        <select class="form-select form-select-lg mb-3" id="tipo_moneda-select" name="tipo_moneda-select" required>
                            <option value="BOB">BOB</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="saldo" class="form-label">Saldo</label>
                        <input type="number" class="form-control" id="saldo" name="saldo" pattern="[0-9]+([0-9]+)?" required autocomplete="off" />
                    </div> -->
                    <div class="mb-3">
                        <label for="fecha_apertura" class="form-label">Fecha Apertura</label>
                        <input type="date" class="form-control" id="fecha_apertura" name="fecha_apertura" required />
                    </div>
                    <!-- <div class="mb-3">
                        <label for="contacto-select" class="form-label">Contacto</label>
                        <input type="text" class="form-control" id="contacto-select" name="contacto-select" required />
                    </div> -->
                    <div class="row">
                        <div class="col-xs-12 col-md-4">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Contacto: </span>
                                </div>
                                <input type="text" id="buscar-contacto" name="buscar-contacto" class="form-control" placeholder="Nombre o C.I">
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-3">
                            <div class="mb-3">
                                <select id="contacto-select" class="form-control"></select>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-success">Agregar</button>
                </form>

            </div>
            <div class="col-md-8 mb-4 mt-4"></div>
            <div class="col-md-8">
                <table class="table-responsive w-100"  id="data-table">
                    <thead>
                        <tr>
                            <th>Cuenta</th>
                            <th>Tipo Moneda</th>
                            <th>Saldo</th>
                            <th>Contacto</th>
                            <th>Fecha Apertura</th>
                            <th>Estado</th>
                            <th>Fecha Cierre</th>
                            <th>Banco</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div class="col-md-12 mb-5"></div>
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
                        <!-- <div class="mb-3">
                            <label for="actualizar-id_banco" class="form-label">Banco</label>
                            <select class="form-control" id="actualizar-id_banco" name="actualizar-id_banco"></select>
                        </div> -->
                        <!-- <div class="mb-3">
                            <label for="actualizar-numero_cuenta" class="form-label">Numero Cuenta</label>
                            <input type="text" class="form-control" id="actualizar-numero_cuenta" name="actualizar-numero_cuenta" autocomplete="off" />
                        </div> -->
                        <!-- <div class="mb-3">
                            <label for="actualizar-tipo_moneda" class="form-label">Tipo Moneda</label>
                            <input type="text" class="form-control" id="actualizar-tipo_moneda" name="actualizar-tipo_moneda" />
                        </div> -->
                        <!-- <div class="mb-3">
                            <label for="actualizar-saldo" class="form-label">Saldo</label>
                            <input type="number" class="form-control" id="actualizar-saldo" name="actualizar-saldo" pattern="[0-9]+([0-9]+)?" />
                        </div> -->
                        <!-- <div class="mb-3">
                            <label for="actualizar-id_contacto" class="form-label">Contacto</label>
                            <input type="number" class="form-control" id="actualizar-id_contacto" name="actualizar-id_contacto" pattern="[0-9]+([0-9]+)?" />
                        </div> -->
                        <div class="mb-3">
                            <input type="hidden" class="form-control" id="actualizar-fecha_apertura" name="actualizar-fecha_apertura" pattern="[0-9]+([0-9]+)?" />
                        </div>
                        <!-- <div class="mb-3">
                            <label for="actualizar-estado" class="form-label">Estado</label>
                            <input type="text" class="form-control" id="actualizar-estado" name="actualizar-estado" pattern="[0-9]+([0-9]+)?" />
                        </div> -->
                        <div class="mb-3">
                            <label for="actualizar-estado" class="form-label">Estado</label>
                            <select class="form-control" id="actualizar-estado" name="actualizar-estado"></select>
                        </div>
                        <!-- <div class="mb-3">
                            <label for="actualizar-estado" class="form-label">Cierre</label>
                            <input type="hidden" class="form-control" id="actualizar-fecha_cierre" name="actualizar-fecha_cierre" pattern="[0-9]+([0-9]+)?" />
                        </div> -->
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
    </div>
    </div>
    <script src="view/ajax/bankaccount.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>


<?php
} else {
    require_once("view/layouts/pagerestricted.php");
}
require_once("view/layouts/footer.php");
?>