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
    const tbody = document.getElementById("table_container");
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
               onclick="abrirModal(this)"
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

document.getElementById("input-buscar").addEventListener("keyup", async (e) => {
    //Target: Sirve para llamar al evento html, que genero este evento
    // Con el .trim elimina espacios en blanco
    const id = e.target.value.trim();
    if (id) {
        await socio_printById(id);
    } else {
        await socio_print();
    }
});

