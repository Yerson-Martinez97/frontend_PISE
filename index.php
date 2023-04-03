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
        case 'contact_user':
            require "Controller/controller.php";
            Controller::contactUser();
            break;
        case 'deposit':
            require "Controller/controller.php";
            Controller::deposit();
            break;
        case 'withdrawal':
            require "Controller/controller.php";
            Controller::withdrawal();
            break;
        case 'movementhistory':
            require "Controller/controller.php";
            Controller::movementHistory();
            break;
        case 'openbox':
            require "Controller/controller.php";
            Controller::openBox();
            break;
        case 'startbox':
            require "Controller/controller.php";
            Controller::startBox();
            break;
        case 'incoming':
            require "Controller/controller.php";
            Controller::incoming();
            break;
        case 'outgoing':
            require "Controller/controller.php";
            Controller::outgoing();
            break;
        case 'movementhistorybox':
            require "Controller/controller.php";
            Controller::movementHistoryBox();
            break;
        case 'closebox':
            require "Controller/controller.php";
            Controller::closeBox();
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
