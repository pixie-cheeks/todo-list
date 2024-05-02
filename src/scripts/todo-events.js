import { projectLogic, Todo } from './pure-logic';
import { todoDialogs } from './dialog-manager';
import EventBinder from './eventBinder';

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
  constructor(todoController, event) {
    this.todoController = todoController;
    this.event = event;
    this.todoIndex = event.target.parentElement.dataset.index;
    this.addDialog = todoDialogs.add;
  }

  static canHandle(event) {
    return event.target.matches('.add-todos');
  }

  handleClick() {
    this.addDialog.showModal();
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

class EditEvent {
  constructor(todoController, event) {
    this.todoController = todoController;
    this.event = event;
    this.todoIndex = event.target.parentElement.dataset.index;
  }

  static canHandle(event) {
    return event.target.matches('.todo-edit');
  }

  handleClick() {
    alert('clicked the edit button');
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