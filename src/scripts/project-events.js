import registerEvent from "./events";
import app from './app-logic';

class SwitchProject {
  static canHandle(event) {
    return event.target.matches('.projects__item');
  }

  constructor(event) {
    this.projectIndex = Number(event.target.dataset.index);
  }

  handleClick() {
    app.selectProject(this.projectIndex);
  }
}

class RenameProject {
  static canHandle(event) {
    return event.target.matches('dialog[data-type=rename] button.save');
  }

  constructor(event) {
    this.dialog = document.querySelector('dialog[open]');
    this.projectIndex = Number(this.dialog.dataset.index);
    this.newName = this.dialog.querySelector('input').value
  }

  handleClick() {
    if (this.newName.trim() !== '') {
      app.renameProject(this.projectIndex, this.newName);
    }
    this.dialog.close();
  }
}


class DeleteProject {
  static canHandle(event) {
    return event.target.matches('dialog.project-delete button.delete');
  }

  constructor(event) {
    this.dialog = document.querySelector('dialog[open]');
    this.projectIndex = Number(this.dialog.dataset.index);
  }

  handleClick() {
    app.deleteProject(this.projectIndex);
    this.dialog.close();
  }
}


class AddProject {
  static canHandle(event) {
    return event.target.matches('dialog[data-type=add] button.save');
  }

  constructor(event) {
    this.dialog = document.querySelector('dialog[open]');
    this.projectName = this.dialog.querySelector('input').value;
  }

  handleClick() {
    if (this.projectName.trim() !== '') {
      app.addProject(this.projectName);
    }

    this.dialog.close();
  }
}

registerEvent(SwitchProject);
registerEvent(RenameProject);
registerEvent(DeleteProject);
registerEvent(AddProject);