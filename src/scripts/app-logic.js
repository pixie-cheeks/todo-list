import { getState } from "./state";
import { task, project } from './state-controller';
import renderProjects from "./render-projects";
import { renderMain, renderTasks } from "./render-main";

function initializePage() {
  renderProjects(getState().projects);
  renderMain(project.getSelected());
}

function selectProject(projectIndex) {
  project.setSelected(projectIndex);
  renderProjects(getState().projects);
  renderMain(project.get(projectIndex));
}


export { selectProject, initializePage };