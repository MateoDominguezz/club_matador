async function deleteDeporteDatos (id_deporte){
    const url = url_deporte + "/deporte_delete";
    const response = await fetch(url,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "id_deporte": id_deporte
        })
    })

    if(!response.ok){
        throw new Error ("Fallo en la conexion");
    }
    const resultado = await response.json()
    return resultado;
}

async function deleteDeporte(id_deporte) {
    if(!confirm("Estas seguro de eliminar el deporte?")){
        return;
    }
    
    try {
        const result = await deleteDeporteDatos(id_deporte);
        if(result.estado == "success"){
            alert("Se pudo eliminar el deporte " + id_deporte + " de manera exitosa" );
            MostrarSocio();
        } else {
            alert("Error al eliminar el socio" + result.mensaje);
        }
    }
    catch(error){
        console.log(error);
        alert("Error de conexion");
    }
}

document.addEventListener("DOMContentLoaded", MostrarDeporte)