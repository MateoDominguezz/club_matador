
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
               onclick="abrirModalAddCuota(this)"
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

document.addEventListener("DOMContentLoaded", MostrarCuota);