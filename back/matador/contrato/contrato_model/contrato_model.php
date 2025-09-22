<?php
// Clase Contrato.
class ContratoModel{
// Funcion para mostrar todos los contratos.
    public function contrato_getAll(){
        $aResponse = [];
        $sql = "CALL contrato_getAll()";
        $bd = new DataBase(); 

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = $bd->getMessageError();
            return $aResponse;
        } else{
            $aResponse["estado"]= "success";
            $aResponse["mensaje"] = "Se pudo obtener todos los contratos";
            $aResponse["datos"] = $bd->getQuery($sql);
            $bd->close();
            return $aResponse;
        }
    }
// Funcion para Insertar contrato.
    public function contrato_insert($xdatos){
        $aDatos= json_decode($xdatos, true);
        $aResponse = [];
        $bd = new DataBase();
        $sql= "CALL contrato_insert('". $aDatos["id_deportista"]. "' ,'". $aDatos["id_empleado"]. "' , '". $aDatos["descripcion"]."', '". $aDatos["fecha_inicio"]."' , '". $aDatos["fecha_fin"]."')";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"]= "ERROR";
            $aResponse["mensaje"]= $bd->getMessageError();
            return $aResponse;
        } else { 
            $aResponse["estado"] = "success";
            $aResponse["mensaje"] = "Se pudo insertar de manera exitosa el contrato";
            $aResponse["datos"] = $bd->execute($sql);
            $bd->close();
            return $aResponse; 
        }
    }

// Funcion para actualizar el contrato
    public function contrato_update($xdatos){
        $aDatos = json_decode($xdatos,true);
        $aResponse = [];
        $bd = new DataBase();

        $sql= "CALL contrato_update('". $aDatos["id_contrato"]. "' ,'". $aDatos["id_deportista"]. "' ,'". $aDatos["id_empleado"]. "' , '". $aDatos["descripcion"]."', '". $aDatos["fecha_inicio"]."' , '". $aDatos["fecha_fin"]."')";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"] ="ERROR";
            $aResponse["mensaje"] = $bd->getMessageError();
            return $aResponse;
        } else{
            $aResponse["estado"]= "success";
            $aResponse["mensaje"] = "Se pudo actualizar el contrato exitosamente";
            $aResponse["datos"] = $bd->execute($sql);
            $bd->close();
            return $aResponse;
        }
    }

//Funcion para eliminar el contrato
    public function contrato_delete($xdatos){
        $aDatos = json_decode($xdatos, true);
        $aResponse = [];
        $bd= new DataBase();

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"]= "ERROR";
            $aResponse["mensaje"]= $bd->getMessageError(); 
            return $aResponse;
        }
        
        $sql = "CALL contrato_delete(". $aDatos["id_contrato"]. ")";
        $bd->execute($sql);
        $filasAfectadas = $bd->getAffectedRows();
        $bd->close();

        if ($filasAfectadas > 0) {
            $aResponse["estado"] = "success";
            $aResponse["mensaje"] = "El contrato fue eliminado de manera exitosa";
        } else {
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = "No se encontro ningun contrato con ese ID";
        }

        return $aResponse;
    }

// Funcion para obtener contrato por ID.
    public function contrato_getByID($xdatos){
        $aDatos=json_decode($xdatos,true) ; 
        $aResponse=[];
        $bd = new DataBase();

        $sql = "CALL contrato_getByID(". $aDatos["id_contrato"]. ")";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = $bd->getMessageError(); 
            return $aResponse; 
        } 
        
        $resultado = $bd->getQuery($sql);
        $bd->close();

        if (empty($resultado)) {
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = "No se encontro ningun contrato con ese id";
        } else{
            $aResponse["estado"] = "success";
            $aResponse["mensaje"] = "Se pudo encontrar el contrato de manera exitosa";
            $aResponse["datos"] = $resultado;
            return $aResponse;
        }

        return $aResponse;
    }
}
?>