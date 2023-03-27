<?php

class Conexion
{
    private static $conexion = null;

    private static function conectar()
    {
        $host = "db.vhtsriezjncxpuzdccmh.supabase.co";
        $port = "5432";
        $dbname = "postgres";
        $user = "postgres";
        $password = "Llave12325.";

        $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password";
        $opciones = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ];

        self::$conexion = new PDO($dsn, $user, $password, $opciones);
        return self::$conexion;
    }

    public static function getConexion()
    {
        if (self::$conexion == null) {
            self::conectar();
        }
        return self::$conexion;
    }
}
