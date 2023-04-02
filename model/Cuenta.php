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
        $stmt = $this->conexion->prepare("SELECT 
        USU.id_tipo_usuario as id_tipo_usuario,
        CO.nombre as nombre,
        TU.nombre as tipo_usuario
        FROM usuario USU 
        inner join contacto CO ON USU.id = CO.id 
        inner join tipo_usuario TU ON TU.id = USU.id_tipo_usuario 
        where USU.login = :usr AND USU.password = :pwd");
        $stmt->bindParam(':usr', $usr);
        $stmt->bindParam(':pwd', $pwd);
        $stmt->execute();
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
        return ($resultado != false) ? $resultado : false;
    }
}
