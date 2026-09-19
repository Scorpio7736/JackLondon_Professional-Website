import "./styles.css";
import { bindRender, render, state, setTab, setCollectionMode } from "./app.js";
import { renderSplash } from "./views/splash.js";
import { renderProfiles } from "./views/profiles.js";
import { renderMain } from "./views/main.js";
import { sound } from "./services/sound.js";
import { migrateLegacySetCaches } from "./services/storage.js";

function paint() {
  const root = document.getElementById("app");
  root.dataset.stage = state.stage;
  if (state.stage === "splash") {
    root.replaceChildren(renderSplash());
  } else if (state.stage === "profiles") {
    root.replaceChildren(renderProfiles({ allowSkip: true }));
  } else {
    root.replaceChildren(renderMain(state, { setTab, setCollectionMode }));
  }
}

bindRender(paint);

migrateLegacySetCaches();

window.addEventListener("profiles-changed", () => {
  if (state.stage === "main") render();
});

window.addEventListener("collection-changed", () => {
  if (state.stage === "main" && state.tab === 1) render();
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) sound.music.pause();
  else if (sound.musicEnabled) sound.startMusic();
});

paint();
