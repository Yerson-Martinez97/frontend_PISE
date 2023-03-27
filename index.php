<?php
require_once("config.php");
date_default_timezone_set('America/La_Paz');

$page = "index.php";

if (isset($_GET['page'])) {
    $page = $_GET['page'];
    switch ($page) {
        case 'login':
            require "Controller/controller.php";
            Controller::formLogin();
            break;
        case 'veraco':
            require "Controller/controller.php";
            Controller::verifyAccount();
            break;
        case 'a_bank':
            require "Controller/controller.php";
            Controller::a_bank();
            break;
        case 'a_accountbank':
            require "Controller/controller.php";
            Controller::a_accountBank();
            break;
        case 'a_branchoffice':
            require "Controller/controller.php";
            Controller::a_branchOffice();
            break;
        case 'a_fixedasset':
            require "Controller/controller.php";
            Controller::a_fixedasset();
            break;
        case 'logout':
            require "Controller/controller.php";
            Controller::logout();
            break;
        default:
            require "Controller/controller.php";
            Controller::formLogin();
            break;
    }
} else {
    require "Controller/controller.php";
    Controller::formLogin();
}
