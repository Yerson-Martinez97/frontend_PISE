<?php
session_start();

unset($_SESSION['id_caja']);
echo "Variable guardada en sesión";
