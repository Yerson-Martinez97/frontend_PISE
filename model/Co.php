<?php
$host = "db.vhtsriezjncxpuzdccmh.supabase.co";
$port = "5432";
$dbname = "postgres";
$user = "postgres";
$password = "Llave12325.";
$_GET['usr'] = "Cajero";
$usr = $_GET['usr'];
// $pwd = $_GET['pwd'];

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Realiza una consulta SELECT
    $stmt = $pdo->prepare("SELECT * FROM tipo_usuario WHERE nombre = :usr");
    $stmt->bindParam(':usr', $usr);
    $stmt->execute();
    $resultados = $stmt->fetchAll();

    // Recupera los resultados de la consulta
    // while ($row = $stmt->fetch()) {
    //     echo $row['id'] . "\t" . $row['nombre'] . "\n";
    //     echo "ok";
    // }
    echo "<table><tr>";
    foreach ($resultados[0] as $atributo => $valor) {
        echo '<th>' . $atributo . '</th>';
    }
    echo '</tr>';

    foreach ($resultados as $fila) {
        echo '<tr>';
        foreach ($fila as $valor) {
            echo '<td>' . $valor . '</td>';
        }
        echo '</tr>';
    }
    echo '</table>';
} catch (PDOException $e) {
    // Manejo de excepciones
    echo "Error al conectar: " . $e->getMessage();
}
