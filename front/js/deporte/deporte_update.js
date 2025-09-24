var modalEditarDeporte = new bootstrap.Modal(document.getElementById("modalEditarDeporte"));

 document.addEventListener("click", (e) => {
   if (e.target.classList.contains("bi-pencil")) {
     abrirModalAddDeporte(e.target);
   }
 });


function abrirModalAddDeporte(e){
    const id_deporte = e.getAttribute("data-id");
    const descripcion = e.getAttribute("data-nombre");

    document.getElementById("id_deporte").value = id_deporte;
    document.getElementById("nombre_deporte").value = descripcion;
    modalEditarDeporte.show();
}

async function deporteActualizarDatos(id_deporte,descripcion){
    const url = url_deporte + "/deporte_update";
    const response = await fetch(url,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "id_deporte": id_deporte,
            "descripcion": descripcion,
        })
    })
    const resultado = await response.json();
    return resultado;
}

async function ActualizarDeporte(){
    const id_deporte =document.getElementById("id_deporte").value;
    const descripcion = document.getElementById("nombre_deporte").value;

    try {
        const resultado = await deporteActualizarDatos(id_deporte, descripcion)
        if(resultado.estado === "success"){
            alert(resultado.mensaje);
            modalEditarDeporte.hide();
            MostrarDeporte();            
        } else {
            alert("Error al actualizar deporte: " + resultado.mensaje);
        }
    } catch(error){
        console.error(error);
        alert("Error de conexión");
    }
}
document.getElementById("guardarCambiosDeporte").addEventListener("click", ActualizarDeporte);

document.addEventListener("DOMContentLoaded", MostrarDeporte);