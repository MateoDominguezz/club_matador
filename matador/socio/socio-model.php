<?php
class SocioModel{
    public function getAll(){
        $aResponse = [];
        $sql = "CALL getAll()";
        $bd = new DataBase(); 

        if(!$bd->getEstadoConexion()){
            $aResponse["estado"] = "ERROR";
            $aResponse["mensaje"] = $bd->getMessageError();
            return $aResponse;
        } else{
            $aResponse["estado"]= "success";
            $aResponse["mensaje"] = "Se pudo obtener todos los socios";
            $aResponse["datos"] = $bd->getQuery($sql);
            return $aResponse;
        }
    }

    public function insert($xid_socio, $xnombre, $xapellido, $xdni, $xemail, $xtelefono){
        
    }
}