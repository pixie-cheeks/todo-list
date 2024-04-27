import { ProjectLogic, Project, Todo } from './pure-logic.js';

class ProjectDOM {
  constructor(projectHandler, parentDiv, template) {
    this.projectHandler = projectHandler;
    this.parentDiv = parentDiv;
    this.template = template;
  }

  bindEvents() {
    this.parentDiv.addEventListener(
      'click', this.removeProject.bind(this)
    );
  }

  addProject(title) {
    this.projectHandler.addProject(title);
    this.#render();
  }

  removeProject(event) {
    if (!(event.target.matches('button.delete'))) return;

    const project = event.target.parentElement;

    this.projectHandler.removeProject(project.dataset.index);
    this.#render();
  }

  renameProject(projectIndex, newTitle) {
    this.projectHandler.renameProject(projectIndex, newTitle);
  }

  #render() {
    const elementsToAppend = [];
    this.parentDiv.textContent = '';

    this.projectHandler.getProjects().forEach((project, index) => {
      const projectDiv = this.template.cloneNode(true);
      const titleInsideDiv = projectDiv.querySelector('.item__name');

      titleInsideDiv.textContent = project.title;
      projectDiv.dataset.index = index;

      elementsToAppend.push(projectDiv);
    });

    this.parentDiv.append(...elementsToAppend);
  }
}

const projectsContainerDiv = document.querySelector('.projects');
const projectsTemplateDiv = document.querySelector('.projects-template')
  .content.firstElementChild

const projectsInSidebar = new ProjectDOM(
  new ProjectLogic(),
  projectsContainerDiv,
  projectsTemplateDiv
);
projectsInSidebar.bindEvents();
projectsInSidebar.addProject('zero index');
projectsInSidebar.addProject('one index');

let i = 0;
document.querySelector('.add-btn').addEventListener('click', () => {
  projectsInSidebar.addProject('Bravo ' + i++);
})