<?php
require_once("view/layouts/header.php");
if (isset($_SESSION['datos']) && isset($_SESSION['datos']['id_tipo_usuario'])) {
    if (isset($_SESSION['id_caja'])) {
        require_once("view/layouts/navadministrator.php");

?>
        <div class="pagetitle">
            <h1>Ingreso</h1>
            <nav>
                <ol class="breadcrumb">
                    <!-- <li class="breadcrumb-item"><a href="index.php?page=a_bank">Inicio</a></li> -->
                    <!-- <li class="breadcrumb-item">Forms</li>
                <li class="breadcrumb-item active">Elements</li> -->
                </ol>
            </nav>
        </div><!-- End Page Title -->

        <section class="section">
            <div class="row justify-content-center">

                <div class="col-md-8">
                    <!-- FORMULARIO -->
                    <form id="agregar-form">
                        <label for="">Caja nro. <?php echo $_SESSION['id_caja'] ?></label>
                        <input type="hidden" id="id_caja" name="id_caja" value="<?php echo $_SESSION['id_caja'] ?>">
                        <div class="mb-3">
                            <label for="cliente-select" class="form-label">Cliente</label>
                            <select class="form-select form-select-lg mb-3" id="cliente-select" name="cliente-select" required></select>
                        </div>

                        <div class="card">
                            <div class="card-header">
                                <h3>Información del cliente</h3>
                            </div>
                            <div class="card-body">
                                <p><strong>Nombre:</strong> <span id="cliente-nombre"></span></p>
                                <p><strong>Apellidos:</strong> <span id="cliente-apellidos"></span></p>
                                <p><strong>Crédito Limite:</strong> <span id="cliente-credito_limite"></span></p>
                            </div>
                        </div>
                        <button type="submit" id="btn-cuentas-cobrar" class="btn btn-primary text-center">Ver Cuentas por cobrar</button>
                        <button type="submit" id="btn-ver-cuotas" class="btn btn-primary text-center">Ver Cuotas</button>
                        <button type="submit" id="btn-otros" class="btn btn-primary text-center">Otro</button>
                        <input type="hidden" id="id_usuario" name="id_usuario" value="<?php echo $_SESSION['datos']['id_usuario'] ?>">
                        <div class="mb-3 text-center">

                        </div>
                    </form>
                </div>
                <div class="col-md-8 mb-4"></div>
                <!-- TABLA CXC y  -->
                <div class="col-md-10 col-sm-12 table-responsive">
                    <table id="data-table" class="table text-center">
                        <tbody></tbody>
                    </table>
                </div>
                <div class="col-md-8"></div>
            </div>
            <!-- MODAL CXC -->
            <div class="modal fade" id="modal-actualizar_cxc" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Ingresar Monto</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="actualizar-form_cxc">

                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">Monto</span>
                                    </div>
                                    <input type="number" class="form-control" id="actualizar-monto_pagar" name="actualizar-monto_pagar" pattern="[0-9]+([0-9]+)?" />
                                </div>


                                <div class="mb-3">
                                    <label for="actualizar-descripcion" class="form-label">Descripción</label>
                                    <textarea name="actualizar-descripcion" id="actualizar-descripcion" class="form-control" id="" cols="30" rows="10"></textarea>
                                </div>
                                <input type="hidden" id="actualizar-id" name="actualizar-id" />
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Cancelar
                            </button>
                            <button type="submit" form="actualizar-form_cxc" class="btn btn-primary">
                                Guardar cambios
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- MODAL CUOTA -->
            <div class="modal fade" id="modal-actualizar_cuota" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Ingresar Pago de Cuota</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="actualizar-form_cuota">

                                <div class="mb-3">
                                    <label for="actualizar-descripcion_cuota" class="form-label">Descripción</label>
                                    <textarea name="actualizar-descripcion_cuota" id="actualizar-descripcion_cuota" class="form-control" id="" cols="30" rows="10"></textarea>
                                </div>
                                <input type="hidden" id="actualizar-id_cuota" name="actualizar-id_cuota" />
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Cancelar
                            </button>
                            <button type="submit" form="actualizar-form_cuota" class="btn btn-primary">
                                Guardar cambios
                            </button>
                        </div>
                    </div>
                </div>
            </div>



            <!-- MODAL OTRO -->
            <div class="modal fade" id="modal-actualizar_otro" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Ingresar Monto</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="actualizar-form_otro">

                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">Monto</span>
                                    </div>
                                    <input type="number" class="form-control" id="actualizar-monto_otro" name="actualizar-monto_otro" pattern="[0-9]+([0-9]+)?" />
                                </div>

                                <div class="mb-3">
                                    <label for="actualizar-descripcion_otro" class="form-label">Descripción</label>
                                    <textarea name="actualizar-descripcion_otro" id="actualizar-descripcion_otro" class="form-control" id="" cols="30" rows="10"></textarea>
                                </div>
                                <input type="hidden" id="actualizar-id_otro" name="actualizar-id_otro" />
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Cancelar
                            </button>
                            <button type="submit" form="actualizar-form_otro" class="btn btn-primary">
                                Guardar cambios
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <script src="view/ajax/incoming.js"></script>
            <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script> -->
    <?php
    } else {
        header("Location: " . urlsite . 'index.php?page=openbox');
    }
} else {
    require_once("view/layouts/pagerestricted.php");
}
require_once("view/layouts/footer.php");
    ?>