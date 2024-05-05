// assets

import 'normalize.css';
import './style.css';
import checkmarkSVG from './images/checkmark.svg';

document.querySelector('.checkmark-svg').src = checkmarkSVG;


// scripts
import './scripts/state';
import { initializeStorage } from './scripts/storage';
import app from './scripts/app-logic';
import './scripts/events';
import './scripts/examples';
import './scripts/import-effects'

app.initializePage();