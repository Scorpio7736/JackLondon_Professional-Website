export function el(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

export function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function identityKey(name) {
  return String(name ?? "")
    .replaceAll("–", "-")
    .replaceAll("—", "-")
    .replaceAll("−", "-")
    .normalize("NFD")
    .replace(/\p{M}+/gu, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function preferredImage(card, faceIndex = 0) {
  const faces = card?.faces;
  if (Array.isArray(faces) && faces.length) {
    const face = faces[Math.min(faceIndex, faces.length - 1)];
    const fromFace = pickImage(face?.image_uris);
    if (fromFace) return fromFace;
  }
  return pickImage(card?.image_uris) || "/assets/default-card.png";
}

export function pickImage(uris) {
  if (!uris) return null;
  return uris.normal || uris.large || uris.png || uris.border_crop || uris.small || null;
}

export function slimImageUris(uris) {
  const url = pickImage(uris);
  return url ? { normal: url } : null;
}

export function slimCard(card) {
  if (!card) return card;
  const faces = Array.isArray(card.faces)
    ? card.faces.map((face) => ({
        name: face.name,
        image_uris: slimImageUris(face.image_uris),
      }))
    : null;
  return {
    id: card.id,
    name: card.name,
    rarity: card.rarity,
    rarityOrder: card.rarityOrder,
    set: card.set ?? null,
    type_line: card.type_line ?? null,
    layout: card.layout ?? null,
    booster: card.booster !== false,
    image_uris: slimImageUris(card.image_uris),
    faces,
  };
}

export function visibleName(card, faceIndex = 0) {
  const faces = card?.faces;
  if (Array.isArray(faces) && faces.length) {
    return faces[Math.min(faceIndex, faces.length - 1)]?.name || card.name;
  }
  return card?.name ?? "Unknown Card";
}

export function rarityClass(rarity) {
  const key = String(rarity ?? "").toLowerCase();
  if (["common", "uncommon", "rare", "mythic", "legendary"].includes(key)) return key;
  return "common";
}

export function isOnline() {
  return navigator.onLine;
}

export function formatMarkdownish(text) {
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function resizeAvatar(file, size = 160) {
  const dataUrl = await readFileAsDataUrl(file);
  const image = await loadImage(dataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const scale = Math.max(size / image.width, size / image.height);
  const w = image.width * scale;
  const h = image.height * scale;
  ctx.drawImage(image, (size - w) / 2, (size - h) / 2, w, h);
  return canvas.toDataURL("image/jpeg", 0.82);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function mountDialog(node) {
  const overlay = document.getElementById("overlay");
  overlay.hidden = false;
  overlay.appendChild(node);
  return overlay;
}

function unmountDialog(overlay, node) {
  node.remove();
  if (!overlay.children.length) overlay.hidden = true;
}

export function confirmDialog(title, message, confirmLabel = "OK", destructive = false) {
  return new Promise((resolve) => {
    const node = el(`
      <div class="modal-backdrop">
        <div class="modal" role="dialog" aria-modal="true">
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(message)}</p>
          <div class="modal-actions">
            <button type="button" class="btn btn-dark" data-cancel>Cancel</button>
            <button type="button" class="btn ${destructive ? "btn-danger" : "btn-dark"}" data-ok>${escapeHtml(confirmLabel)}</button>
          </div>
        </div>
      </div>
    `);
    const overlay = mountDialog(node);
    const close = (value) => {
      unmountDialog(overlay, node);
      resolve(value);
    };
    node.querySelector("[data-cancel]").addEventListener("click", () => close(false));
    node.querySelector("[data-ok]").addEventListener("click", () => close(true));
    node.addEventListener("click", (event) => {
      if (event.target === node) close(false);
    });
  });
}

export function alertDialog(title, message) {
  return new Promise((resolve) => {
    const node = el(`
      <div class="modal-backdrop">
        <div class="modal" role="dialog" aria-modal="true">
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(message)}</p>
          <div class="modal-actions">
            <button type="button" class="btn btn-dark" data-ok>OK</button>
          </div>
        </div>
      </div>
    `);
    const overlay = mountDialog(node);
    const close = () => {
      unmountDialog(overlay, node);
      resolve();
    };
    node.querySelector("[data-ok]").addEventListener("click", close);
    node.addEventListener("click", (event) => {
      if (event.target === node) close();
    });
  });
}
