import 'normalize.css';
import './style.css';
import './scripts/todo-handler.js';
import './scripts/load-projects.js';
import checkmarkSVG from './images/checkmark.svg';

const checkmarkDOM = document.querySelector('.checkmark-svg');

checkmarkDOM.src = checkmarkSVG;