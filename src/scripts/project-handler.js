import { projectLogic } from './pure-logic.js';
import { projectDialogs } from './dialog-manager.js';

class ProjectDOM {
  constructor(projectHandler, parentDiv, template, eventManager) {
    this.projectHandler = projectHandler;
    this.parentDiv = parentDiv;
    this.template = template;
    this.eventManager = eventManager;
  }

  bindEvents() {
    this.eventManager.bindEvents();
  }

  addProject(title) {
    this.projectHandler.addProject(title);
    this.#render();
  }

  removeProject(projectIndex) {
    this.projectHandler.removeProject(projectIndex);
    this.#render();
  }

  renameProject(projectIndex, newTitle) {
    this.projectHandler.renameProject(projectIndex, newTitle);
    this.#render();
  }

  #render() {
    const elementsToAppend = [];
    this.parentDiv.textContent = '';

    this.projectHandler.getProjects().forEach((project, index) => {
      const projectDiv = this.#createProjectDiv(project.title, index);

      elementsToAppend.push(projectDiv);
    });

    this.parentDiv.append(...elementsToAppend);
  }

  #createProjectDiv(title, index) {
    const projectDiv = this.template.cloneNode(true);
    const titleInsideDiv = projectDiv.querySelector('.item__name');

    titleInsideDiv.textContent = title;
    projectDiv.dataset.index = index;

    return projectDiv;
  }

}

class ProjectEvents {
  constructor(parentDiv) {
    this.parentDiv = parentDiv;
  }

  static register(eventClass) {
    ProjectEvents.registry.unshift(eventClass);
  }

  bindEvents() {
    this.parentDiv.addEventListener('click', this.handleClick);
  }

  handleClick(event) {
    const clickHandlerClass = ProjectEvents.registry.find(
      handler => handler.canHandle(event)
    );

    const projectIndex = event.target.parentElement.dataset.index;
    new clickHandlerClass(projectIndex).handleClick();
  }
}

class DefaultEvent {
  static canHandle(event) {
    return true;
  }

  constructor(projectIndex) {
    this.projectIndex = projectIndex;
  }

  handleClick() {
    return;
  }
}

class DeleteEvent {
  static canHandle(event) {
    return event.target.matches('button.delete');
  }

  constructor(projectIndex) {
    this.projectIndex = projectIndex;
    this.deleteDialog = new DeleteDialog(this.projectIndex);
  }

  handleClick() {
    this.deleteDialog.showDialog();
  }
}

class EditEvent {
  static canHandle(event) {
    return event.target.matches('button.edit');
  }

  constructor(projectIndex) {
    this.projectIndex = projectIndex;
    this.editDialog = new EditDialog(this.projectIndex);
  }

  handleClick() {
    this.editDialog.showDialog();
  }
}

class DeleteDialog {
  deleteDialog = projectDialogs.delete;
  deleteBtn = this.deleteDialog.querySelector('button.delete');
  cancelBtn = this.deleteDialog.querySelector('button.cancel');
  messageDiv = this.deleteDialog.querySelector('.description');
  boundFunctions = {
    removeProject: this.removeProject.bind(this),
    closeDialog: this.closeDialog.bind(this),
    resetDialog: this.resetDialog.bind(this),
  };

  constructor(projectIndex) {
    this.projectIndex = projectIndex;
  }

  showDialog() {
    this.renderMessage()
    this.deleteDialog.showModal();
    this.bindEvents();
  }

  closeDialog() {
    this.deleteDialog.close();
  }

  resetDialog() {
    this.messageDiv.textContent = '';
    this.unbindEvents();
  }

  removeProject() {
    projectsController.removeProject(this.projectIndex);
    this.closeDialog();
  }

  renderMessage() {
    const projectName = projectLogic.getProject(this.projectIndex).title;

    this.messageDiv.innerHTML =
      `This will permanently delete ` +
      `<span style="font-weight: bold;">"${projectName}"</span>` +
      ` and all its tasks. This can't be undone.`
  }

  bindEvents() {
    this.deleteBtn.addEventListener(
      'click', this.boundFunctions.removeProject
    );
    this.cancelBtn.addEventListener(
      'click', this.boundFunctions.closeDialog
    );
    this.deleteDialog.addEventListener(
      'close', this.boundFunctions.resetDialog
    );
  }

  unbindEvents() {
    this.deleteBtn.removeEventListener(
      'click', this.boundFunctions.removeProject
    );
    this.cancelBtn.removeEventListener(
      'click', this.boundFunctions.closeDialog
    );
    this.deleteDialog.removeEventListener(
      'close', this.boundFunctions.unbindEvents
    );
  }
}

class EditDialog {
  editDialog = projectDialogs.edit;
  saveBtn = this.editDialog.querySelector('button.save');
  cancelBtn = this.editDialog.querySelector('button.cancel');
  inputField = this.editDialog.querySelector('input');
  boundFunctions = {
    renameProject: this.renameProject.bind(this),
    closeDialog: this.closeDialog.bind(this),
    resetDialog: this.resetDialog.bind(this),
  };

  constructor(projectIndex) {
    this.projectIndex = projectIndex;
  }

  showDialog() {
    this.editDialog.showModal();
    this.bindEvents();
  }

  closeDialog() {
    this.editDialog.close();
  }

  renameProject() {
    projectsController.renameProject(
      this.projectIndex, this.inputField.value
    );
    this.closeDialog();
  }

  resetDialog() {
    this.inputField.value = '';
    this.unbindEvents();
  }

  bindEvents() {
    this.saveBtn.addEventListener(
      'click', this.boundFunctions.renameProject
    );
    this.cancelBtn.addEventListener(
      'click', this.boundFunctions.closeDialog
    );
    this.editDialog.addEventListener(
      'close', this.boundFunctions.resetDialog
    );
  }

  unbindEvents() {
    this.saveBtn.removeEventListener(
      'click', this.boundFunctions.renameProject
    );
    this.cancelBtn.removeEventListener(
      'click', this.boundFunctions.closeDialog
    );
    this.editDialog.removeEventListener(
      'close', this.boundFunctions.unbindEvents
    );
  }

}

ProjectEvents.registry = [DefaultEvent];
ProjectEvents.register(EditEvent);
ProjectEvents.register(DeleteEvent);


const projectsContainerDiv = document.querySelector('.projects');
const projectsTemplateDiv = document.querySelector('.projects-template')
  .content.firstElementChild


const projectEventsController = new ProjectEvents(
  projectsContainerDiv
);
const projectsController = new ProjectDOM(
  projectLogic,
  projectsContainerDiv,
  projectsTemplateDiv,
  projectEventsController,
);



projectsController.bindEvents();
projectsController.addProject('My Project');
projectsController.addProject('My Project Two');