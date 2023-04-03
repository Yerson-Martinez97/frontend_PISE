<?php
require_once("view/layouts/header.php");
if (isset($_SESSION['datos']) && isset($_SESSION['datos']['id_tipo_usuario'])) {
    require_once("view/layouts/navadministrator.php");
?>
    <div class="pagetitle">
        <h1>Crear Caja</h1>
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
                <form id="agregar-form">
                    <div class="mb-3">
                        <label for="sucursal-select" class="form-label">Sucursal</label>
                        <select class="form-select form-select-lg mb-3" id="sucursal-select" name="sucursal-select"></select>
                    </div>
                    <div class="mb-3">
                        <label for="saldo_inicial" class="form-label">Saldo Inicial</label>
                        <input type="number" class="form-control" id="saldo_inicial" name="numero_cuenta" pattern="[0-9]+([0-9]+)?" required autocomplete="off" min="1" />
                    </div>
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" name="nombre" id="nombre">
                    </div>
                    <div class="mb-3">
                        <label for="descripcion" class="form-label">Descripción</label>
                        <textarea name="descripcion" id="descripcion" class="form-control" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="usuario-select" class="form-label">Usuario</label>
                        <select class="form-select form-select-lg mb-3" id="usuario-select" name="usuario-select"></select>
                    </div>
                    <div class="mb-3 text-center">
                        <button type="submit" class="btn btn-primary">Crear Caja</button>
                    </div>
                </form>

            </div>
        </div>
        </div>


        <script src="view/ajax/openbox.js"></script>

    <?php
} else {
    require_once("view/layouts/pagerestricted.php");
}
require_once("view/layouts/footer.php");
    ?>