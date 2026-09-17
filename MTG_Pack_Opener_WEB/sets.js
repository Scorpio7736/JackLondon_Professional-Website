export const state = {
  stage: "splash",
  tab: 0,
  collectionMode: "grid",
};

let renderer = () => {};

export function bindRender(fn) {
  renderer = fn;
}

export function render() {
  renderer();
}

export function rerender() {
  renderer();
}

export function setStage(stage) {
  if (stage === "main" && state.stage !== "main") {
    state.tab = 0;
  }
  state.stage = stage;
  renderer();
}

export function setTab(tab) {
  state.tab = tab;
  renderer();
}

export function setCollectionMode(mode) {
  state.collectionMode = mode;
  renderer();
}

export function showOverlay(node) {
  const root = document.getElementById("overlay");
  root.replaceChildren(node);
  root.hidden = false;
}

export function hideOverlay() {
  const root = document.getElementById("overlay");
  root.replaceChildren();
  root.hidden = true;
}
