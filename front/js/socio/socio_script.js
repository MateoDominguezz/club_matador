// ------------------------------------------------ GetAll -------------------------------------------------
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


// ------------------------------------------------- GetById -------------------------------------------------
async function get_socio(id){
    const url = url_socio + "/socio_getByID";
    const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_socio: id, 
        })
    });

    if(!response.ok){
        throw new Error("Fallo en la solicitud");
    }
    const resultado = await response.json();
    return resultado;
}


async function socio_printById(id) {
    const tbody = document.getElementById("table_container_socio");
    const response = await get_socio(id);
    const datos = response.datos;         

    tbody.innerHTML = "";

    if (datos && datos.length > 0) {
        const socio = datos[0];
        const tr = document.createElement("tr");
        tr.classList.add("fs-md");
        tr.innerHTML =  ` 
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
               onclick="abrirModalSocio(this)"
               >
            </i>
        </td>
        <td>
            <i class="bi bi-trash text-danger iconos" 
               onclick="deleteSocio(${socio.id_socio})">
            </i>
        </td>
        `;
        tbody.appendChild(tr);
    } else {
        tbody.innerHTML = `<tr class="fs-md"><td colspan="8">No se encontro ningun resultado</td></tr>`;
    }
}

document.getElementById("input-buscar-socio").addEventListener("keyup", async (e) => {
    //Target: Sirve para llamar al evento html, que genero este evento
    // Con el .trim elimina espacios en blanco
    const id = e.target.value.trim();
    if (id) {
        await socio_printById(id);
    } else {
        await MostrarSocio();
    }
});

// ------------------------------------------------ Update -------------------------------------------------
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


// Mostrar los socios al cargar la pagina
document.addEventListener("DOMContentLoaded", MostrarSocio);
