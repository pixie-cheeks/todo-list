import { getState } from "./state";
import { updateStorage } from './storage';
import { format } from "date-fns";

const projects = getState().projects;

function getTasks(projectIndex) {
  return getState().projects[projectIndex].tasks
}


// project methods
const project = {
  create(name) {
    return {
      name,
      selected: false,
      tasks: [],
    };
  },
  add(name) {
    projects.push(this.create(name));
    updateStorage();
  },
  rename(projectIndex, name) {
    projects[projectIndex].name = name;
    updateStorage();
  },
  remove(projectIndex) {
    projects.splice(projectIndex, 1);

    if (projectIndex === this.getSelectedIndex()) {
      this.setSelected(null);
      return;
    }

    updateStorage();
  },
  getSelected() {
    const selectedProject = projects.find(project => project.selected);

    return selectedProject ? selectedProject : null;
  },
  getSelectedIndex() {
    return getState().selectedProjectIndex;
  },
  setSelected(projectIndex) {
    const alreadySelected = this.getSelected();
    if (alreadySelected) {
      alreadySelected.selected = false;
    }

    if (projectIndex !== null) {
      projects[projectIndex].selected = true;
    }

    getState().selectedProjectIndex = projectIndex;

    updateStorage();
  },
  get(projectIndex) {
    return projects[projectIndex];
  }
};

// task methods
const task = {
  create(title, description, dueDate, priority, completed = false) {
    return {
      title,
      description,
      dueDate: format(dueDate, 'dd MMM'),
      priority,
      completed,
    };
  },
  add(projectIndex, ...taskProperties) {
    getTasks(projectIndex).push(this.create(...taskProperties));

    updateStorage();
  },
  replace(projectIndex, taskIndex, newTask) {
    getTasks(projectIndex)[taskIndex] = newTask;
    updateStorage();
  },
  setCompleted(projectIndex, taskIndex, completed) {
    getTasks(projectIndex)[taskIndex].completed = completed;
    updateStorage();
  },
  remove(projectIndex, taskIndex) {
    getTasks(projectIndex).splice(taskIndex, 1);
    updateStorage();
  },
  get(projectIndex, taskIndex) {
    return getTasks(projectIndex)[taskIndex];
  },
};

export { project, task };