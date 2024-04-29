class Todo {
  completed = false;

  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

class Project {
  #todoItems = [];

  constructor(title, active = false) {
    this.title = title;
    this.active = active;
  }

  addTodo(todoObj) {
    this.#todoItems.push(todoObj);
  }

  removeTodo(todoIndex) {
    this.#todoItems.splice(todoIndex, 1);
  }

  getTodo(todoIndex) {
    return this.#todoItems[todoIndex];
  }

  changeTitle(newTitle) {
    this.title = newTitle;
  }
}

class ProjectLogic {
  #projects = [];
  #activeIndex;

  addProject(projectTitle) {
    const projectsLength = this.#projects.push(
      new Project(projectTitle)
    );

    this.#activeIndex = projectsLength - 1;
  }

  removeProject(projectIndex) {
    this.#projects.splice(projectIndex, 1);
  }

  getProject(projectIndex) {
    return this.#projects[projectIndex];
  }

  getProjects() {
    return this.#projects;
  }

  renameProject(projectIndex, newTitle) {
    this.#projects[projectIndex].changeTitle(newTitle);
  }

  setActiveIndex(projectIndex) {
    this.#activeIndex = projectIndex;
  }

  getActiveIndex() {
    return this.#activeIndex;
  }
}

const projectLogic = new ProjectLogic();

export { projectLogic, Todo, Project };