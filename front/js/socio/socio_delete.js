async function deleteSocioDatos (id_socio){
    const url = url_socio + "/socio_delete";
    const response = await fetch(url,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id_socio: id_socio
        })
    })

    if(!response.ok){
        throw new Error ("Fallo en la conexion");
    }
    const resultado = await response.json()
    return resultado;
}

async function deleteSocio(id_socio) {
    if(!confirm("Estas seguro de eliminar al socio ?")){
        return;
    }
    
    try {
        const result = await deleteSocioDatos(id_socio);
        if(result.estado == "success"){
            alert("Se pudo eliminar el socio " + id_socio + " de manera exitosa" );
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

document.addEventListener("DOMContentLoaded", MostrarSocio())