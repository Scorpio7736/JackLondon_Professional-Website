import { el, preferredImage, rarityClass, visibleName, alertDialog } from "../util.js";
import { formatDropChance } from "../services/scryfall.js";
import { collection } from "../services/collection.js";
import { sound } from "../services/sound.js";
import { hideOverlay, showOverlay, rerender } from "../app.js";

export function showCardDetail(card) {
  let face = 0;
  const overlay = el(`
    <div class="sheet-backdrop">
      <article class="sheet card-detail rarity-${rarityClass(card.rarity)}">
        <header class="sheet-header">
          <button type="button" class="text-btn" data-close>Close</button>
          <div class="header-actions">
            <button type="button" class="text-btn danger" data-delete>Delete</button>
            <button type="button" class="text-btn" data-share>Share</button>
          </div>
        </header>
        <h2 data-name></h2>
        <p class="rarity-label" data-rarity></p>
        <img class="card-art" data-art alt="" />
        <div class="reveal-actions">
          <button type="button" class="btn btn-dark" data-flip>Flip</button>
        </div>
      </article>
    </div>
  `);

  const nameEl = overlay.querySelector("[data-name]");
  const rarityEl = overlay.querySelector("[data-rarity]");
  const artEl = overlay.querySelector("[data-art]");
  const flipBtn = overlay.querySelector("[data-flip]");

  const paint = () => {
    nameEl.textContent = visibleName(card, face);
    const chance = formatDropChance(card.dropChance);
    rarityEl.textContent = chance ? `${card.rarity} · ${chance}` : card.rarity;
    artEl.src = preferredImage(card, face);
    artEl.alt = visibleName(card, face);
    const canFlip = (card.faces?.length ?? 0) > 1;
    flipBtn.hidden = !canFlip;
  };

  overlay.querySelector("[data-close]").addEventListener("click", hideOverlay);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) hideOverlay();
  });

  flipBtn.addEventListener("click", () => {
    if ((card.faces?.length ?? 0) <= 1) return;
    sound.playFlip();
    face = (face + 1) % card.faces.length;
    paint();
  });

  overlay.querySelector("[data-share]").addEventListener("click", async () => {
    const quoted = encodeURIComponent(`"${visibleName(card, face)}"`);
    const url = `https://scryfall.com/search?q=%21${quoted}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: visibleName(card, face), url });
      } else {
        await navigator.clipboard.writeText(url);
        await alertDialog("Link copied", "Scryfall link copied to the clipboard.");
      }
    } catch {
      /* user cancelled share */
    }
  });

  overlay.querySelector("[data-delete]").addEventListener("click", async () => {
    const max = collection.count(card);
    if (max <= 0) {
      await alertDialog("Couldn’t delete", "We couldn’t find copies of this card in your collection.");
      return;
    }
    const picker = el(`
      <div class="modal-backdrop">
        <div class="modal">
          <p>Delete copies of</p>
          <h2>${visibleName(card, face)}</h2>
          <label class="field">
            <span>Quantity</span>
            <select data-qty></select>
          </label>
          <div class="modal-actions">
            <button type="button" class="btn btn-dark" data-cancel>Cancel</button>
            <button type="button" class="btn btn-danger" data-ok>Delete</button>
          </div>
        </div>
      </div>
    `);
    const select = picker.querySelector("[data-qty]");
    for (let i = 1; i <= max; i += 1) {
      const option = document.createElement("option");
      option.value = String(i);
      option.textContent = `×${i}`;
      select.appendChild(option);
    }
    picker.querySelector("[data-cancel]").addEventListener("click", () => picker.remove());
    picker.querySelector("[data-ok]").addEventListener("click", () => {
      const removed = collection.delete(card, Number(select.value));
      picker.remove();
      if (removed > 0 && collection.count(card) === 0) {
        hideOverlay();
        rerender();
      }
    });
    overlay.appendChild(picker);
  });

  paint();
  showOverlay(overlay);
}
