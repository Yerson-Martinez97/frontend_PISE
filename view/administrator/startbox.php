<?php
require_once("view/layouts/header.php");
if (isset($_SESSION['datos']) && isset($_SESSION['datos']['id_tipo_usuario'])) {
    require_once("view/layouts/navadministrator.php");

?>
    <div class="pagetitle">
        <h1>Restaurar Caja</h1>
        <nav>
            <ol class="breadcrumb">
            </ol>
        </nav>
    </div><!-- End Page Title -->

    <section class="section">
        <div class="row justify-content-center">

            <form id="actualizar-form_cxc">
                <input type="hidden" id="id_usuario" name="id_usuario" value="<?php echo $_SESSION['datos']['id_usuario']; ?>">
            </form>

            <script src="view/ajax/startbox.js"></script>
        </div>
    <?php

} else {
    require_once("view/layouts/pagerestricted.php");
}
require_once("view/layouts/footer.php");
    ?>