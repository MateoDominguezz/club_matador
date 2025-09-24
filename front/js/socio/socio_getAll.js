async function getSocio() {
    const url = url_socio + "/socio_getAll";
    const response = await fetch(url,
        {method: "POST"}
    )

    if(!response.ok) {
        throw new Error ("Error de la solicitud");
    }
    const resultado = await response.json() 
    console.log(resultado.datos);
    return resultado.datos
}

async function MostrarSocio() {
    const body = document.getElementById("table_container")
    let datos = await getSocio();

    body.innerHTML = "";

    datos.forEach(socio => {
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

document.addEventListener("DOMContentLoaded", MostrarSocio);