<?php
require_once("view/layouts/header.php");
if (isset($_SESSION['datos']) && isset($_SESSION['datos']['id_tipo_usuario'])) {
    require_once("view/layouts/navadministrator.php");
?>
    <div class="pagetitle">
        <h1>Deposito</h1>
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
                    <div class="mb-3">
                        <label for="monto" class="form-label">Monto</label>
                        <input type="number" class="form-control" id="monto" name="monto" pattern="[0-9]+(\.[0-9]+)?" required />
                    </div>
                    <div class="mb-3">
                        <label for="descripcion" class="form-label">Descripción</label>
                        <input type="text" class="form-control" id="descripcion" name="descripcion" autocomplete="off" required />
                    </div>


                    <div class="mb-3">
                        <label for="banco-select" class="form-label">Banco</label>
                        <select class="form-select form-select-lg mb-3" id="banco-select" name="banco-select" required></select>
                    </div>
                    <div class="mb-3">
                        <label for="cuenta_banco-select" class="form-label">Cuenta Banco</label>
                        <select class="form-select form-select-lg mb-3" id="cuenta_banco-select" name="tipo_activo_fijos-select" required></select>
                    </div>
                    <div class="mb-3">
                        <label for="concepto-select" class="form-label">Concepto Movimiento</label>
                        <select class="form-select form-select-lg mb-3" id="concepto-select" name="concepto-select" required></select>
                    </div>
                    <input type="hidden" id="id_usuario" name="id_usuario" value="<?php echo $_SESSION['datos']['id_usuario'] ?>">
                    <div class="mb-3 text-center">
                        <button type="submit" class="btn btn-success text-center">Depositar</button>

                    </div>
                </form>
            </div>
            <div class="col-md-8 mb-4"></div>
            <!-- TABLA DEPOSITOS -->
            <div class="col-md-12 table-responsive">
                <table id="data-table" class="table text-center">
                    <tbody></tbody>
                </table>
            </div>
            <div class="col-md-8"></div>
        </div>
        </body>

        <script src="view/ajax/deposit.js"></script>
        <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script> -->
    <?php
} else {
    require_once("view/layouts/pagerestricted.php");
}
require_once("view/layouts/footer.php");
    ?>