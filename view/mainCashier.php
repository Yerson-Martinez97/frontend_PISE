<?php
require_once("layouts/header.php");
if (isset($_SESSION['login']) && isset($_SESSION['id_tipo_usuario'])) {
    require_once("layouts/navcachier.php");
?>

    

    </div>
    </div>
    </div>

<?php
} else {
    require_once("layouts/pagerestricted.php");
}
require_once("layouts/footer.php");
?>