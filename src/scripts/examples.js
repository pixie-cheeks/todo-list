import { project, task } from "./state-controller";

function loadExamples() {
  project.add('Calculator Project');

  task.add(
    0,
    'Import the Big.js library',
    'It would be a pain to implement all the proper math functionality by myself, so using an external library would be great.',
    '2024-04-04',
    'medium',
  )

  task.add(
    0,
    'Make the buttons look good',
    'I like it when the buttons go down when I click \'em.',
    '2024-04-03',
    'low',
    true,
  )

  task.add(
    0,
    'Initialize repo with GitHub',
    'Initializing the repository locally would take far too many steps. Better to just initialize it on GitHub and then clone it locally.',
    '2024-04-02',
    'high',
    true,
  )


  project.add('Library Project');

  task.add(
    1,
    'Finish going through all the resources',
    'Before I do the project I need to make sure I have all the tools under my belt. I have to read through all the docs and watch all the tutorials that I have been given by Zorin.',
    '2024-04-12',
    'low',
  )

  task.add(
    1,
    'Learn about JS form validation',
    'In order to meet the requirements of the project, I have to learn about the form validation methods that are used in JavaScript.',
    '2024-04-14',
    'high',
    true,
  )

  project.setSelected(0);
}

export default loadExamples;