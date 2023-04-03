<?php
require_once("view/layouts/header.php");
if (isset($_SESSION['datos']) && isset($_SESSION['datos']['id_tipo_usuario'])) {
    require_once("view/layouts/navadministrator.php");
?>
    <div class="pagetitle">
        <h1>Cierre de Caja</h1>
        <nav>
            <ol class="breadcrumb">
                <!-- <li class="breadcrumb-item"><a href="index.php?page=a_bank">Inicio</a></li> -->
                <!-- <li class="breadcrumb-item">Forms</li>
                <li class="breadcrumb-item active">Elements</li> -->
            </ol>
        </nav>
    </div><!-- End Page Title -->

    <div class="row justify-content-center">
        <div class="col-md-8">
            <form id="agregar-form">
                <div class="mb-3">
                    <label for="monto" class="form-label">Efectivo</label>
                    <input type="number" class="form-control" id="monto" name="monto" pattern="[0-9]+([0-9]+)?" required autocomplete="off" min="1" />
                </div>
                <div class="mb-3">
                    <label for="descripcion" class="form-label">Observaciones</label>
                    <textarea name="descripcion" id="descripcion" class="form-control" id="" cols="30" rows="10"></textarea>
                </div>
                <input type="hidden" id="id_usuario" name="id_usuario" value="<?php echo $_SESSION['datos']['id_usuario']; ?>">
                <input type="hidden" id="id_caja" name="id_caja" value="<?php echo $_SESSION['id_caja'] ?>">
                <div class="mb-3 text-center">
                    <button type="submit" class="btn btn-primary">Crear Caja</button>
                </div>
            </form>

        </div>
    </div>
    <script src="view/ajax/closebox.js"></script>

<?php
} else {
    require_once("view/layouts/pagerestricted.php");
}
require_once("view/layouts/footer.php");
?>