<?php
// Aca se incluye los archivos que necesita para andar la api
include "../sources/config.php";
include "../sources/database.php";
include "turno_model/turno_model.php";

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");


$response = [];

if(strcmp($_SERVER["REQUEST_METHOD"], "POST") != 0){ 
    $response["estado"] = "ERROR DE SOLICITUD";
    $response["mensaje"]= "Metodo no soportado";
    echo json_encode($response);
    exit();
}

$bdModel = new TurnoModel();


// Tomo la url y la convierto en array
$url = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$aUrl = explode("/", $url);


// Recupero el nombre del metodo a ejecutar
$metodo_a_ejecutar = $aUrl[sizeof($aUrl) - 1];


$aDatos = file_get_contents("php://input");

$bdModel = new TurnoModel();
$response = $bdModel->{$metodo_a_ejecutar}($aDatos);
echo json_encode($response);
