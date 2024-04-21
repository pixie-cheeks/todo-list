const dialog = document.querySelector('dialog');
const addTaskBtn = document.querySelector('button');

addTaskBtn.addEventListener('click', showDialog);

function showDialog() {
  dialog.showModal();
}