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

  constructor(title) {
    this.title = title;
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

  addProject(projectTitle) {
    this.#projects.push(
      new Project(projectTitle)
    );
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
}

export { ProjectLogic, Todo, Project };