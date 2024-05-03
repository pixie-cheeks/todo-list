import { projectLogic, Todo } from './pure-logic.js';
import { projectDialogs } from './dialog-manager.js';
import { contentSwitcher } from './project-tabs.js';

class ProjectDOM {
  constructor(projectHandler, parentDiv, template, eventManager) {
    this.projectHandler = projectHandler;
    this.parentDiv = parentDiv;
    this.template = template;
    this.eventManager = eventManager;
  }

  init() {
    this.eventManager.bindEvents();
  }

  addProject(title) {
    this.projectHandler.addProject(title);
    this.#render();
  }

  removeProject(projectIndex) {
    this.projectHandler.removeProject(projectIndex);
    this.#render();

    if (projectLogic.getActiveIndex() === null) {
      contentSwitcher.resetContent();
    }
  }

  renameProject(projectIndex, newTitle) {
    this.projectHandler.renameProject(projectIndex, newTitle);
    this.#render();
    if (projectLogic.getActiveIndex() === projectIndex) {
      contentSwitcher.populateContentContainer();
    }
  }

  switchProject(projectIndex) {
    projectLogic.setActiveIndex(projectIndex);
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
    this.#styleActiveProject(projectLogic.getActiveIndex());
  }

  #styleActiveProject(activeIndex) {
    if (activeIndex === null) return;
    this.parentDiv.children[activeIndex]
      .classList.add('focused-project');
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

  static registry = [];

  static register(eventClass) {
    ProjectEvents.registry.unshift(eventClass);
  }

  bindEvents() {
    this.parentDiv.addEventListener('click', this.handleClick);
  }

  handleClick(event) {
    if (!(event.target.matches('button'))) return;
    const clickHandlerClass = ProjectEvents.registry.find(
      handler => handler.canHandle(event)
    );

    const projectIndex = Number(event.target.parentElement.dataset.index);
    new clickHandlerClass(projectIndex).handleClick();
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
    validateName: this.validateName.bind(this),
    closeDialog: this.closeDialog.bind(this),
    resetDialog: this.resetDialog.bind(this),
  };

  constructor(projectIndex) {
    this.projectIndex = projectIndex;
  }

  showDialog() {
    this.inputField.value =
      projectLogic.getProject(this.projectIndex).title;
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

  validateName() {
    if (
      /^\s*$/g.test(this.inputField.value)
    ) {
      this.closeDialog();
      return;
    }

    this.renameProject();
  }

  resetDialog() {
    this.inputField.value = '';
    this.unbindEvents();
  }

  bindEvents() {
    this.saveBtn.addEventListener(
      'click', this.boundFunctions.validateName
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
      'click', this.boundFunctions.validateName
    );
    this.cancelBtn.removeEventListener(
      'click', this.boundFunctions.closeDialog
    );
    this.editDialog.removeEventListener(
      'close', this.boundFunctions.resetDialog
    );
  }

}

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

const projectAdder = (() => {
  const addProjectBtn = document.querySelector('.add-projects');
  const addDialog = projectDialogs.add;
  const saveBtn = addDialog.querySelector('button.save');
  const cancelBtn = addDialog.querySelector('button.cancel');
  const inputField = addDialog.querySelector('input');

  bindEvents();
  addProjectBtn.addEventListener('click', showDialog);

  function showDialog() {
    addDialog.showModal();
  }

  function closeDialog() {
    addDialog.close();
  }

  function addProject() {
    projectsController.addProject(inputField.value);
    closeDialog();
  }

  function validateName() {
    if (
      /^\s*$/g.test(inputField.value)
    ) {
      closeDialog();
      return;
    }

    addProject();
  }

  function resetDialog() {
    inputField.value = '';
  }

  function bindEvents() {
    saveBtn.addEventListener('click', validateName);
    cancelBtn.addEventListener('click', closeDialog);
    addDialog.addEventListener('close', resetDialog);
  }

})();


projectsController.init();

export default projectsController;