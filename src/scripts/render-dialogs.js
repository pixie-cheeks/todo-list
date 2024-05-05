import { projectDom, taskDom } from "./dialog-cache";
import { format } from "date-fns";

const dialogs = {
  renderProjectEdit(projectIndex, project) {
    projectDom.heading.textContent = 'Edit Title';
    projectDom.nameInput.value = project.name;
    projectDom.nameDialog.dataset.index = projectIndex;
    projectDom.nameDialog.dataset.type = 'rename';
    projectDom.nameDialog.showModal();
  },
  renderProjectDelete(projectIndex, project) {
    projectDom.deleteDialog.dataset.index = projectIndex;
    projectDom.setDeleteMessage(project.name);
    projectDom.deleteDialog.showModal();
  },
  renderProjectAdd() {
    projectDom.heading.textContent = 'Title';
    projectDom.nameInput.value = '';
    projectDom.nameDialog.dataset.index = null;
    projectDom.nameDialog.dataset.type = 'add';
    projectDom.nameDialog.showModal();
  },
  renderTaskAdd(projects) {
    taskDom.infoHead.textContent = 'Add a New Task';
    taskDom.taskInfo.dataset.type = 'add-task';
    taskDom.infoReset.click();
    taskDom.inputProject.textContent = '';
    taskDom.inputProject.appendChild(getOptions(projects));
    taskDom.taskInfo.showModal();
  },
  renderTaskEdit(projects, task, selectedProjectIndex) {
    taskDom.infoHead.textContent = 'Edit Task';
    taskDom.taskInfo.dataset.type = 'edit-task';
    taskDom.taskInfo.dataset.index = projects[selectedProjectIndex]
      .tasks.indexOf(task);
    taskDom.taskInfo.dataset.completed = task.completed ? 1 : 0;
    taskDom.inputProject.textContent = '';

    populateTaskEdit(task);
    taskDom.inputProject.appendChild(getOptions(projects));
    taskDom.inputProject.selected = selectedProjectIndex;

    taskDom.taskInfo.showModal();
  },
  renderTaskDelete(taskIndex, task) {
    taskDom.taskDelete.dataset.index = taskIndex;
    taskDom.setDeleteMessage(task.title)
    taskDom.taskDelete.showModal();
  },
  renderTaskDetails(task, project) {
    taskDom.showTitle.textContent = task.title;
    taskDom.showDescription.textContent = task.description;
    taskDom.showPriority.textContent = capitalize(task.priority);
    taskDom.showDate.textContent = format(task.dueDate, 'do MMMM yyyy')
    taskDom.showProjectName.textContent = project.name;
    taskDom.taskDetails.showModal();
  }
};

function populateTaskEdit(task) {
  taskDom.inputTitle.value = task.title;
  taskDom.inputDescription.value = task.description;
  taskDom.inputDate.value = task.dueDate;
  taskDom.inputPriorities.find(
    input => input.value === task.priority
  ).checked = true;
}


function getOptions(projects) {
  const fragment = document.createDocumentFragment();

  projects.forEach((project, index) => {
    const option = document.createElement('option');
    option.textContent = project.name;
    option.value = index;
    option.selected = project.selected;
    fragment.append(option);
  })

  return fragment;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default dialogs;