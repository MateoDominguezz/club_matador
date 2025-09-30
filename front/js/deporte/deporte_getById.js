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

