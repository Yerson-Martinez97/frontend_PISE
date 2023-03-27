<?php
// Incluir el modelo
include_once 'model/Cuenta.php';


class Controller
{
    static function formLogin()
    {
        include_once 'view/login.php';
    }
    static function verifyAccount()
    {
        $cuenta = new Cuenta();
        $nombre = $cuenta->verifyCuenta();
        if ($nombre) {
            if ($nombre['id_tipo_usuario'] == 3) {
                echo "Cajero";
            } else if ($nombre['id_tipo_usuario'] == 4) {
                session_start();
                $_SESSION['login'] = $nombre['login'];
                $_SESSION['id_tipo_usuario'] = $nombre['id_tipo_usuario'];
                header("Location: " . urlsite . "index.php?page=a_bank");
            } else {
                echo "error";
            }
        } else {
            echo "cuenta no existe";
        }
    }

    static function a_bank()
    {
        include_once 'view/administrator/bank.php';
    }
    static function a_accountBank()
    {
        include_once 'view/administrator/bankaccount.php';
    }
    static function a_branchOffice()
    {
        include_once 'view/administrator/branchoffice.php';
    }
    static function a_fixedasset()
    {
        include_once 'view/administrator/fixedasset.php';
    }
    static function logout()
    {
        session_start();
        session_destroy();
        unset($_SESSION['login']);
        unset($_SESSION['id_tipo_usuario']);
        header("Location: " . urlsite . 'index.php?page=login');
    }
}
