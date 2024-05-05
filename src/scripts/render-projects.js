const projectsBar = document.querySelector('.projects');
const projectTemplate = document.querySelector('.projects-template').content
  .firstElementChild.cloneNode(true);

function renderProjects(projects) {
  const fragment = document.createDocumentFragment();
  projectsBar.textContent = '';

  projects.forEach((project, index) => {
    const div = createProjectDiv(project, index);
    fragment.appendChild(div);
  });

  projectsBar.appendChild(fragment);
}

function styleIfSelected(isSelected, projectDiv) {
  if (!isSelected) return;

  projectDiv.classList.add('focused-project');
}


function createProjectDiv(project, index) {
  const projectDiv = projectTemplate.cloneNode(true);
  const titleInsideDiv = projectDiv.querySelector('.item__name');

  styleIfSelected(project.selected, projectDiv)

  titleInsideDiv.textContent = project.name;
  projectDiv.dataset.index = index;

  return projectDiv;
}

export default renderProjects;