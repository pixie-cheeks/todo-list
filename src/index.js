// assets

import 'normalize.css';
import './style.css';
import checkmarkSVG from './images/checkmark.svg';

document.querySelector('.checkmark-svg').src = checkmarkSVG;


// scripts
import './scripts/state';
import './scripts/import-effects'
import { initializeStorage } from './scripts/storage';
import app from './scripts/app-logic';

initializeStorage();
app.initializePage();