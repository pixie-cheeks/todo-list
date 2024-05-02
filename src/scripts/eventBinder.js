class EventBinder {
  #listenerList = [];
  addListener(element, event, listener) {
    this.#listenerList.push({
      element,
      event,
      listener,
    });
    element.addEventListener(event, listener);
  }

  removeAllListeners() {
    this.#listenerList.forEach(listenerArgs => {
      listenerArgs.element.removeEventListener(
        listenerArgs.event, listenerArgs.listener
      );
    });
  }
}

export default EventBinder;