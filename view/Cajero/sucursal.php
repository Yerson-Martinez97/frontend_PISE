<?php
require_once("view/layouts/header.php");
if (isset($_SESSION['login']) && isset($_SESSION['id_tipo_usuario'])) {
    require_once("view/layouts/navcachier.php");
?>

    <div class="">
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
    </div>
    </div>
    <script src="view/ajax/banco.js"></script>

<?php
} else {
    require_once("view/layouts/pagerestricted.php");
}
require_once("view/layouts/footer.php");
?>