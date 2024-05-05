import { format } from "date-fns";

const projectName = document.querySelector('.current-project-name');
const projectHead = document.querySelector('.todo-head');
const tasksContainer = document.querySelector('.todo-container');
const taskTemplate = document.querySelector('.todo-template').content.cloneNode(true).firstElementChild;

function renderMain(project) {
  // if project is null, then don't render
  if (!project) {
    resetMain();
    return;
  }
  renderHead(project.name);
  renderTasks(project.tasks)
}

function renderHead(name) {
  projectName.textContent = name;
  projectHead.classList.remove('disabled');
}

function renderTasks(tasks) {
  const fragment = document.createDocumentFragment();
  tasksContainer.textContent = '';

  tasks.forEach((task, index) => {
    const taskDiv = createTaskDiv(task);
    taskDiv.dataset.index = index;
    fragment.appendChild(taskDiv);
  });

  tasksContainer.appendChild(fragment);
}

function resetMain() {
  projectHead.classList.add('disabled');

  projectName.textContent = '';
  tasksContainer.textContent = '';
}

function createTaskDiv(task) {
  const taskDiv = taskTemplate.cloneNode(true);
  const taskTitle = taskDiv.querySelector('.todo-title');
  const taskDate = taskDiv.querySelector('.todo-date');
  const taskComplete = taskDiv.querySelector('input');

  taskTitle.textContent = task.title;
  taskDate.textContent = format(task.dueDate, 'dd MMM');
  taskComplete.checked = task.completed;
  taskDiv.classList.add(task.priority);

  if (task.completed) {
    taskTitle.style.textDecoration = 'line-through';
    taskDiv.classList.add('completed');
  }

  return taskDiv;
}


export { renderMain, renderTasks, renderHead };