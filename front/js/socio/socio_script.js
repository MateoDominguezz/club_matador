// ------------------------------------------------ Get -------------------------------------------------
async function getSocio (){
    const url = url_socio + "/socio_getAll";
    response = await fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" }
    });

    if(!response.ok) {
        throw new Error("Error en la llamada a la API");
    }
    const resultado = await response.json();
    return resultado.datos;
}


// Funcion para mostrar todas las cuotas en la tabla
async function MostrarSocio(){
    const socios = await getSocio();
    let body = document.getElementById("table_container_socio");
    body.innerHTML = "";

    socios.forEach(socio => {
        const tr = document.createElement("tr");
        tr.classList.add("fs-md");

        tr.innerHTML = ` 
        <th scope="row">${socio.id_socio}</th>
        <td>${socio.nombre}</td>
        <td>${socio.apellido}</td>
        <td>${socio.dni}</td>
        <td>${socio.email}</td>
        <td>${socio.telefono}</td>
        <td>
            <i class="bi bi-pencil text-warning iconos"
               data-id="${socio.id_socio}" 
               data-nombre="${socio.nombre}" 
               data-apellido = "${socio.apellido}"
               data-dni = "${socio.dni}"
               data-email = "${socio.email}"
               data-telefono = "${socio.telefono}"
               onclick="abrirModalEditSocio(this)"
               >
            </i>
        </td>
        <td>
            <i class="bi bi-trash text-danger iconos" 
               onclick="deleteSocio(${socio.id_socio})">
            </i>
        </td>
        `;

        body.appendChild(tr);
    });
}

//------------------------------------------------- Insert -------------------------------------------------

async function insertSocio(nombre,apellido,dni, email,telefono) {
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

// Funcion de configuracion del modal de agregar socio
const modalAgregarSocio = new bootstrap.Modal(document.getElementById("modalAgregarSocio"));
function addAbrirModalSocio() {
    modalAgregarSocio.show();
}
// Funcion para ver el modal de agregar socio
document.getElementById("boton-insert-socio").addEventListener("click", () => {
    addAbrirModalSocio();
})

// Funcion para guardar los cambios del socio
document.getElementById("addCambiosSocio").addEventListener("click", async () => {
    const nombre = document.getElementById("nombreAddSocio").value;
    const apellido = document.getElementById("apellidoAddSocio").value;
    const dni = document.getElementById("dniAddSocio").value;
    const email = document.getElementById("emailAddSocio").value;
    const telefono = document.getElementById("telefonoAddSocio").value;

    if(nombre == "" || apellido == "" || dni == "" || email == "" || telefono == ""){
        alert("Los campos no puede estar vacio")
        return false
    } 

    try {
        await insertSocio(nombre, apellido, dni, email, telefono);
        modalAgregarSocio.hide();
        MostrarSocio();
    } catch (error) {
        alert("Hubo un error al insertar la cuota");
    }
});

// Mostrar los socios al cargar la pagina
document.addEventListener("DOMContentLoaded", MostrarSocio);
