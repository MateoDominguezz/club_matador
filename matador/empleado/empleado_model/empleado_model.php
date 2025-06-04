<?php
class EmpleadoModel{
// Funcion para mostrar todos los empleado
    public function empleado_getAll(){
        $aResponse = [];
        $bd = new DataBase();

        $sql = "CALL empleado_getAll()";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"]="ERROR";
            $aResponse["mensaje"]= $bd->getMessageError();
            return $aResponse;
        } else{
            $aResponse["estado"]= "success";
            $aResponse["mensaje"]= "Se pudo obtener todos los empleados";
            $aResponse["datos"]= $bd->getQuery($sql);
            $bd->close();
            return $aResponse;
        }
    }

// Funcion para insertar empleado
    public function empleado_insert($xdatos){
        $aDatos= json_decode($xdatos, true);
        $aResponse = [];
        $bd= new DataBase();

        $sql="CALL empleado_insert('". $aDatos["nombre"]. "' , '". $aDatos["apellido"]."', '". $aDatos["dni"]. "' , '". $aDatos["email"]."', '". $aDatos["telefono"]. "')";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"]= "ERROR";
            $aResponse["mensaje"]= $bd->getMessageError();
            return $aResponse;
        }else{
            $aResponse["estado"]="succes";
            $aResponse["mensaje"]="Se pudo insertar correctamente el empleado";
            $aResponse["datos"]= $bd->execute($sql);
            $bd->close();
            return $aResponse;
        }
    }

// Funcion para encontrar a empleado por ID
    public function empleado_getByID($xdatos){
        $aDatos = json_decode($xdatos,true);
        $aResponse = [];
        $bd= new DataBase();

        $sql = "CALL empleado_getByID(".$aDatos["id_empleado"].")";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"]= "ERROR"; 
            $aResponse["mensaje"]= $bd->getMessageError(); 
            return $aResponse;
        }

        $resultado = $bd->getQuery($sql);
        $bd->close();

        if (empty($resultado)) {
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = "No se encontro ningun empleado con ese id";
        } else{
            $aResponse["estado"] = "success";
            $aResponse["mensaje"] = "Se pudo encontrar el empleado de manera exitosa";
            $aResponse["datos"] = $resultado;
            return $aResponse;
        }

        return $aResponse;
    }

// Funcion para actualizar empleado
    public function empleado_update($xdatos){
        $aDatos = json_decode($xdatos,true);
        $aResponse = [];
        $bd = new DataBase();

        $sql = "CALL empleado_update('". $aDatos["id_empleado"]. "' , '". $aDatos["nombre"]. "' , '". $aDatos["apellido"]."', '". $aDatos["dni"]. "' , '". $aDatos["email"]."', '". $aDatos["telefono"]. "')";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"]="ERROR";
            $aResponse["mensaje"]= $bd->getMessageError();
            return $aResponse;
        }else{
            $aResponse["estado"]="succes";
            $aResponse["mensaje"]="Se pudo actualizar el socio de manera exitosa";
            $aResponse["datos"]= $bd->execute($sql);
            $bd->close();
            return $aResponse;
        }
    }

// Funcion para eliminar empleado
    public function empleado_delete($xdatos){
        $aDatos= json_decode($xdatos, true);
        $aResponse= [];
        $bd= new DataBase();

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"]= "ERROR";
            $aResponse["mensaje"]= $bd->getMessageError();
        }

        $sql = "CALL empleado_delete(".$aDatos["id_empleado"].")";
        $bd->execute($sql);
        $filasAfectadas = $bd->getAffectedRows();
        $bd->close();

        if ($filasAfectadas > 0) {
            $aResponse["estado"] = "success";
            $aResponse["mensaje"] = "El empleado fue eliminado de manera exitosa";
            return $aResponse;
        } else {
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = "No se encontro ningun empleado con ese ID";
            return $aResponse;
        }

        return $aResponse;
    }
}