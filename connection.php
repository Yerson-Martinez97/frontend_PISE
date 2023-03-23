<?php

$host = "db.vhtsriezjncxpuzdccmh.supabase.co";
$port = "5432";
$dbname = "postgres";
$user = "postgres";
$password = "Llave12325.";

// $host = "3.236.166.239";
// $port = "5432";
// $dbname = "proyecto";
// $user = "administrador";
// $password = "administrador";

$conexion = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
if (!$dbname) {
    die("Error de conexión: " . pg_last_error());
}


$query = "SELECT * FROM tipo_usuario";
$result = pg_query($conexion, $query);
if (!$result) {
    die("Error en la consulta: " . pg_last_error());
}


?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    echo "<table>";
    echo "<tr><th>ID</th><th>Nombre</th></tr>";
    echo "<table>";
    while ($fila = pg_fetch_assoc($result)) {
        echo "<tr><td>" . $fila["id"] . "</td><td>" . $fila["nombre"] . "</td></tr>";
    }
    ?>
</body>

</html>