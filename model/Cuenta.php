<?php
require_once 'Conexion.php';

class Cuenta
{
    private $conexion;
    public function __construct()
    {
        $conexion = Conexion::getConexion();
        $this->conexion = $conexion;
    }
    public function verifyCuenta()
    {
        $usr = $_GET['usr'];
        $pwd = $_GET['pwd'];
        $stmt = $this->conexion->prepare("SELECT * FROM Usuario where login = :usr AND password = :pwd");
        $stmt->bindParam(':usr', $usr);
        $stmt->bindParam(':pwd', $pwd);
        $stmt->execute();
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
        return ($resultado != false) ? $resultado : false;
    }
}
