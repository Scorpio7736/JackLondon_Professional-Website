import { el, formatMarkdownish } from "../util.js";
import { hideOverlay, showOverlay } from "../app.js";

export async function showInfoSheet(title, url, headings) {
  const overlay = el(`
    <div class="sheet-backdrop">
      <article class="sheet info-sheet">
        <header class="sheet-header">
          <button type="button" class="text-btn" data-close>Close</button>
          <h2>${title}</h2>
        </header>
        <div class="info-body">Loading…</div>
      </article>
    </div>
  `);
  overlay.querySelector("[data-close]").addEventListener("click", hideOverlay);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) hideOverlay();
  });
  showOverlay(overlay);

  try {
    const text = await fetch(url).then((res) => res.text());
    const body = overlay.querySelector(".info-body");
    body.innerHTML = "";
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (headings.includes(trimmed)) {
        body.appendChild(el(`<h3>${trimmed}</h3>`));
      } else {
        body.appendChild(el(`<p>${formatMarkdownish(trimmed)}</p>`));
      }
    }
  } catch {
    overlay.querySelector(".info-body").textContent = "Could not load this page.";
  }
}
