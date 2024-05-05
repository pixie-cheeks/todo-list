import { getState } from "./state";
import { updateStorage } from './storage';

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
    getState().projects.push(this.create(name));
    updateStorage(getState());
  },
  rename(projectIndex, name) {
    getState().projects[projectIndex].name = name;
    updateStorage(getState());
  },
  remove(projectIndex) {
    getState().projects.splice(projectIndex, 1);

    if (projectIndex === this.getSelectedIndex()) {
      this.setSelected(null);
      return;
    }

    updateStorage(getState());
  },
  getSelected() {
    const selectedProject = getState().projects.find(project => project.selected);

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
      getState().projects[projectIndex].selected = true;
    }

    getState().selectedProjectIndex = projectIndex;

    updateStorage(getState());
  },
  get(projectIndex) {
    return getState().projects[projectIndex];
  }
};

// task methods
const task = {
  create(title, description, dueDate, priority, completed = false) {
    return {
      title,
      description,
      dueDate,
      priority,
      completed,
    };
  },
  add(projectIndex, ...taskProperties) {
    getTasks(projectIndex).push(this.create(...taskProperties));

    updateStorage(getState());
  },
  replace(projectIndex, taskIndex, ...newTaskProperties) {
    getTasks(projectIndex)[taskIndex] = this.create(...newTaskProperties);
    updateStorage(getState());
  },
  switchCompleted(projectIndex, taskIndex) {
    const task = getTasks(projectIndex)[taskIndex];
    task.completed = task.completed ? false : true;
    updateStorage(getState());
  },
  remove(projectIndex, taskIndex) {
    getTasks(projectIndex).splice(taskIndex, 1);
    updateStorage(getState());
  },
  get(projectIndex, taskIndex) {
    return getTasks(projectIndex)[taskIndex];
  },
};

export { project, task };