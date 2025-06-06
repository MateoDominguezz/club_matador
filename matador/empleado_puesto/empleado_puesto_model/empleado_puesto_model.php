<?php
class EmpleadoPuestoModel{
    public function empleado_puesto_getAll(){
        $aResponse = [];
        $sql = "CALL empleado_puesto_getAll()";
        $bd = new DataBase(); 

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = $bd->getMessageError();
            return $aResponse;
        } else{
            $aResponse["estado"]= "success";
            $aResponse["mensaje"] = "Se pudo obtener todos los empleados con sus puestos";
            $aResponse["datos"] = $bd->getQuery($sql);
            $bd->close();
            return $aResponse;
        }
    }

    public function empleado_puesto_insert($xdatos){
        $aDatos= json_decode($xdatos, true);
        $aResponse = [];
        $bd = new DataBase();
        $sql= "CALL empleado_puesto_insert(". $aDatos["id_empleado"]. " , ". $aDatos["id_puesto"]. ", '". $aDatos["fecha_inicio"]. "')";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"]= "ERROR";
            $aResponse["mensaje"]= $bd->getMessageError();
            return $aResponse;
        } else { 
            $aResponse["estado"] = "success";
            $aResponse["mensaje"] = "Se pudo insertar de manera exitosa el empleado con el puesto y su inicio";
            $aResponse["datos"] = $bd->execute($sql);
            $bd->close();
            return $aResponse; 
        }
    }

    public function empleado_puesto_update($xdatos){
        $aDatos = json_decode($xdatos,true);
        $aResponse = [];
        $bd = new DataBase();

        $sql = "CALL empleado_puesto_update(". $aDatos["id_empleado"]. " , ". $aDatos["id_puesto"]. ", '". $aDatos["fecha_inicio"]. "')";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"] ="ERROR";
            $aResponse["mensaje"] = $bd->getMessageError();
            return $aResponse;
        } else{
            $aResponse["estado"]= "success";
            $aResponse["mensaje"] = "Se pudo actualizar el empleado con el puesto y su inicio exitosamente";
            $aResponse["datos"] = $bd->execute($sql);
            $bd->close();
            return $aResponse;
        }
    }

    public function empleado_puesto_delete($xdatos){
        $aDatos = json_decode($xdatos, true);
        $aResponse = [];
        $bd= new DataBase();

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"]= "ERROR";
            $aResponse["mensaje"]= $bd->getMessageError(); 
            return $aResponse;
        }
        
        $sql = "CALL empleado_puesto_delete(". $aDatos["id_empleado"]. ",". $aDatos["id_puesto"] .")";
        $bd->execute($sql);
        $filasAfectadas = $bd->getAffectedRows();
        $bd->close();

        if ($filasAfectadas > 0) {
            $aResponse["estado"] = "success";
            $aResponse["mensaje"] = "El empleado con el puesto y su inicio fue eliminado de manera exitosa";
        } else {
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = "No se encontro ningun empleado con un puesto con ese ID";
        }

        return $aResponse;
    }

    public function empleado_puesto_getByID($xdatos){
        $aDatos=json_decode($xdatos,true) ; 
        $aResponse=[];
        $bd = new DataBase();

        $sql = "CALL empleado_puesto_getByID(". $aDatos["id_empleado"]. ",". $aDatos["id_puesto"]. " )";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = $bd->getMessageError(); 
            return $aResponse; 
        } 
        
        $resultado = $bd->getQuery($sql);
        $bd->close();

        if (empty($resultado)) {
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = "No se encontro ningun empleado con ese puesto, con ese ID";
        } else{
            $aResponse["estado"] = "success";
            $aResponse["mensaje"] = "Se pudo encontrar el empleado con ese puesto de manera exitosa";
            $aResponse["datos"] = $resultado;
            return $aResponse;
        }

        return $aResponse;
    }
}
?>