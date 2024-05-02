import { projectLogic, Todo } from './pure-logic';
import { todoDialogs } from './dialog-manager';
import EventBinder from './eventBinder';
import projectsController from './project-handler';

class TodoEvents {
  static registry = [];
  static register(eventClass) {
    TodoEvents.registry.unshift(eventClass);
  }
  static for(todoController, event) {
    const handlerClass = TodoEvents.registry.find(
      eventClass => eventClass.canHandle(event)
    );

    return new handlerClass(todoController, event);
  }
}

class DefaultEvent {
  constructor(todoController, event) {
    this.todoController = todoController;
    this.event = event;
    this.todoIndex = event.target.parentElement.dataset.index;
  }

  static canHandle(event) {
    return true;
  }

  handleClick() {
    return;
  }
}

class CompleteEvent {
  constructor(todoController, event) {
    this.todoController = todoController;
    this.event = event;
    this.todoIndex = event.target.parentElement.dataset.index;
  }

  static canHandle(event) {
    return event.target.matches('input[type=checkbox]');
  }

  handleClick() {
    console.log(this.todoIndex);
    this.todoController.switchComplete(this.todoIndex);
  }
}

class AddEvent {
  constructor(todoController) {
    this.todoController = todoController;
    this.dialog = todoDialogs.add;
    this.eventBinder = new EventBinder();
    this.resetBtn = this.dialog.querySelector('button[type=reset]');
    this.cancelBtn = this.dialog.querySelector('button.cancel');
    this.saveBtn = this.dialog.querySelector('button.save');

    this.titleDiv = this.dialog.querySelector('#title');
    this.descriptionDiv = this.dialog.querySelector('#description');
    this.dateDiv = this.dialog.querySelector('#due-date');
    this.priorities = Array.from(
      this.dialog.querySelectorAll('input[type=radio]')
    );
    this.inputFields = [this.titleDiv, this.dateDiv, this.descriptionDiv];
  }

  static canHandle(event) {
    return event.target.matches('.add-todos');
  }

  handleClick() {
    this.showDialog();
  }

  showDialog() {
    this.bindEvents();
    this.dialog.showModal();
  }

  resetDialog() {
    this.resetBtn.click();
    this.eventBinder.removeAllListeners();
  }

  closeDialog() {
    this.dialog.close();
  }

  actionWhenSave() {
    this.addTodo();
  }

  addTodo() {
    this.todoController.addTodo(this.valuesToObject());;
  }

  valuesToObject() {
    const priority = this.priorities.find(elem => elem.checked);

    return new Todo(
      this.titleDiv.value,
      this.descriptionDiv.value,
      this.dateDiv.value,
      priority.value,
    );
  }

  bindEvents() {
    this.eventBinder.addListener(this.dialog, 'close', () => {
      this.resetDialog();
    });

    this.eventBinder.addListener(this.cancelBtn, 'click', () => {
      this.closeDialog();
    });

    this.eventBinder.addListener(this.saveBtn, 'click', () => {
      const firstInvalid = this.inputFields.find(
        elem => !elem.checkValidity()
      );
      if (Boolean(firstInvalid)) {
        firstInvalid.reportValidity();
        return;
      }

      this.actionWhenSave();
      this.closeDialog();
    });
  }
}

class ShowEvent {
  constructor(todoController, event) {
    this.todoController = todoController;
    this.event = event;
    this.todoIndex = event.target.parentElement.dataset.index;
  }

  static canHandle(event) {
    return event.target.matches('.todo-details');
  }

  handleClick() {
    alert('clicked the eye button');
  }
}

class EditEvent extends AddEvent {
  constructor(todoController, event) {
    super(todoController);
    this.todoIndex = event.target.parentElement.dataset.index;
    this.todoObj = this.todoController.project.getTodo(this.todoIndex);
    this.dialogHead = this.dialog.querySelector('h3');
  }

  static canHandle(event) {
    return event.target.matches('.todo-edit');
  }

  handleClick() {
    this.renderDialog();
    this.showDialog();
  }

  actionWhenSave() {
    this.editTodo();
  }

  editTodo() {
    this.todoController.editTodo(this.todoIndex, this.valuesToObject());
  }

  resetDialog() {
    this.dialogHead.textContent = 'Add a New Task';
    this.resetBtn.click();
    this.eventBinder.removeAllListeners();
  }

  renderDialog() {
    this.dialogHead.textContent = 'Edit Task';
    this.objectToValues();
  }

  objectToValues() {
    this.titleDiv.value = this.todoObj.title;
    this.descriptionDiv.value = this.todoObj.description;
    this.dateDiv.value = this.todoObj.dueDate;

    this.priorities.find(
      elem => elem.value === this.todoObj.priority
    ).checked = true;
  }

}

class DeleteEvent {
  constructor(todoController, event) {
    this.todoController = todoController;
    this.todoIndex = event.target.parentElement.dataset.index;
    this.deleteDialog = todoDialogs.delete;
    this.descriptionDiv = this.deleteDialog.querySelector('.description');
    this.cancelBtn = this.deleteDialog.querySelector('button.cancel');
    this.deleteBtn = this.deleteDialog.querySelector('button.delete');
    this.todo = projectLogic.getProject(projectLogic.getActiveIndex())
      .getTodo(this.todoIndex);
    this.eventBinder = new EventBinder();
  }

  static canHandle(event) {
    return event.target.matches('.todo-delete');
  }

  handleClick() {
    this.showDialog();
  }

  showDialog() {
    this.renderDialog();
    this.bindEvents();
    this.deleteDialog.showModal();
  }

  closeDialog() {
    this.eventBinder.removeAllListeners();
    this.deleteDialog.close();
  }

  deleteTodo() {
    this.todoController.removeTodo(this.todoIndex);
    this.closeDialog();
  }

  renderDialog() {
    this.descriptionDiv.innerHTML = (
      `Are you sure you want to delete ` +
      `<strong>${this.todo.title}</strong>?`
    );
  }

  bindEvents() {
    this.eventBinder.addListener(this.deleteDialog, 'keydown', event => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      this.closeDialog();
    });

    this.eventBinder.addListener(this.cancelBtn, 'click', () => {
      this.closeDialog();
    });

    this.eventBinder.addListener(this.deleteBtn, 'click', () => {
      this.deleteTodo();
    });

  }
}


TodoEvents.register(DefaultEvent);
TodoEvents.register(CompleteEvent)
TodoEvents.register(AddEvent);
TodoEvents.register(ShowEvent)
TodoEvents.register(EditEvent)
TodoEvents.register(DeleteEvent)

export { TodoEvents };