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
               onclick="abrirModal(this)"
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

document.addEventListener("DOMContentLoaded", MostrarDeporte);