const projectDialogs = {
  add: document.querySelector('dialog.project-add'),
  delete: document.querySelector('dialog.project-delete'),
  edit: document.querySelector('dialog.project-edit'),
};

const todoDialogs = {
  add: document.querySelector('dialog.todo-add'),
  delete: document.querySelector('dialog.todo-delete'),
  edit: document.querySelector('dialog.todo-edit'),
  detail: document.querySelector('dialog.todo-detail'),
};

class DialogProjects {
  deleteBtn = this.deleteDialog.querySelector('button.delete');
  cancelBtn = this.deleteDialog.querySelector('button.cancel');
}

export { projectDialogs, todoDialogs };