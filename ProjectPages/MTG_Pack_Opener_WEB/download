import { el, escapeHtml } from "../util.js";
import { collection } from "../services/collection.js";
import { profiles } from "../services/profiles.js";
import { showCardDetail } from "./cardDetail.js";

export function renderCollection(state) {
  const items = collection.sorted();
  const username = profiles.active()?.username || "My";
  const isGrid = state.collectionMode === "grid";

  const view = el(`
    <section class="collection-view">
      <header class="collection-header">
        <h1 class="title-pill collection-title">${escapeHtml(username)}’s Cards</h1>
      </header>
      <div class="collection-body"></div>
    </section>
  `);

  const body = view.querySelector(".collection-body");
  if (!items.length) {
    body.innerHTML = `
      <div class="empty-state">
        <h2>${collection.emptyTitle}</h2>
        <p>${collection.emptySubtitle}</p>
      </div>
    `;
  } else if (isGrid) {
    const grid = el(`<div class="card-grid"></div>`);
    for (const item of items) {
      const tile = el(`
        <button type="button" class="grid-tile">
          <img src="${collection.thumb(item)}" alt="${escapeHtml(collection.displayName(item))}" />
        </button>
      `);
      tile.addEventListener("click", () => showCardDetail(item.card));
      grid.appendChild(tile);
    }
    body.appendChild(grid);
  } else {
    const list = el(`<div class="card-list"></div>`);
    for (const item of items) {
      const row = el(`
        <button type="button" class="list-row">
          <img src="${collection.thumb(item)}" alt="" />
          <div>
            <strong>${escapeHtml(collection.displayName(item))}</strong>
            <span>×${item.count}</span>
          </div>
        </button>
      `);
      row.addEventListener("click", () => showCardDetail(item.card));
      list.appendChild(row);
    }
    body.appendChild(list);
  }

  return view;
}
