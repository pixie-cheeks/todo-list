import { TodoEvents } from './todo-events';
import { format } from 'date-fns';

const todoTemplate = document.querySelector('.todo-template').content.cloneNode(true);
const contentContainer = document.querySelector('.todo-section');

class TodoDOM {
  constructor(project, page) {
    this.project = project;
    this.page = page;
    this.todoContainer = page.querySelector('.todo-container');
    this.addTodoBtn = page.querySelector('.add-btn.add-todos');
  }

  init() {
    this.#render();
    this.#bindEvents();
  }

  addTodo(todoObj) {
    this.project.addTodo(todoObj);
    this.#render();
  }

  removeTodo(todoIndex) {
    this.project.removeTodo(todoIndex);
    this.#render();
  }

  editTodo(todoIndex, newTodoObj) {
    this.project.editTodo(todoIndex, newTodoObj);
    this.#render();
  }

  switchComplete(todoIndex) {
    this.project.switchComplete(todoIndex);
    this.#render();
  }

  #render() {
    this.todoContainer.textContent = '';
    this.project.getAllTodos().forEach((todo, todoIndex) => {
      const todoDiv = this.#createTodoDiv(todo);
      todoDiv.dataset.index = todoIndex;
      this.todoContainer.appendChild(todoDiv);
    });
  }

  #createTodoDiv(todo) {
    const todoDiv = todoTemplate.cloneNode(true).firstElementChild;
    const todoTitle = todoDiv.querySelector('.todo-title');
    const todoDate = todoDiv.querySelector('.todo-date');
    const todoComplete = todoDiv.querySelector('input');


    todoTitle.textContent = todo.title;
    todoDate.textContent = format(todo.dueDate, 'dd MMM');
    todoComplete.checked = todo.completed;
    todoDiv.classList.add(todo.priority);

    if (todo.completed) {
      todoTitle.style.textDecoration = 'line-through';
      todoDiv.classList.add('completed');
    }

    return todoDiv;
  }

  #bindEvents() {
    contentContainer.onclick = event => {
      TodoEvents.for(this, event).handleClick();
    };
  }

}

export { TodoDOM };