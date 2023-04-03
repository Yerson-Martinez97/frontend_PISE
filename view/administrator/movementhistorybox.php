<?php
require_once("view/layouts/header.php");
if (isset($_SESSION['datos']) && isset($_SESSION['datos']['id_tipo_usuario'])) {
    require_once("view/layouts/navadministrator.php");
?>
    <div class="pagetitle">
        <h1>Historial de Caja Movimiento</h1>
        <nav>
            <ol class="breadcrumb">
                <!-- <li class="breadcrumb-item"><a href="index.php?page=a_bank">Inicio</a></li> -->
                <!-- <li class="breadcrumb-item">Forms</li>
                <li class="breadcrumb-item active">Elements</li> -->
            </ol>
        </nav>
    </div><!-- End Page Title -->
    <label>Tipo de movimiento: <input type="search" class="form-control" id="tipomovimiento" data-column="1"></label>

    <section class="section">
        <div class="row justify-content-center">
            <div class="col-md-12 mb-4"></div>
            <div class="col-md-8 col-lg-8 table-responsive">
                <table class="w-100" id="data-table">
                    <tbody></tbody>
                </table>
            </div>
        </div>

        <script src="view/ajax/movementhistorybox.js"></script>
    <?php
} else {
    require_once("view/layouts/pagerestricted.php");
}
require_once("view/layouts/footer.php");
    ?>