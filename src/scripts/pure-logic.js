class Todo {
  constructor(title, description, dueDate, priority, completed = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
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

  editTodo(todoIndex, newTodoObj) {
    this.#todoItems[todoIndex] = newTodoObj;
  }

  switchComplete(todoIndex) {
    this.#todoItems[todoIndex].completed =
      this.#todoItems[todoIndex].completed ? false : true;
  }

  getTodo(todoIndex) {
    return this.#todoItems[todoIndex];
  }

  getAllTodos() {
    return this.#todoItems;
  }

  changeTitle(newTitle) {
    this.title = newTitle;
  }
}

class ProjectLogic {
  #projects = [];
  #activeIndex = null;

  addProject(projectTitle) {
    this.#projects.push(
      new Project(projectTitle)
    );
  }

  removeProject(projectIndex) {
    if (projectIndex === this.#activeIndex) {
      this.#activeIndex = null;
    }
    this.#projects.splice(projectIndex, 1);
  }

  getProject(projectIndex) {
    return this.#projects[projectIndex];
  }

  getProjects() {
    return this.#projects;
  }

  setProjects(newProjects) {
    return this.#projects = newProjects;
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