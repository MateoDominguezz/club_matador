<?php
class SocioDeporteModel{
    public function socio_deporte_getAll(){
        $aResponse = [];
        $sql = "CALL socio_deporte_getAll()";
        $bd = new DataBase(); 

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = $bd->getMessageError();
            return $aResponse;
        } else{
            $aResponse["estado"]= "success";
            $aResponse["mensaje"] = "Se pudo obtener todos los socios con los deportes";
            $aResponse["datos"] = $bd->getQuery($sql);
            $bd->close();
            return $aResponse;
        }
    }

    public function socio_deporte_insert($xdatos){
        $aDatos= json_decode($xdatos, true);
        $aResponse = [];
        $bd = new DataBase();
        $sql= "CALL socio_deporte_insert(". $aDatos["id_deporte"]. " , ". $aDatos["id_socio"]. ", '". $aDatos["fecha_inscripcion"]. "')";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"]= "ERROR";
            $aResponse["mensaje"]= $bd->getMessageError();
            return $aResponse;
        } else { 
            $aResponse["estado"] = "success";
            $aResponse["mensaje"] = "Se pudo insertar de manera exitosa el socio y con el deporte";
            $aResponse["datos"] = $bd->execute($sql);
            $bd->close();
            return $aResponse; 
        }
    }

    public function socio_deporte_update($xdatos){
        $aDatos = json_decode($xdatos,true);
        $aResponse = [];
        $bd = new DataBase();

        $sql = "CALL socio_deporte_update(". $aDatos["id_deporte"]. " , ". $aDatos["id_socio"]. ", '". $aDatos["fecha_inscripcion"]. "')";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"] ="ERROR";
            $aResponse["mensaje"] = $bd->getMessageError();
            return $aResponse;
        } else{
            $aResponse["estado"]= "success";
            $aResponse["mensaje"] = "Se pudo actualizar el socio con el deporte exitosamente";
            $aResponse["datos"] = $bd->execute($sql);
            $bd->close();
            return $aResponse;
        }
    }

    public function socio_deporte_delete($xdatos){
        $aDatos = json_decode($xdatos, true);
        $aResponse = [];
        $bd= new DataBase();

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"]= "ERROR";
            $aResponse["mensaje"]= $bd->getMessageError(); 
            return $aResponse;
        }
        
        $sql = "CALL socio_deporte_delete(". $aDatos["id_deporte"]. ",". $aDatos["id_socio"] .")";
        $bd->execute($sql);
        $filasAfectadas = $bd->getAffectedRows();
        $bd->close();

        if ($filasAfectadas > 0) {
            $aResponse["estado"] = "success";
            $aResponse["mensaje"] = "El socio con el deporte fue eliminado de manera exitosa";
        } else {
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = "No se encontro ningun socio con un deporte con ese ID";
        }

        return $aResponse;
    }

    public function socio_deporte_getByID($xdatos){
        $aDatos=json_decode($xdatos,true) ; 
        $aResponse=[];
        $bd = new DataBase();

        $sql = "CALL socio_deporte_getByID(". $aDatos["id_deporte"]. ",". $aDatos["id_socio"]. " )";

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = $bd->getMessageError(); 
            return $aResponse; 
        } 
        
        $resultado = $bd->getQuery($sql);
        $bd->close();

        if (empty($resultado)) {
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = "No se encontro ningun socio con ese deporte, con ese id";
        } else{
            $aResponse["estado"] = "success";
            $aResponse["mensaje"] = "Se pudo encontrar el socio con el deporte de manera exitosa";
            $aResponse["datos"] = $resultado;
            return $aResponse;
        }

        return $aResponse;
    }
}
?>