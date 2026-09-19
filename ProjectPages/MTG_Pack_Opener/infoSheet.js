import { safeSetItem } from "./storage.js";

const SELECTED_KEY = "packs.selected.code";
const SETS_CACHE_KEY = "packs.sets.v1";
const CACHE_MS = 24 * 60 * 60 * 1000;
const BOOSTER_TYPES = new Set(["core", "expansion", "draft_innovation", "masters", "funny"]);

export function getSelectedCode() {
  return localStorage.getItem(SELECTED_KEY) || "spm";
}

export function setSelectedCode(code) {
  safeSetItem(SELECTED_KEY, code);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isBoosterSet(set) {
  return !set.digital
    && BOOSTER_TYPES.has(set.set_type)
    && (set.card_count ?? 0) >= 40
    && Boolean(set.code);
}

export async function loadSets() {
  try {
    const cached = JSON.parse(localStorage.getItem(SETS_CACHE_KEY) || "null");
    if (cached?.at && Date.now() - cached.at < CACHE_MS && Array.isArray(cached.sets) && cached.sets.length) {
      return cached.sets;
    }
  } catch {
    /* ignore bad cache */
  }

  const response = await fetch("https://api.scryfall.com/sets", {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Scryfall set list failed (${response.status})`);
  }
  const data = await response.json();
  const sets = (data.data ?? [])
    .filter(isBoosterSet)
    .map((set) => ({
      code: set.code.toLowerCase(),
      name: set.name,
      icon: set.icon_svg_uri,
      releasedAt: set.released_at,
      cardCount: set.card_count,
      setType: set.set_type,
    }))
    .sort((a, b) => String(b.releasedAt).localeCompare(String(a.releasedAt)));

  safeSetItem(SETS_CACHE_KEY, JSON.stringify({ at: Date.now(), sets }));
  await delay(80);
  return sets;
}

export function filterSets(sets, query) {
  const q = query.trim().toLowerCase();
  if (!q) return sets;
  return sets.filter((set) => (
    set.name.toLowerCase().includes(q) || set.code.toLowerCase().includes(q)
  ));
}

export function findSet(sets, code) {
  return sets.find((set) => set.code === code) ?? null;
}
