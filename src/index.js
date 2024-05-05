// assets

import 'normalize.css';
import './style.css';
import checkmarkSVG from './images/checkmark.svg';

document.querySelector('.checkmark-svg').src = checkmarkSVG;


// scripts
import './scripts/state';
import { initializeStorage } from './scripts/storage';
import { initializePage } from './scripts/app-logic';
import './scripts/set-events';
import './scripts/examples';

initializePage();