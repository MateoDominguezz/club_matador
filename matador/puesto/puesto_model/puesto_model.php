<?php
// Clase Puesto.
class PuestoModel{
// Funcion para mostrar todos los puestos.
    public function puesto_getAll(){
        $aResponse = [];
        $sql = "CALL puesto_getAll()";
        $bd = new DataBase(); 

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = $bd->getMessageError();
            return $aResponse;
        } else{
            $aResponse["estado"]= "success";
            $aResponse["mensaje"] = "Se pudo obtener todos los puestos";
            $aResponse["datos"] = $bd->getQuery($sql);
            $bd->close();
            return $aResponse;
        }
    }
// Funcion para Insertar Puesto.
    public function puesto_insert($xdatos){
        $aDatos= json_decode($xdatos, true);
        $aResponse = [];
        $bd = new DataBase();
        $sql= "CALL puesto_insert('". $aDatos["id_turno"]. "' ,'". $aDatos["descripcion"]. "' , '". $aDatos["remuneracion_puesto"]."')";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"]= "ERROR";
            $aResponse["mensaje"]= $bd->getMessageError();
            return $aResponse;
        } else { 
            $aResponse["estado"] = "success";
            $aResponse["mensaje"] = "Se pudo insertar de manera exitosa el puesto";
            $aResponse["datos"] = $bd->execute($sql);
            $bd->close();
            return $aResponse; 
        }
    }

// funcion para actualizar el puesto
    public function puesto_update($xdatos){
        $aDatos = json_decode($xdatos,true);
        $aResponse = [];
        $bd = new DataBase();

        $sql = "CALL puesto_update('". $aDatos["id_puesto"]. "' ,'". $aDatos["id_turno"]. "' ,'". $aDatos["descripcion"]. "' , '". $aDatos["remuneracion_puesto"]."')";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"] ="ERROR";
            $aResponse["mensaje"] = $bd->getMessageError();
            return $aResponse;
        } else{
            $aResponse["estado"]= "success";
            $aResponse["mensaje"] = "Se pudo actualizar el puesto exitosamente";
            $aResponse["datos"] = $bd->execute($sql);
            $bd->close();
            return $aResponse;
        }
    }

//Funcion para eliminar el puesto
    public function puesto_delete($xdatos){
        $aDatos = json_decode($xdatos, true);
        $aResponse = [];
        $bd= new DataBase();

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"]= "ERROR";
            $aResponse["mensaje"]= $bd->getMessageError(); 
            return $aResponse;
        }
        
        $sql = "CALL puesto_delete(". $aDatos["id_puesto"]. ")";
        $bd->execute($sql);
        $filasAfectadas = $bd->getAffectedRows();
        $bd->close();

        if ($filasAfectadas > 0) {
            $aResponse["estado"] = "success";
            $aResponse["mensaje"] = "El puesto fue eliminado de manera exitosa";
        } else {
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = "No se encontro ningun puesto con ese ID";
        }

        return $aResponse;
    }

// Funcion para obtener puesto por ID.
    public function puesto_getByID($xdatos){
        $aDatos=json_decode($xdatos,true) ; 
        $aResponse=[];
        $bd = new DataBase();

        $sql = "CALL puesto_getByID(". $aDatos["id_puesto"]. ")";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = $bd->getMessageError(); 
            return $aResponse; 
        } 
        
        $resultado = $bd->getQuery($sql);
        $bd->close();

        if (empty($resultado)) {
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = "No se encontro ningun puesto con ese id";
        } else{
            $aResponse["estado"] = "success";
            $aResponse["mensaje"] = "Se pudo encontrar el puesto de manera exitosa";
            $aResponse["datos"] = $resultado;
            return $aResponse;
        }

        return $aResponse;
    }
}
?>