const tareas = [
    { id: 1, labor: "Lavar loza", realizada: false },
    { id: 2, labor: "Cocinar", realizada: false },
    { id: 3, labor: "Pasear al perro", realizada: false },
    { id: 4, labor: "Limpiar baño", realizada: false }
];


document.querySelector('.input-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const input = document.querySelector('#taskInput');
    const tarea = input.value.trim();

    if (tarea !== "") {
        const id = tareas.length ? tareas[tareas.length - 1].id + 1 : 1;
        const nuevaTarea = { id: id, labor: tarea, realizada: false };
        tareas.push(nuevaTarea);

        input.value = "";
        actualizarLista();
    }
});

function actualizarLista() {
    const listaID = document.querySelector('.listaID');
    const listaTareas = document.querySelector('.listaTareas');
    listaID.innerHTML = "";
    listaTareas.innerHTML = "";

    let realizadasCount = 0;

    tareas.forEach(tarea => {
        const idElement = document.createElement('div');
        idElement.textContent = tarea.id;
        listaID.appendChild(idElement);

        const tareaElement = document.createElement('div');
        tareaElement.textContent = tarea.labor;
        
        const checklistButton = document.createElement('button');
        checklistButton.innerHTML = tarea.realizada ? "✔️" : "🔲";
        checklistButton.classList.add('btn', 'btn-secondary');
        checklistButton.addEventListener('click', () => {
            tarea.realizada = !tarea.realizada;
            actualizarLista();
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = "❌";
        deleteButton.classList.add('btn', 'btn-delete');
        deleteButton.addEventListener('click', () => {
            const index = tareas.findIndex(t => t.id === tarea.id);
            tareas.splice(index, 1);
            actualizarLista();
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('task-buttons');
        buttonContainer.appendChild(checklistButton);
        buttonContainer.appendChild(deleteButton);

        const container = document.createElement('div');
        container.classList.add('task-container');
        container.appendChild(tareaElement);
        container.appendChild(buttonContainer);

        listaTareas.appendChild(container);

        if (tarea.realizada) {
            realizadasCount++;
        }
    });

    document.querySelector('.strong-total').textContent = tareas.length;
    document.querySelector('.strong-ready').textContent = realizadasCount;
}

actualizarLista();
