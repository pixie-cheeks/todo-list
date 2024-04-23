const parentDiv = document.querySelector('.projects');
const template = document.querySelector('.projects-template')
  .content.firstElementChild;

function createProject(title) {
  const projectDiv = template.cloneNode(true);
  const titleInDiv = projectDiv.querySelector('.item__name');

  titleInDiv.textContent = title;

  return projectDiv;
}

function addProjects(...titles) {
  titles.forEach(title => {
    parentDiv.appendChild(
      createProject(title)
    );
  });
}


addProjects('Brown', 'Blue', 'new stuff');