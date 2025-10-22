// ------------------------- GetAll -------------------------
async function getDeporte() {
    const url = "../../back/matador/deporte/deporte.php/deporte_getAll";
    const response = await fetch(url,
        {
            method: "POST"
        }
    )

    if(!response.ok) {
        throw new Error ("Error de la solicitud");
    }
    const resultado = await response.json() 
    console.log(resultado.datos);
    return resultado.datos;
}

async function MostrarDeporte() {
    const body = document.getElementById("table_container_deporte")
    let datos = await getDeporte();

    body.innerHTML = "";

    datos.forEach(deporte => {
        const tr = document.createElement("tr");
        tr.classList.add("fs-md");

        tr.innerHTML = ` 
        <th scope="row">${deporte.id_deporte}</th>
        <td>${deporte.descripcion}</td>
        <td>
            <i class="bi bi-pencil text-warning iconos"
               data-id="${deporte.id_deporte}" 
               data-nombre="${deporte.descripcion}" 
               onclick="abrirModalAddDeporte(this)"
               >
            </i>
        </td>
        <td>
            <i class="bi bi-trash text-danger iconos" 
            onclick="deleteDeporte(${deporte.id_deporte})">
            </i>
        </td>
        `;

        body.appendChild(tr);
    });

}

// ---------------------------- Update -----------------
var modalEditarDeporte = new bootstrap.Modal(document.getElementById("modalEditarDeporte"));

 document.addEventListener("click", () => {
     abrirModalAddDeporte();
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

// ------------------------- Delete -------------------------
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
            MostrarDeporte();
        } else {
            alert("Error al eliminar el deporte" + result.mensaje);
        }
    }
    catch(error){
        console.log(error);
        alert("Error de conexion");
    }
}


// ------------------------- Insert -------------------------
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

// --------------------------------- GetById --------------------
async function get_deporte(id){
    const url = url_deporte + "/deporte_getByID";
    const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_deporte: id, 
        })
    });

    if(!response.ok){
        throw new Error("Fallo en la solicitud");
    }
    const resultado = await response.json();
    return resultado;
}


async function deporte_printById(id) {
    const tbody = document.getElementById("table_container_deporte");
    const response = await get_deporte(id);
    const datos = response.datos;         

    tbody.innerHTML = "";

    if (datos && datos.length > 0) {
        const deporte = datos[0];
        const tr = document.createElement("tr");
        tr.classList.add("fs-md");

        tr.innerHTML =  ` 
        <th scope="row">${deporte.id_deporte}</th>
        <td>${deporte.descripcion}</td>
        <td>
            <i class="bi bi-pencil text-warning iconos"
               data-id="${deporte.id_deporte}" 
               data-nombre="${deporte.descripcion}" 
               >
            </i>
        </td>
        <td>
            <i class="bi bi-trash text-danger iconos" 
               onclick="deleteSocio(${deporte.id_deporte})">
            </i>
        </td>
        `;
        tbody.appendChild(tr);
    } else {
        tbody.innerHTML = `<tr class="fs-md"><td colspan="8">No se encontro ningun resultado</td></tr>`;
    }
}

document.getElementById("input-buscar-deporte").addEventListener("keyup", async (e) => {
    //Target: Sirve para llamar al evento html, que genero este evento
    // Con el .trim elimina espacios en blanco
    const id = e.target.value.trim();
    if (id) {
        await deporte_printById(id);
    } else {
        await MostrarDeporte();
    }
});

document.addEventListener("DOMContentLoaded", MostrarDeporte);