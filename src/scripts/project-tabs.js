// import todoPopulator
import { projectLogic } from "./pure-logic.js";
import projectsController from "./project-handler.js";

const contentTemplate = document.querySelector('template.project-content').content.cloneNode(true);
const contentContainer = document.querySelector('.todo-section');
const projectBar = document.querySelector('.projects');

projectBar.addEventListener('click', handleClick);

function handleClick(event) {
  if (!(event.target.matches('.projects__item'))) return;

  selectProject(event.target.dataset.index);
}

function selectProject(selectedIndex) {
  if (selectedIndex === projectLogic.getActiveIndex()) return;
  projectsController.switchProject(selectedIndex);
  populateContentContainer();
}

function resetContent() {
  contentContainer.textContent = '';
}

function populateContentContainer() {
  resetContent();
  const content = contentTemplate.cloneNode(true);
  const projectTitleDiv = content.querySelector('.current-project-name');
  const addTodoBtn = content.querySelector('.add-btn.add-todos');
  const todoContainer = content.querySelector('.todo-container');
  const project = projectLogic.getProject(projectLogic.getActiveIndex());

  projectTitleDiv.textContent = project.title;
  // addTodoBtn.addEventListener('click', addTodo);
  contentContainer.appendChild(content);
  console.log(project)
}

const contentSwitcher = {
  resetContent,
  populateContentContainer,
}

export { contentSwitcher };