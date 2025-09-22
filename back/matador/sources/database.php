<?php
// Clase de la base de datos, esta se utiliza para todas las clases/tablas
class DataBase{
    private $bd;
    private $conexion;
    private $errorMessage;

// Funcion para recibir el error
    public function getMessageError(){
        return $this->errorMessage;
    }

// Funcion para ver el estado de la conexion de la base de datos
    public function getEstadoConexion(){
        return $this->conexion;
    }

// Funcion para ver las filas afectadas
    public function getAffectedRows() {
        return $this->bd->affected_rows;
    }

// Metodo constructor de la base de datos
    function __construct(){
        $this->bd = new mysqli(HOST,USER,PASSWORD,BASE);
        if($this->bd->connect_errno){
            $this->errorMessage= "El error es: ".$this->bd->connect_error ."Codigo del error: ". $this->bd->connect_errno;
            $this->conexion = False;
        }else{
            $this->conexion = True;
            $this->bd->set_charset("utf8");
        }   
        
    }

// Funcion para ejecutar consultas: SELECT
    public function getQuery($xsql){
        $this->bd->real_query($xsql);
        $resultado = $this->bd->use_result();
        return $resultado->fetch_all(MYSQLI_ASSOC);
    }

// Funcion para ejecutar consultas: UPDATE, INSERT, DELETE
    public function execute($xsql){
        if(!$this->bd->query($xsql)){
            return False;
        } else {
            return True;
        }
    }

// Funcion para cerrar la Base de Datos
    public function close(){ 
        $this->bd->close();
    }   
}
?>