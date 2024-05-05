const eventClasses = [];
document.addEventListener('click', checkClickTarget);

function checkClickTarget(event) {
  const handlerClass = eventClasses
    .find(eventClass => eventClass.canHandle(event));

  new handlerClass(event).handleClick();
}

function registerEvent(eventClass) {
  eventClasses.unshift(eventClass);
}

class Default {
  static canHandle(event) {
    return true;
  }

  handleClick() {
    return;
  }
}

registerEvent(Default);

export default registerEvent;