import { setState, getState } from "./state";
import loadExamples from './examples';

function retrieveStorage() {
  return JSON.parse(localStorage.getItem('state'));
}

function updateStorage(newContent) {
  localStorage.setItem('state', JSON.stringify(newContent));
}

function initializeStorage() {
  if (localStorage.length === 0) {
    loadExamples()
    return;
  };
  setState(retrieveStorage());

}

export { initializeStorage, updateStorage };