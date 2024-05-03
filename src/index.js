import 'normalize.css';
import './style.css';
import projectsController from './scripts/project-handler.js';
import './scripts/todo-handler.js';
import { projectLogic, Todo } from './scripts/pure-logic.js';
import { contentSwitcher } from './scripts/project-tabs.js';
import checkmarkSVG from './images/checkmark.svg';

const checkmarkDOM = document.querySelector('.checkmark-svg');

checkmarkDOM.src = checkmarkSVG;

projectsController.addProject('My Project');
projectsController.addProject('My Project Two');

const todoMan = new Todo('hello', 'sdsffsd', '2024-01-05', 'high')
todoMan.completed = true;

projectLogic.getProject(0).addTodo(new Todo('Task 1', 'Big Task', '2024-05-02', 'low'));
projectLogic.getProject(0).addTodo(new Todo('Task 2', 'Big Task', '2024-05-02', 'low'));
projectLogic.getProject(0).addTodo(new Todo('Task 3', 'Big Task', '2024-05-02', 'low'));
projectLogic.getProject(0).addTodo(new Todo('Task 4', 'Big Task', '2024-05-02', 'low'));
projectLogic.getProject(0).addTodo(todoMan);

contentSwitcher.selectProject(0);