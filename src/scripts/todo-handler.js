import eyeSVG from '../images/eye.svg';

const parentDiv = document.querySelector('.todo-container');
const todoTemplate = document.querySelector('.todo-template')
  .content.firstElementChild;

function addTodo(title) {
  const todo = todoTemplate.cloneNode(true);
  const titleDiv = todo.querySelector('.todo-title');

  titleDiv.textContent = title;

  parentDiv.append(todo);
}

function addMultipleTodos(...titles) {
  titles.forEach(title => addTodo(title));
}

addMultipleTodos('first man standing', 'Second', '', 'Fourth');