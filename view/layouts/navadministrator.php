<!-- Page content-->
<!--<div class="container-fluid">-->
<!-- ======= Header ======= -->
<header id="header" class="header fixed-top d-flex align-items-center">

    <div class="d-flex align-items-center justify-content-between">
        <a href="index.html" class="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="">
            <span class="d-none d-lg-block">PISE</span>
        </a>
        <i class="bi bi-list toggle-sidebar-btn"></i>
    </div><!-- End Logo -->



    <nav class="header-nav ms-auto">
        <ul class="d-flex align-items-center">

            <li class="nav-item d-block d-lg-none">
                <a class="nav-link nav-icon search-bar-toggle " href="#">
                    <i class="bi bi-search"></i>
                </a>
            </li><!-- End Search Icon-->


            <li class="nav-item dropdown pe-3">

                <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                    <!-- <img src="view/layouts/assets/login.jpg" alt="Profile" class="rounded-circle"> -->
                    <i class="fa-regular fa-user"></i>
                    <span class="d-none d-md-block dropdown-toggle ps-2"><?php echo $_SESSION['datos']['nombre'] ?></span>
                </a><!-- End Profile Iamge Icon -->

                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    <li class="dropdown-header">
                        <h6><?php echo $_SESSION['datos']['nombre'] ?></h6>
                        <span><?php echo $_SESSION['datos']['tipo_usuario'] ?></span>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>

                    <li>
                        <a class="dropdown-item d-flex align-items-center" href="index.php?page=logout">
                            <i class="bi bi-box-arrow-right"></i>
                            <span>Cerrar Sesión</span>
                        </a>
                    </li>

                </ul><!-- End Profile Dropdown Items -->
            </li><!-- End Profile Nav -->

        </ul>
    </nav><!-- End Icons Navigation -->

</header><!-- End Header -->

<!-- ======= Sidebar ======= -->
<aside id="sidebar" class="sidebar">

    <ul class="sidebar-nav" id="sidebar-nav">

        <li class="nav-item">
            <a class="nav-link collapsed" href="index.php?page=a_bank">
                <i class="bi bi-grid"></i>
                <span>Inicio</span>
            </a>
        </li><!-- End Dashboard Nav -->
        <li class="nav-heading">Bancos</li>
        <li class="nav-item">
            <a class="nav-link collapsed" href="index.php?page=a_bank">
                <!-- <i class="bi bi-person"></i> -->
                <i class="bi"></i>
                <span>Registro Banco</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link collapsed" href="index.php?page=a_accountbank">
                <!-- <i class="bi bi-person"></i> -->
                <i class="bi"></i>
                <span>Cuentas de Banco</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                <i class="bi bi-menu-button-wide"></i><span>Movimiento Bancos</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">

                <li>
                    <a href="#">
                        <i class="bi"></i><span>Ingresos</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="bi"></i><span>Egresos</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="bi"></i><span>Movimientos</span>
                    </a>
                </li>
            </ul>
        </li><!-- End Components Nav -->

        <li class="nav-heading">Activos Fijos</li>
        <li class="nav-item">
            <a class="nav-link collapsed" href="index.php?page=a_fixedasset">
                <!-- <i class="bi bi-person"></i> -->
                <i class="bi"></i>
                <span>Activo Fijo</span>
            </a>
        </li>

        <li class="nav-heading">Sucursales</li>
        <li class="nav-item">
            <a class="nav-link collapsed" href="index.php?page=a_branchoffice">
                <!-- <i class="bi bi-person"></i> -->
                <i class="bi"></i>
                <span>Sucursales</span>
            </a>
        </li>
        <li class="nav-heading"></li>

        <li class="nav-item">
            <a class="nav-link collapsed" href="#">
                <i class="bi bi-person"></i>
                <span>Perfil</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link collapsed" href="index.php?page=logout">
                <i class="bi bi-box-arrow-in-right"></i>
                <span>Cerrar Sesión</span>
            </a>
        </li><!-- End Login Page Nav -->

    </ul>

</aside><!-- End Sidebar-->

<main id="main" class="main">