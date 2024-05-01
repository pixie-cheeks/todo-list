import { projectLogic } from "./pure-logic";

const addTodoBtn = content.querySelector('.add-btn.add-todos');
const todoTemplate = document.querySelector('.todo-template').cloneNode(true);


class TodoDOM {
  constructor(project, page) {
    this.project = project;
    this.todoContainer = page.querySelector('.todo-container');
    this.addTodoBtn = page.querySelector('.add-btn.add-todos');
  }

  init() {
    this.#bindEvents();
    this.#render();
  }

  #render() {
    this.todoContainer.textContent = '';
    this.project.getAllTodos().forEach(todo => {
      const todoDiv = this.#createTodoDiv(todo);
      this.todoContainer.appendChild(todoDiv);
    });
  }

  #createTodoDiv(todo) {
    const todoDiv = todoTemplate.cloneNode(true);
    const todoTitle = todoDiv.querySelector('.todo-title');
    const todoDate = todoDiv.querySelector('.todo-date');
    const todoComplete = todoDiv.querySelector('input');

    todoTitle.textContent = todo.title;
    todoDate.textContent = todo.date;
    todoComplete.value = todo.complete;

    return todoDiv;
  }

  #bindEvents() {
    this.page.addEventListener('click', event => {
      if (!(event.target.matches('button'))) return;
      TodoEvents.for(this, event);
    });
  }

}

export { TodoDOM };