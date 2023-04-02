<?php
require_once("view/layouts/header.php");
if (isset($_SESSION['datos']) && isset($_SESSION['datos']['id_tipo_usuario'])) {
    require_once("view/layouts/navadministrator.php");
?>
    <div class="pagetitle">
        <h1>Registro Banco</h1>
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
            <div class="col-md-4">
                <form id="agregar-form">
                    <div class="">
                        <label for="nombre" class="form-label">Nombre</label>
                    </div>
                    <div class="mb-3 text-center">
                        <input type="text" class="form-control in mb-3" id="nombre" name="nombre" autocomplete="off" />
                        <button type="submit" class="btn btn-success text-light">Agregar</button>

                    </div>
                </form>
            </div>
            <div class="col-md-12 mb-4"></div>
            <div class="col-md-8 col-lg-8">
                <table class="table-responsive w-100" id="data-table">
                    <tbody></tbody>
                </table>
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
                                <label for="actualizar-nombre" class="form-label">Nombre</label>
                                <input type="text" class="form-control" id="actualizar-nombre" name="nombre" />
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

        <script src="view/ajax/bank.js"></script>
    <?php
} else {
    require_once("view/layouts/pagerestricted.php");
}
require_once("view/layouts/footer.php");
    ?>