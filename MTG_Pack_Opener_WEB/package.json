import { el } from "../util.js";
import { renderPack } from "./pack.js";
import { renderCollection } from "./collection.js";
import { renderSettings } from "./settings.js";

export function renderMain(state, { setTab, setCollectionMode }) {
  const view = el(`
    <section class="screen main">
      <div class="main-content" data-content></div>
      ${state.tab === 1 ? `
        <button type="button" class="fab" data-toggle aria-label="${state.collectionMode === "grid" ? "Switch to list view" : "Switch to grid view"}">
          <img src="${state.collectionMode === "grid" ? "/assets/icons/list.png" : "/assets/icons/grid.png"}" alt="" />
        </button>
      ` : ""}
      <nav class="tab-bar" aria-label="Main">
        <button type="button" class="tab ${state.tab === 0 ? "selected" : ""}" data-tab="0">
          <img src="/assets/icons/packs.png" alt="" />
          <span>Packs</span>
        </button>
        <button type="button" class="tab ${state.tab === 1 ? "selected" : ""}" data-tab="1">
          <img src="/assets/icons/cards.png" alt="" />
          <span>Cards</span>
        </button>
        <button type="button" class="tab ${state.tab === 2 ? "selected" : ""}" data-tab="2">
          <img src="/assets/icons/settings.png" alt="" />
          <span>Settings</span>
        </button>
      </nav>
    </section>
  `);

  const content = view.querySelector("[data-content]");
  if (state.tab === 0) content.appendChild(renderPack());
  else if (state.tab === 1) content.appendChild(renderCollection(state));
  else content.appendChild(renderSettings());

  view.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => setTab(Number(button.dataset.tab)));
  });

  view.querySelector("[data-toggle]")?.addEventListener("click", () => {
    setCollectionMode(state.collectionMode === "grid" ? "list" : "grid");
  });

  return view;
}
