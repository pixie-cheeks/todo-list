import 'normalize.css';
import './style.css';
import './scripts/project-handler.js';
import './scripts/todo-handler.js';
import './scripts/pure-logic.js';
import checkmarkSVG from './images/checkmark.svg';

const checkmarkDOM = document.querySelector('.checkmark-svg');

checkmarkDOM.src = checkmarkSVG;