<?php
// Clase Turno
class TurnoModel{
// Funcion para mostrar todos los turnos
    public function turno_getAll(){
        $aResponse = [];
        $sql = "CALL turno_getAll()";
        $bd = new DataBase(); 

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = $bd->getMessageError();
            return $aResponse;
        } else{
            $aResponse["estado"]= "success";
            $aResponse["mensaje"] = "Se pudo obtener todos los turnos";
            $aResponse["datos"] = $bd->getQuery($sql);
            $bd->close();
            return $aResponse;
        }
    }

// Funcion para insertar turno
    public function turno_insert($xdatos){
        $aDatos= json_decode($xdatos, true);
        $aResponse = [];
        $bd = new DataBase();
        $sql= "CALL turno_insert('". $aDatos["descripcion"]. "' , '". $aDatos["horario_inicio"]."', '". $aDatos["horario_fin"]. "')";
        if(!$bd->getEstadoConexion()){
            $aResponse["estado"]= "ERROR";
            $aResponse["mensaje"]= $bd->getMessageError();
            return $aResponse;
        } else { 
            $aResponse["estado"] = "success";
            $aResponse["mensaje"] = "Se pudo insertar de manera exitosa el turno";
            $aResponse["datos"] = $bd->execute($sql);
            $bd->close();
            return $aResponse; 
        }
    }

// Funcion para actualizar turno
    public function turno_update($xdatos){
        $aDatos = json_decode($xdatos,true);
        $aResponse = [];
        $bd = new DataBase();

        $sql = "CALL turno_update('". $aDatos["id_turno"]."' , '". $aDatos["descripcion"]. "' , '". $aDatos["horario_inicio"]."', '". $aDatos["horario_fin"]. "')";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"] ="ERROR";
            $aResponse["mensaje"] = $bd->getMessageError();
            return $aResponse;
        } else{
            $aResponse["estado"]= "success";
            $aResponse["mensaje"] = "Se pudo actualizar el turno exitosamente";
            $aResponse["datos"] = $bd->execute($sql);
            $bd->close();
            return $aResponse;
        }
    }

// Funcion para eliminar turno
    public function turno_delete($xdatos){
        $aDatos = json_decode($xdatos, true);
        $aResponse = [];
        $bd= new DataBase();

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"]= "ERROR";
            $aResponse["mensaje"]= $bd->getMessageError(); 
            return $aResponse;
        }
        
        $sql = "CALL turno_delete(". $aDatos["id_turno"]. ")";
        $bd->execute($sql);
        $filasAfectadas = $bd->getAffectedRows();
        $bd->close();

        if ($filasAfectadas > 0) {
            $aResponse["estado"] = "success";
            $aResponse["mensaje"] = "El turno fue eliminado de manera exitosa";
        } else {
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = "No se encontro ningun turno con ese ID";
        }

        return $aResponse;
    }

// Funcion para obtener turno por ID
    public function turno_getByID($xdatos){
        $aDatos=json_decode($xdatos,true) ; 
        $aResponse=[];
        $bd = new DataBase();

        $sql = "CALL turno_getByID(". $aDatos["id_turno"]. ")";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = $bd->getMessageError(); 
            return $aResponse; 
        } 
        
        $resultado = $bd->getQuery($sql);
        $bd->close();

        if (empty($resultado)) {
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = "No se encontro ningun turno con ese id";
        } else{
            $aResponse["estado"] = "success";
            $aResponse["mensaje"] = "Se pudo encontrar el turno de manera exitosa";
            $aResponse["datos"] = $resultado;
            return $aResponse;
        }

        return $aResponse;
    }
}
?>