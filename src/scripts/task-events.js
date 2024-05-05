import registerEvent from "./events";
import app from './app-logic';

class SetTaskCompleted {
  static canHandle(event) {
    return event.target.matches('input[type=checkbox]');
  }

  constructor(event) {
    this.taskIndex = Number(event.target.parentElement.dataset.index);
  }

  handleClick() {
    app.setTaskComplete(this.taskIndex);
  }
}

class AddTask {
  static canHandle(event) {
    return event.target.matches('[data-type=add-task] button.save');
  }

  constructor(event) {
    this.dialog = document.querySelector('dialog[open]');
    this.projectIndex = Number(this.dialog.querySelector('select').value);
    this.titleInput = this.dialog.querySelector('input[type=text]');
    this.description = this.dialog.querySelector('textarea').value;
    this.dueDateInput = this.dialog.querySelector('input[type=date');
    this.priority = Array.from(
      this.dialog.querySelectorAll('input[type=radio]')
    ).find(input => input.checked).value;
  }

  handleClick() {
    const firstInvalid =
      [this.titleInput, this.dueDateInput].find(input => !input.checkValidity());
    if (firstInvalid) {
      firstInvalid.reportValidity();
      return;
    }
    app.addTask(
      this.projectIndex, this.titleInput.value, this.description,
      this.dueDateInput.value, this.priority
    );

    this.dialog.close();
  }
}

class EditTask {
  static canHandle(event) {
    return event.target.matches('[data-type=edit-task] button.save');
  }

  constructor(event) {
    this.dialog = document.querySelector('dialog[open]');
    this.projectIndex = Number(this.dialog.querySelector('select').value);
    this.titleInput = this.dialog.querySelector('input[type=text]');
    this.description = this.dialog.querySelector('textarea').value;
    this.dueDateInput = this.dialog.querySelector('input[type=date');
    this.priority = Array.from(
      this.dialog.querySelectorAll('input[type=radio]')
    ).find(input => input.checked).value;
    this.taskIndex = Number(this.dialog.dataset.index);
    this.taskCompleted = Boolean(Number(this.dialog.dataset.completed));
  }

  handleClick() {
    const firstInvalid =
      [this.titleInput, this.dueDateInput].find(input => !input.checkValidity());
    if (firstInvalid) {
      firstInvalid.reportValidity();
      return;
    }

    app.editTask(
      this.projectIndex, this.taskIndex, this.titleInput.value,
      this.description, this.dueDateInput.value, this.priority,
      this.taskCompleted,
    );

    this.dialog.close();
  }
}

class DeleteTask {
  static canHandle(event) {
    return event.target.matches('.todo-delete button.delete')
  }

  constructor(event) {
    this.dialog = document.querySelector('dialog[open]');
    this.taskIndex = Number(this.dialog.dataset.index);
  }

  handleClick() {
    app.deleteTask(this.taskIndex);
    this.dialog.close();
  }
}

registerEvent(SetTaskCompleted);
registerEvent(AddTask);
registerEvent(EditTask);
registerEvent(DeleteTask);