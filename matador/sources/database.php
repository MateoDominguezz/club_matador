<?php
// Clase de la base de datos
class DataBase{
    private $bd;
    private $conexion;
    private $errorMessage;

    public function getMessageError(){
        return $this->errorMessage;
    }

    public function getEstadoConexion(){
        return $this->conexion;
    }

    public function getAffectedRows() {
        return $this->bd->affected_rows;
    }

    function __construct(){
        $this->bd = new mysqli(HOST,USER,PASSWORD,BASE);
        if($this->bd->connect_errno){
            $this->errorMessage= "El error es: ".$this->bd->connect_errno;
            $this->conexion = False;
        }else{
            $this->conexion = True;
            $this->bd->set_charset("utf8");
        }   
        
    }

    public function getQuery($xsql){
        $this->bd->real_query($xsql);
        $resultado = $this->bd->use_result();
        return $resultado->fetch_all(MYSQLI_ASSOC);
    }

    public function execute($xsql){
        if(!$this->bd->query($xsql))
            return False;
        return True;
    }

    public function close(){ 
        $this->bd->close();
    }   
}
?>