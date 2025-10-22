<?php
// Clase de Deporte
class DeporteModel{
// Funcion para mostrar todos los deportes
    public function deporte_getAll(){
        $aResponse = [];
        $bd = new DataBase();

        $sql = "CALL deporte_getAll()";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"]="ERROR";
            $aResponse["mensaje"]= $bd->getMessageError();
            return $aResponse;
        } else{
            $aResponse["estado"]= "success";
            $aResponse["mensaje"]= "Se pudo obtener todos los deportes";
            $aResponse["datos"]= $bd->getQuery($sql);
            $bd->close();
            return $aResponse;
        }
    }

// Funcion para insertar empleado
    public function deporte_insert($xdatos){
        $aDatos= json_decode($xdatos, true);
        $aResponse = [];
        $bd= new DataBase();

        $sql="CALL deporte_insert('". $aDatos["descripcion"]. "')";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"]= "ERROR";
            $aResponse["mensaje"]= $bd->getMessageError();
            return $aResponse;
        }else{
            $aResponse["estado"]="succes";
            $aResponse["mensaje"]="Se pudo insertar correctamente el deporte";
            $aResponse["datos"]= $bd->execute($sql);
            $bd->close();
            return $aResponse;
        }
    }

// Funcion para encontrar a empleado por ID
    public function deporte_getByID($xdatos){
        $aDatos = json_decode($xdatos,true);
        $aResponse = [];
        $bd= new DataBase();

        $sql = "CALL deporte_getByID(".$aDatos["id_deporte"].")";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"]= "ERROR"; 
            $aResponse["mensaje"]= $bd->getMessageError(); 
            return $aResponse;
        }

        $resultado = $bd->getQuery($sql);
        $bd->close();

        if (empty($resultado)) {
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = "No se encontro ningun deporte con ese id";
        } else{
            $aResponse["estado"] = "success";
            $aResponse["mensaje"] = "Se pudo encontrar el deporte de manera exitosa";
            $aResponse["datos"] = $resultado;
            return $aResponse;
        }

        return $aResponse;
    }

// Funcion para actualizar deporte
    public function deporte_update($xdatos){
        $aDatos = json_decode($xdatos,true);
        $aResponse = [];
        $bd = new DataBase();

        $sql = "CALL deporte_update('". $aDatos["id_deporte"]. "' , '". $aDatos["descripcion"]. "')";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"]="ERROR";
            $aResponse["mensaje"]= $bd->getMessageError();
            return $aResponse;
        }else{
            $aResponse["estado"]="success";
            $aResponse["mensaje"]="Se pudo actualizar el deporte de manera exitosa";
            $aResponse["datos"]= $bd->execute($sql);
            $bd->close();
            return $aResponse;
        }
    }

// Funcion para eliminar empleado
    public function deporte_delete($xdatos){
        $aDatos= json_decode($xdatos, true);
        $aResponse= [];
        $bd= new DataBase();

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"]= "ERROR";
            $aResponse["mensaje"]= $bd->getMessageError();
        }

        $sql = "CALL deporte_delete(".$aDatos["id_deporte"].")";
        $bd->execute($sql);
        $filasAfectadas = $bd->getAffectedRows();
        $bd->close();

        if ($filasAfectadas > 0) {
            $aResponse["estado"] = "success";
            $aResponse["mensaje"] = "El deporte fue eliminado de manera exitosa";
            return $aResponse;
        } else {
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = "No se encontro ningun deporte con ese ID";
            return $aResponse;
        }

        return $aResponse;
    }
}