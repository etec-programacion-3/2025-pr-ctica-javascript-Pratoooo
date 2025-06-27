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
