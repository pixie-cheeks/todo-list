
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
  todoItems = [];

  constructor(title) {
    this.title = title;
  }

  addTodo(todoObj) {
    this.todoItems.push(todoObj);
  }

  removeTodo(todoIndex) {
    this.todoItems.splice(todoIndex, 1);
  }

  changeTitle(newTitle) {
    this.title = newTitle;
  }
}

const projects = [];

const projectHandler = {
  addProject(projectObj) {
    projects.push(projectObj);
  },
  removeProject(projectIndex) {
    projects.splice(projectIndex, 1);
  }
};


export { projectHandler, Todo, Project };