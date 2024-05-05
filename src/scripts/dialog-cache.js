function ProjectCache() {
  this.nameDialog = document.querySelector('dialog.project-name');
  this.deleteDialog = document.querySelector('dialog.project-delete');
  this.heading = this.nameDialog.querySelector('.heading');
  this.nameInput = this.nameDialog.querySelector('input[type=text]');
  this.deleteMessage = this.deleteDialog.querySelector('.description');

  this.setDeleteMessage = projectName => {
    this.deleteMessage.innerHTML = (
      `This will permanently delete ` +
      `<span style="font-weight: bold;">"${projectName}"</span>` +
      ` and all its tasks. This can't be undone.`
    );
  };
}

function TaskCache() {
  this.taskInfo = document.querySelector('dialog.todo-info');
  this.taskDetails = document.querySelector('dialog.todo-details');
  this.taskDelete = document.querySelector('dialog.todo-delete');

  this.infoHead = this.taskInfo.querySelector('h3');
  this.infoReset = this.taskInfo.querySelector('button[type=reset]');
  this.inputTitle = this.taskInfo.querySelector('input[type=text]');
  this.inputDescription = this.taskInfo.querySelector('textarea');
  this.inputDate = this.taskInfo.querySelector('input[type=date]');
  this.inputProject = this.taskInfo.querySelector('select');
  this.inputPriorities = Array.from(this.taskInfo.querySelectorAll('input[type=radio'));

  this.deleteMessage = this.taskDelete.querySelector('.description');
  this.setDeleteMessage = taskName => {
    this.deleteMessage.innerHTML = (
      `Are you sure you want to delete ` +
      `<strong>${taskName}</strong>?`
    );
  }

  this.showTitle = this.taskDetails.querySelector('.task-title');
  this.showDescription = this.taskDetails.querySelector('.task-description');
  this.showProjectName = this.taskDetails.querySelector('.project-name .content');
  this.showDate = this.taskDetails.querySelector('.due-date .content');
  this.showPriority = this.taskDetails.querySelector('.priority .content');
}


const projectDom = new ProjectCache();
const taskDom = new TaskCache();

export { projectDom, taskDom };