<?php
require_once("layouts/header.php");
?>
<title>Inicio Sesión</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/png" href="view/layouts/images/icons/favicon.ico" />
<link rel="stylesheet" type="text/css" href="view/layouts/vendor/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="view/layouts/fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="view/layouts/fonts/iconic/css/material-design-iconic-font.min.css">
<link rel="stylesheet" type="text/css" href="view/layouts/vendor/animate/animate.css">
<link rel="stylesheet" type="text/css" href="view/layouts/vendor/css-hamburgers/hamburgers.min.css">
<link rel="stylesheet" type="text/css" href="view/layouts/vendor/animsition/css/animsition.min.css">
<link rel="stylesheet" type="text/css" href="view/layouts/vendor/select2/select2.min.css">
<link rel="stylesheet" type="text/css" href="view/layouts/vendor/daterangepicker/daterangepicker.css">
<link rel="stylesheet" type="text/css" href="view/layouts/css/util.css">
<link rel="stylesheet" type="text/css" href="view/layouts/css/main.css">
</head>

<body>

    <div class="limiter">
        <div class="container-login100" style="background-image: url('view/layouts/images/bg-login02.jpg');">
            <div class="wrap-login100">
                <div class="text-center p-t-20">
                </div>
                <form class="login100-form validate-form" method="GET">

                    <span class="login100-form-title p-b-34 p-t-27">
                        Inicio de Sesión
                    </span>

                    <div class="wrap-input100 validate-input" data-validate="Enter username">
                        <input class="input100" type="text" name="usr" placeholder="Usuario">
                        <span class="focus-input100" data-placeholder="&#xf207;"></span>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate="Enter password">
                        <input class="input100" type="password" name="pwd" placeholder="Contraseña">
                        <span class="focus-input100" data-placeholder="&#xf191;"></span>
                    </div>
                    <div class="form-group mt-5 ">
                        <input type="hidden" name="page" value="veraco" class="form-control submit px-3">
                    </div>
                    <div class="container-login100-form-btn">
                        <button class="login100-form-btn">
                            Ingresar
                        </button>
                    </div>

                    <div class="text-center p-t-90">
                    </div>
                </form>
            </div>
        </div>
    </div>


    <div id="dropDownSelect1"></div>

    <!--===============================================================================================-->
    <script src="view/layouts/vendor/jquery/jquery-3.2.1.min.js"></script>
    <!--===============================================================================================-->
    <script src="view/layouts/vendor/animsition/js/animsition.min.js"></script>
    <!--===============================================================================================-->
    <script src="view/layouts/vendor/bootstrap/js/popper.js"></script>
    <script src="view/layouts/vendor/bootstrap/js/bootstrap.min.js"></script>
    <!--===============================================================================================-->
    <script src="view/layouts/vendor/select2/select2.min.js"></script>
    <!--===============================================================================================-->
    <script src="view/layouts/vendor/daterangepicker/moment.min.js"></script>
    <script src="view/layouts/vendor/daterangepicker/daterangepicker.js"></script>
    <!--===============================================================================================-->
    <script src="view/layouts/vendor/countdowntime/countdowntime.js"></script>
    <!--===============================================================================================-->
    <script src="view/layouts/js/main.js"></script>

</body>

</html>