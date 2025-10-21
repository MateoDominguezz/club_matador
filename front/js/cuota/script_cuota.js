//---------------------------------------- GET ------------------------------------------------
// Funcion para obtener todas las cuotas
async function getCuota (){
    const url = url_cuota + "/cuota_getAll";
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
async function MostrarCuota(){
    const cuotas = await getCuota();
    let body = document.getElementById("table_container_cuota");
    body.innerHTML = "";

    cuotas.forEach(cuota => {
        const tr = document.createElement("tr");
        tr.classList.add("fs-md");

        tr.innerHTML = ` 
        <th scope="row">${cuota.id_cuota}</th>
        <td>${cuota.id_socio}</td>
        <td>${cuota.nombre}</td>
        <td>${cuota.precio_mensual}$</td>
        <td>${cuota.fecha_pago}</td>
        <td>
            <i class="bi bi-pencil text-warning iconos"
               data-idCuota="${cuota.id_cuota}"
               data-idSocio="${cuota.id_socio}"
               data-nombre="${cuota.nombre}"
               data-precio="${cuota.precio_mensual}"
               data-fecha="${cuota.fecha_pago}"
               onclick="abrirModalUpdateCuota(this)"
               >
            </i>
        </td>
        <td>
            <i class="bi bi-trash text-danger iconos" 
            onclick="deleteCuota(${cuota.id_cuota})"
            ></i>
        </td>
        `;

        body.appendChild(tr);
    });
}

// ---------------------------------------- INSERT ------------------------------------------------
//Funcion para agregar cuota
async function insertCuota(id_socio, fecha_pago, precio_mensual){
    const url = url_cuota + "/cuota_insert";
    const response = await fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "id_socio": id_socio,
            "fecha_pago": fecha_pago,
            "precio_mensual": precio_mensual
        })
    });

    if(!response.ok) {
        throw new Error("Error en la llamada a la API");
    }
    const resultado = await response.json();
    return resultado;
}

// Funcion para ver los socios en el modal de agregar cuota
async function verSociosEnModal(){
    const url = url_socio + "/socio_getAll";
    const response = await fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" }
    });
    
    if(!response.ok) {
        throw new Error("Error en la llamada a la API");
    }
    const resultado = await response.json();
    const socios = resultado.datos;

    let select = document.getElementById("idSocioAddCuota");
    select.innerHTML = "";
    socios.forEach(socio => {
        const option = document.createElement("option");
        option.value = socio.id_socio;
        option.textContent = `${socio.id_socio} - ${socio.nombre}`;
        select.appendChild(option);
    });
}

// Funcion de configuracion del modal de agregar cuota
const modalAgregarCuota = new bootstrap.Modal(document.getElementById("modalAgregarCuota"));
function addAbrirModalCuota() {
    modalAgregarCuota.show();
}

//Funcion para ver el modal de agregar cuota
document.getElementById("boton-insert-cuota").addEventListener("click", () => {
    verSociosEnModal();
    addAbrirModalCuota();
})

// Funcion para guardar los cambios al agregar cuota
document.getElementById("addCambiosCuota").addEventListener("click", async () => {
    const id_socio = document.getElementById("idSocioAddCuota").value;
    const fecha_pago = document.getElementById("fechaPagoAddCuota").value;
    const precio_mensual = document.getElementById("precioMensualAddCuota").value;

    if (id_socio === "" || fecha_pago === "" || precio_mensual === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }
    try {
        await insertCuota(id_socio, fecha_pago, precio_mensual);
        modalAgregarCuota.hide();
        MostrarCuota();
    } catch (error) {
        alert("Hubo un error al insertar la cuota");
    }
});

// ---------------------------------------- UPDATE ------------------------------------------------

// Funcion de configuracion del modal de editar cuota
var modalEditarCuota = new bootstrap.Modal(document.getElementById("modalEditarCuota"));

//Funcion para editar las cuotas
function abrirModalUpdateCuota(e) {
    const id_cuota = e.getAttribute("data-idCuota");    
    const id_socio = e.getAttribute("data-idSocio");
    const precio = e.getAttribute("data-precio");
    const fecha = e.getAttribute("data-fecha");
    
    document.getElementById("idCuotaEdit").value = id_cuota;
    document.getElementById("idSocioEditCuota").value = id_socio;
    document.getElementById("precioMensualEditCuota").value = precio;
    document.getElementById("fechaPagoEditCuota").value = fecha;

    modalEditarCuota.show();
}

//Funcion para llamar al procedure de actualizar cuota
async function updateCuota(id_cuota,id_socio, fecha_pago, precio_mensual){
    const url = url_cuota + "/cuota_update";
    const response = await fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "id_cuota": id_cuota,
            "id_socio": id_socio,
            "fecha_pago": fecha_pago,
            "precio_mensual": precio_mensual
        })
    });
    if(!response.ok) {
        throw new Error("Error en la llamada a la API");
    }
    const resultado = await response.json();
    return resultado;
}

async function ActualizarCuota(){
    const id_cuota =document.getElementById("idCuotaEdit").value;
    const id_socio = document.getElementById("idSocioEditCuota").value;
    const precio = document.getElementById("precioMensualEditCuota").value = precio;
    const fecha = document.getElementById("fechaPagoEditCuota").value = fecha;

    try {
        const resultado = await updateCuota(id_cuota,id_socio,precio,fecha)
        if(resultado.estado == "success"){
            alert(resultado.mensaje);
            modalEditarCuota.hide();
            MostrarCuota();            
        } else {
            alert("Error al actualizar la cuota: " + resultado.mensaje);
        }
    } catch(error){
        console.error(error);
        alert("Error de conexión");
    }
}

// Mostrar las cuotas al cargar la pagina
document.addEventListener("DOMContentLoaded", MostrarCuota);