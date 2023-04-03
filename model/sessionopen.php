<?php
session_start();

if (isset($_POST['id_caja'])) {
    $_SESSION['id_caja'] = $_POST['id_caja'];
    echo "Variable guardada en sesión";
}
