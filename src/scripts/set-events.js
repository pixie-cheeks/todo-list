import { selectProject } from "./app-logic";

const eventClasses = [];
document.addEventListener('click', checkClickTarget);

function checkClickTarget(event) {
  const handlerClass = eventClasses
    .find(eventClass => eventClass.canHandle(event));

  new handlerClass(event).handleClick();
}

class Default {
  static canHandle(event) {
    return true;
  }

  handleClick() {
    return;
  }
}

class SwitchProject {
  static canHandle(event) {
    return event.target.matches('.projects__item');
  }

  constructor(event) {
    this.projectIndex = Number(event.target.dataset.index);
  }

  handleClick() {
    selectProject(this.projectIndex);
  }
}


eventClasses.unshift(Default);
eventClasses.unshift(SwitchProject);