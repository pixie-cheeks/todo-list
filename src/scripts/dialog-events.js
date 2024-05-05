import registerEvent from "./events";
import app from './app-logic';

class CancelDialog {
  static canHandle(event) {
    return event.target.matches('dialog button.cancel, dialog button.exit');
  }

  constructor(event) {
    this.openedDialog = document.querySelector('dialog[open]');
  }

  handleClick() {
    this.openedDialog.close();
  }
}

class ShowEditProject {
  static canHandle(event) {
    return event.target.matches('.projects button.edit');
  }

  constructor(event) {
    this.projectIndex = Number(event.target.parentElement.dataset.index);
  }

  handleClick() {
    app.showEditProject(this.projectIndex)
  }
}

class ShowDeleteProject {
  static canHandle(event) {
    return event.target.matches('.projects button.delete');
  }

  constructor(event) {
    this.projectIndex = Number(event.target.parentElement.dataset.index);
  }

  handleClick() {
    app.showDeleteProject(this.projectIndex)
  }
}

class ShowAddProject {
  static canHandle(event) {
    return event.target.matches('button.add-projects');
  }

  handleClick() {
    app.showAddProject();
  }
}

class ShowAddTask {
  static canHandle(event) {
    return event.target.matches('button.add-todos');
  }

  handleClick() {
    app.showAddTask();
  }
}


class ShowEditTask {
  static canHandle(event) {
    return event.target.matches('button.todo-edit');
  }

  constructor(event) {
    this.taskIndex = Number(event.target.parentElement.dataset.index);
  }

  handleClick() {
    app.showEditTask(this.taskIndex);
  }
}

class ShowDeleteTask {
  static canHandle(event) {
    return event.target.matches('button.todo-delete');
  }

  constructor(event) {
    this.taskIndex = Number(event.target.parentElement.dataset.index);
  }

  handleClick() {
    app.showDeleteTask(this.taskIndex);
  }
}

class ShowTaskDetails {
  static canHandle(event) {
    return event.target.matches('button.todo-details');
  }

  constructor(event) {
    this.taskIndex = Number(event.target.parentElement.dataset.index);
  }

  handleClick() {
    app.showTaskDetails(this.taskIndex);
  }
}

registerEvent(ShowEditProject);
registerEvent(CancelDialog);
registerEvent(ShowDeleteProject);
registerEvent(ShowAddProject);
registerEvent(ShowAddTask);
registerEvent(ShowEditTask);
registerEvent(ShowDeleteTask);
registerEvent(ShowTaskDetails);