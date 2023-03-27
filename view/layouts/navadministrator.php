<div class="d-flex" id="wrapper">
    <div class="bordelateral navizq" id="sidebar-wrapper">
        <div class="sidebar-heading text-light"><?php echo $_SESSION['login'] ?></div>
        <div class="list-group list-group-flush">
            <br>
            <a class="navizqboton p-3" href="index.php?page=a_bank">Banco</a>
            <a class="navizqboton p-3" href="index.php?page=a_accountbank">Cuenta Banco</a>
            <a class="navizqboton p-3" href="index.php?page=a_branchoffice">Sucursal</a>
            <a class="navizqboton p-3" href="index.php?page=a_fixedasset">Activo Fijo</a>
            <a class="navizqboton p-3" href="index.php?page=a_fixedasset">Contacto/Usuario</a>
        </div>
    </div>
    <!-- Page content wrapper-->
    <div id="page-content-wrapper">
        <!-- Top navigation-->
        <nav class="navbar navbar-expand-lg navsuprec">
            <div class="container-fluid">
                <button class="btn" id="sidebarToggle">
                    <i class="fa-solid fa-bars text-light"></i>
                </button>
                <form method="get" action="">
                    <input type="hidden" class="" style="display:none;" name="page" value="logout">
                    <div class=" text-center">
                        <input type="submit" class="btngeneral third" name="press" value="Cerrar Sesión"> <br>
                    </div>
                </form>
            </div>
        </nav>
        <!-- Page content-->
        <div class="container-fluid">