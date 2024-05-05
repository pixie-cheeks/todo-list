let state = { selectedProjectIndex: null, projects: [], };

function setState(newState) {
  state = newState;
}

function getState() {
  return state;
}

export { setState, getState };