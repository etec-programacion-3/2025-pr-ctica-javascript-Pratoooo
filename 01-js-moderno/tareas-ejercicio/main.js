<<<<<<< HEAD
import {
  getTasks,
  addTask,
  removeTask,
  editTask,
  toggleCompletada,
} from './tareas.js';

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const filter = document.getElementById('task-filter'); // select para el filtro

// Renderiza la lista de tareas en el DOM
function renderTasks() {
  list.innerHTML = '';
  const tasks = getTasks();
  const tipoFiltro = filter.value;

  // Aplica filtro si corresponde
  const filteredTasks = tasks.filter(({ completada }) => {
    if (tipoFiltro === 'todas') return true;
    if (tipoFiltro === 'completadas') return completada;
    if (tipoFiltro === 'pendientes') return !completada;
  });

  filteredTasks.forEach(({ texto, completada }, idx) => {
    const li = document.createElement('li');
    li.textContent = texto;
    li.style.textDecoration = completada ? 'line-through' : 'none';

    // Botón para marcar como completada/incompleta
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = completada ? 'Marcar como pendiente' : 'Completar';
    toggleBtn.onclick = () => {
      toggleCompletada(idx);
      renderTasks();
    };

    // Botón para editar la tarea
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.onclick = () => {
      const nuevoTexto = prompt('Editar tarea:', texto);
      if (nuevoTexto) {
        editTask(idx, nuevoTexto);
        renderTasks();
      }
    };

    // Botón para eliminar la tarea
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Eliminar';
    delBtn.onclick = () => {
      removeTask(idx);
      renderTasks();
    };

    li.appendChild(toggleBtn);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// Evento submit para agregar tarea
form.onsubmit = e => {
  e.preventDefault();
  if (input.value.trim()) {
    addTask(input.value.trim());
    input.value = '';
    renderTasks();
  }
};

// Evento para cambiar filtro
filter.onchange = () => renderTasks();

// Render inicial
renderTasks();
=======
// Lista inicial de tareas
let tareas = [
  { id: 1, titulo: "Aprender JS", completada: false },
  { id: 2, titulo: "Practicar React", completada: true },
];

// Elementos del DOM
const listaTareas = document.getElementById("lista-tareas");
const form = document.getElementById("formulario");
const inputTarea = document.getElementById("nueva-tarea");
const filtro = document.getElementById("filtro");

// Renderizar tareas (con destructuring)
function renderTareas(lista = tareas) {
  listaTareas.innerHTML = "";

  lista.forEach(({ id, titulo, completada }) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" class="check" data-id="${id}" ${completada ? "checked" : ""}>
      <span ${completada ? 'style="text-decoration: line-through;"' : ""}>${titulo}</span>
      <button class="editar" data-id="${id}">✏️</button>
      <button class="eliminar" data-id="${id}">🗑️</button>
    `;
    listaTareas.appendChild(li);
  });
}

// Agregar nueva tarea
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const titulo = inputTarea.value.trim();
  if (titulo) {
    tareas.push({
      id: Date.now(),
      titulo,
      completada: false,
    });
    inputTarea.value = "";
    renderTareasFiltradas();
  }
});

// Eliminar tarea
listaTareas.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminar")) {
    const id = Number(e.target.dataset.id);
    tareas = tareas.filter((tarea) => tarea.id !== id);
    renderTareasFiltradas();
  }
});

// Editar tarea (Ejercicio 1)
listaTareas.addEventListener("click", (e) => {
  if (e.target.classList.contains("editar")) {
    const id = Number(e.target.dataset.id);
    const nueva = prompt("Nuevo nombre:");
    if (nueva?.trim()) {
      tareas = tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, titulo: nueva } : tarea
      );
      renderTareasFiltradas();
    }
  }
});

// Completar tarea
listaTareas.addEventListener("change", (e) => {
  if (e.target.classList.contains("check")) {
    const id = Number(e.target.dataset.id);
    tareas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );
    renderTareasFiltradas();
  }
});

// Filtrar tareas (Ejercicio 2)
filtro.addEventListener("change", () => {
  renderTareasFiltradas();
});

function renderTareasFiltradas() {
  const tipo = filtro.value;
  if (tipo === "completadas") {
    renderTareas(tareas.filter((t) => t.completada));
  } else if (tipo === "pendientes") {
    renderTareas(tareas.filter((t) => !t.completada));
  } else {
    renderTareas(tareas);
  }
}

// Render inicial
renderTareas();
>>>>>>> 6dffdd9 (Entrega Trabajo)
