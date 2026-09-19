import { identityKey, preferredImage, slimCard, visibleName } from "../util.js";
import { profiles } from "./profiles.js";
import { safeSetItem } from "./storage.js";

const LEGACY_KEY = "collection.v1";
const compacted = new Set();

function keyFor(id) {
  return `collection.v1.${id ?? "no-profile"}`;
}

function read(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function notify() {
  window.dispatchEvent(new CustomEvent("collection-changed"));
}

export const collection = {
  emptyTitle: "No boosters cracked yet.",
  emptySubtitle: "Open a pack to begin your collection.",

  load() {
    const active = profiles.activeId();
    const scoped = keyFor(active);
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy && !localStorage.getItem(scoped)) {
      if (safeSetItem(scoped, legacy)) localStorage.removeItem(LEGACY_KEY);
    }
    const items = this.normalize(read(scoped));
    if (!compacted.has(scoped)) {
      compacted.add(scoped);
      const raw = localStorage.getItem(scoped);
      const slimmed = JSON.stringify(items);
      if (raw && slimmed.length < raw.length) safeSetItem(scoped, slimmed);
    }
    return items;
  },

  save(items) {
    const scoped = keyFor(profiles.activeId());
    const payload = JSON.stringify(this.normalize(items));
    if (safeSetItem(scoped, payload)) return;
    throw new Error("Not enough browser storage to save your collection. Clear old data and try again.");
  },

  sorted(items = this.load()) {
    return [...items].sort((a, b) => {
      if (a.card.rarityOrder === b.card.rarityOrder) {
        return a.card.name.localeCompare(b.card.name);
      }
      return a.card.rarityOrder - b.card.rarityOrder;
    });
  },

  append(cards) {
    const current = this.load();
    for (const card of cards) {
      const idx = current.findIndex((item) => identityKey(item.card.name) === identityKey(card.name));
      if (idx >= 0) current[idx].count += 1;
      else current.push({ id: card.id, card: slimCard(card), count: 1 });
    }
    this.save(current);
    notify();
  },

  count(card) {
    const key = identityKey(card.name);
    return this.load().reduce((sum, item) => (
      identityKey(item.card.name) === key ? sum + item.count : sum
    ), 0);
  },

  delete(card, quantity = 1) {
    const current = this.load();
    const key = identityKey(card.name);
    const idx = current.findIndex((item) => identityKey(item.card.name) === key);
    if (idx < 0) return 0;
    const remove = Math.min(quantity, current[idx].count);
    current[idx].count -= remove;
    if (current[idx].count <= 0) current.splice(idx, 1);
    this.save(current);
    notify();
    return remove;
  },

  clearActive() {
    this.save([]);
    notify();
  },

  normalize(items) {
    const buckets = new Map();
    for (const item of items) {
      const key = identityKey(item.card?.name);
      if (!key) continue;
      if (buckets.has(key)) buckets.get(key).count += item.count || 1;
      else buckets.set(key, { ...item, card: slimCard(item.card), count: item.count || 1 });
    }
    return [...buckets.values()];
  },

  displayName(item) {
    return visibleName(item.card, 0);
  },

  thumb(item) {
    return preferredImage(item.card, 0);
  },
};
