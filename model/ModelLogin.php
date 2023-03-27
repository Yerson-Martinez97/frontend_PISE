<?php
require_once('Conexion.php');


class ModelLogin
{
    private $conexion;
    public function __construct()
    {
        $this->conexion = Conexion::conectar();
    }
    //===========================================================================
    //======================VERIFICAR SI LA PERSONA EXISTENTE====================
    //===========================================================================
    public function verifyPersonal()
    {
        $ema = $this->getEmail();
        $stmt = $this->conexion->prepare("select idpersonal from personal where email = :email");
        $stmt->bindParam(':email', $ema);
        $stmt->execute();
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
        return ($resultado != false) ? $resultado['idpersonal'] : false;
    }
    //===========================================================================
    //======================OBTENER NOMBRE DE LA PERSONA=========================
    //===========================================================================
    public function obtName()
    {
        $ema = $this->getEmail();
        $stmt = $this->conexion->prepare("select name,lastname from personal where email = :email");
        $stmt->bindParam(':email', $ema);
        $stmt->execute();
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->setName($resultado['name']);
        $this->setLastname($resultado['lastname']);
    }

    //===========================================================================
    //======================INSERTAR PERSONA=====================================
    //===========================================================================
    public function insertPersonal()
    {
        $nom = $this->getName();
        $ape = $this->getLastname();
        $cor = $this->getEmail();
        $tel = $this->getPhone();
        $stmt = $this->conexion->prepare("insert into personal (nombre, apellido, correo, telefono) VALUES (:nombre, :apellido, :correo, :telefono)");
        $stmt->bindParam(':nombre', $nom);
        $stmt->bindParam(':apellido', $ape);
        $stmt->bindParam(':correo', $cor);
        $stmt->bindParam(':telefono', $tel);
        $stmt->execute();
        $idpersona = $this->conexion->lastInsertId();
        return $idpersona;
    }

}
