const modalAgregarDeporte = new bootstrap.Modal(document.getElementById("modalAgregarDeporte"));

function addAbrirModal() {
    modalAgregarDeporte.show();
}

document.getElementById("boton-insert-deporte").addEventListener("click", () => {
    addAbrirModal();
})



async function addDeporte(descripcion) {
    url = "../../back/matador/deporte/deporte.php/deporte_insert";
    response = await fetch (url , {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({
            "descripcion":descripcion,
        })
    });

    if (!response.ok) {
        throw new Error("Fallo en la solicitud");
    }

    const resultado = await response.json();
    return resultado;
}

async function insertDeporte () {
    // Nombre
    let inputDescripcion = document.getElementById("descripcionAdddeporte"); 
    let descripcion = inputDescripcion.value.trim();

    if(descripcion === ""){
        alert("Los campos no puede estar vacio")
        return false
    } 

    try {
        let dato = await addDeporte(descripcion);
        modalAgregarDeporte.hide();
        alert(dato.mensaje);
        MostrarDeporte();
    } catch (error) {
        console.log("Error: ", error)
        alert(error);
    }
}

document.getElementById("addCambiosDeporte").addEventListener("click", insertDeporte);
