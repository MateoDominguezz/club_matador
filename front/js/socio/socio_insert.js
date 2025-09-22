const modalAgregarSocio = new bootstrap.Modal(document.getElementById("modalAgregarSocio"));

function addAbrirModal() {
    modalAgregarSocio.show();
}

document.getElementById("boton-insert-socio").addEventListener("click", () => {
    addAbrirModal();
})



async function addSocio(nombre,apellido,dni, email,telefono) {
    url = url_socio + "/socio_insert";
    response = await fetch (url , {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({
            "nombre":nombre,
            "apellido": apellido,
            "dni": dni,
            "email": email,
            "telefono": telefono
        })
    });

    if (!response.ok) {
        throw new Error("Fallo en la solicitud");
    }

    const resultado = await response.json();
    return resultado;
}

async function insertSocio () {
    // Nombre
    let inputNombre = document.getElementById("nombreAddSocio"); 
    let nombre = inputNombre.value.trim();
    // Apellido
    let inputApellido = document.getElementById("apellidoAddSocio");
    let apellido = inputApellido.value.trim();
    //DNI
    let inputDni = document.getElementById("dniAddSocio");
    let dni = inputDni.value.trim();
    //Email
    let inputEmail = document.getElementById("emailAddSocio");
    let email = inputEmail.value.trim();
    //Telefono
    let inputTelefono = document.getElementById("telefonoAddSocio");
    let telefono = inputTelefono.value.trim();



    if(nombre == "" || apellido == "" || dni == "" || email == "" || telefono == ""){
        alert("Los campos no puede estar vacio")
        return false
    } 

    try {
        let dato = await addSocio(nombre, apellido, dni, email, telefono);
        modalAgregarSocio.hide();
        alert(dato.mensaje);
    } catch (error) {
        console.log("Error: ", error)
        alert(error);
    }
}

document.getElementById("addCambios").addEventListener("click", insertSocio)