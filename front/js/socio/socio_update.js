var modalEditarSocio = new bootstrap.Modal(document.getElementById("modalEditarSocio"));


function abrirModalEditSocio(e){
    const id_socio = e.getAttribute("data-id");
    const nombre = e.getAttribute("data-nombre");
    const apellido = e.getAttribute("data-apellido");
    const dni = e.getAttribute("data-dni");
    const email = e.getAttribute("data-email");
    const telefono = e.getAttribute("data-telefono");

    document.getElementById("id_socio").value = id_socio;
    document.getElementById("nombre_socio").value = nombre;
    document.getElementById("apellido_socio").value = apellido;
    document.getElementById("dni_socio").value = dni;
    document.getElementById("email_socio").value = email;
    document.getElementById("telefono_socio").value = telefono;

    modalEditarSocio.show();
}

async function socioActualizarDatos(id,nombre,apellido,dni,email,telefono){
    const url = url_socio + "/socioo_update";
    const response = await fetch(url,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "id_socio": id,
            "nombre": nombre,
            "apellido": apellido,
            "dni": dni,
            "email": email,
            "telefono": telefono
        })
    })
    const resultado = await response.json();
    return resultado;
}

async function ActualizarSocio(){
    const id =document.getElementById("id_socio").value;
    const nombre = document.getElementById("nombre_socio").value;
    const apellido = document.getElementById("apellido_socio").value;
    const dni = document.getElementById("dni_socio").value;
    const email = document.getElementById("email_socio").value;
    const telefono = document.getElementById("telefono_socio").value;

    try {
        const resultado = await socioActualizarDatos(id,nombre,apellido,dni,email,telefono)
        if(resultado.estado == "success"){
            alert(resultado.mensaje);
            modalEditarSocio.hide();
            MostrarSocio();            
        } else {
            alert("Error al actualizar socio: " + resultado.mensaje);
        }
    } catch(error){
        console.error(error);
        alert("Error de conexión");
    }
}
document.getElementById("guardarCambios").addEventListener("click", ActualizarSocio)
document.addEventListener("DOMContentLoaded", MostrarSocio);