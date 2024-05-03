import projectsController from './project-handler.js';
import { projectLogic, Todo } from './pure-logic.js';
import { contentSwitcher } from './project-tabs.js';

/* if (localStorage.length === 0) {
  initialize();
} else {
  initializeFromStorage();
} */

initialize();
// localStorage.setItem('projects', JSON.stringify(projectLogic.getProjects()));
// console.log(localStorage.getItem('projects'));
if (projectLogic.getProjects().length !== 0) {
  contentSwitcher.selectProject(0);
}

function initialize() {
  projectsController.addProject('Calculator Project');

  projectLogic.getProject(0).addTodo(
    new Todo(
      'Import the Big.js library',
      'It would be a pain to implement all the proper math functionality by myself, so using an external library would be great.',
      '2024-04-04',
      'medium',
    )
  );
  projectLogic.getProject(0).addTodo(
    new Todo(
      'Make the buttons look good',
      'I like it when the buttons go down when I click \'em.',
      '2024-04-03',
      'low',
      true,
    )
  );
  projectLogic.getProject(0).addTodo(
    new Todo(
      'Initialize repo with GitHub',
      'Initializing the repository locally would take far too many steps. Better to just initialize it on GitHub and then clone it locally.',
      '2024-04-02',
      'high',
      true,
    )
  );

  projectsController.addProject('Library Project');

  projectLogic.getProject(1).addTodo(
    new Todo(
      'Finish going through all the resources',
      'Before I do the project I need to make sure I have all the tools under my belt. I have to read through all the docs and watch all the tutorials that I have been given by Zorin.',
      '2024-04-12',
      'low',
    )
  );
  projectLogic.getProject(1).addTodo(
    new Todo(
      'Learn about JS form validation',
      'In order to meet the requirements of the project, I have to learn about the form validation methods that are used in JavaScript.',
      '2024-04-14',
      'high',
      true,
    )
  );
}

function initializeFromStorage() {
  projectLogic.setProjects(localStorage.getItem('projects'));
}