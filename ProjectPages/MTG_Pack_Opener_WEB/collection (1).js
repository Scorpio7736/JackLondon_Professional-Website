import { slimCard, slimImageUris } from "../util.js";
import {
  idbGetSetCache,
  idbSetSetCache,
  migrateLegacySetCaches,
  SET_CACHE_PREFIX,
} from "./storage.js";

const CACHE_MS = 24 * 60 * 60 * 1000;
const PACK_SIZE = 14;
const COMMON_SLOTS = 10;
const UNCOMMON_SLOTS = 3;
const RARE_SLOTS = 1;
const MYTHIC_IN_RARE_SLOT = 1 / 8;
const memory = new Map();
const inflight = new Map();

function rarityOrder(rarity) {
  switch (String(rarity).toLowerCase()) {
    case "mythic":
      return 0;
    case "rare":
      return 1;
    case "uncommon":
      return 2;
    case "common":
      return 3;
    default:
      return 4;
  }
}

function normalizeCard(raw) {
  const faces = Array.isArray(raw.card_faces)
    ? raw.card_faces.map((face) => ({
        name: face.name,
        image_uris: slimImageUris(face.image_uris),
      }))
    : null;

  return slimCard({
    id: raw.id,
    name: raw.name,
    rarity: raw.rarity,
    rarityOrder: rarityOrder(raw.rarity),
    set: raw.set ?? null,
    type_line: raw.type_line ?? null,
    layout: raw.layout ?? null,
    booster: raw.booster !== false,
    image_uris: slimImageUris(raw.image_uris),
    faces,
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function cacheKey(code) {
  return `${SET_CACHE_PREFIX}${String(code).toLowerCase()}`;
}

function freshCards(cached) {
  if (!cached?.at || Date.now() - cached.at >= CACHE_MS) return null;
  if (!Array.isArray(cached.cards) || !cached.cards.length) return null;
  return cached.cards.map(slimCard);
}

async function fetchPages(code) {
  const cards = [];
  const query = `e:${code}`;
  let url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}&unique=prints`;

  while (url) {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Scryfall request failed (${response.status})`);
    }
    const data = await response.json();
    cards.push(...(data.data ?? []));
    url = data.has_more ? data.next_page : null;
    if (url) await delay(120);
  }

  return cards.map(normalizeCard).filter((card) => card.image_uris || card.faces?.some((f) => f.image_uris));
}

async function loadUncached(key, code) {
  await migrateLegacySetCaches();

  const fromIdb = freshCards(await idbGetSetCache(key));
  if (fromIdb) {
    memory.set(key, fromIdb);
    return fromIdb;
  }

  try {
    const fromLocal = freshCards(JSON.parse(localStorage.getItem(key) || "null"));
    if (fromLocal) {
      memory.set(key, fromLocal);
      await idbSetSetCache(key, { at: Date.now(), cards: fromLocal });
      return fromLocal;
    }
  } catch {
    /* ignore bad cache */
  }

  const cards = await fetchPages(code);
  memory.set(key, cards);
  await idbSetSetCache(key, { at: Date.now(), cards });
  return cards;
}

export async function loadSetCards(code) {
  const key = cacheKey(code);
  if (memory.has(key)) return memory.get(key);
  if (inflight.has(key)) return inflight.get(key);

  const pending = loadUncached(key, code).finally(() => inflight.delete(key));
  inflight.set(key, pending);
  return pending;
}

function rarityKey(card) {
  return String(card?.rarity || "").toLowerCase();
}

function isBasicLand(card) {
  const type = String(card.type_line || "").toLowerCase();
  if (type.includes("basic") && type.includes("land")) return true;
  return /^(snow-covered )?(plains|island|swamp|mountain|forest|wastes)$/i.test(String(card.name || "").trim());
}

function isPackCard(card) {
  const layout = String(card.layout || "").toLowerCase();
  if (["token", "double_faced_token", "emblem", "art_series", "planar"].includes(layout)) return false;
  if (card.booster === false) return false;
  if (isBasicLand(card)) return false;
  return ["common", "uncommon", "rare", "mythic"].includes(rarityKey(card));
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function pickCards(pool, count, usedIds) {
  const picks = [];
  if (!pool.length || count <= 0) return picks;
  for (let i = 0; i < count; i += 1) {
    const unused = pool.filter((card) => !usedIds.has(card.id));
    const card = pickRandom(unused.length ? unused : pool);
    picks.push(card);
    usedIds.add(card.id);
  }
  return picks;
}

function dropChance(rarity, counts) {
  const n = counts[rarity] || 0;
  if (!n) return 0;
  if (rarity === "common") return Math.min(1, COMMON_SLOTS / n);
  if (rarity === "uncommon") return Math.min(1, UNCOMMON_SLOTS / n);
  if (rarity === "rare") {
    const rareRate = counts.mythic ? 1 - MYTHIC_IN_RARE_SLOT : 1;
    return Math.min(1, rareRate / n);
  }
  if (rarity === "mythic") {
    const mythicRate = counts.rare ? MYTHIC_IN_RARE_SLOT : 1;
    return Math.min(1, mythicRate / n);
  }
  return 0;
}

export function formatDropChance(chance) {
  if (!(chance > 0)) return "";
  const pct = chance * 100;
  const digits = pct >= 10 ? 0 : pct >= 1 ? 1 : 2;
  return `${pct.toFixed(digits)}%`;
}

function withChance(card, counts) {
  return { ...card, dropChance: dropChance(rarityKey(card), counts) };
}

function buildPack(pool) {
  const eligible = pool.filter(isPackCard);
  const source = eligible.length ? eligible : pool;
  const byRarity = { common: [], uncommon: [], rare: [], mythic: [] };
  const counts = { common: 0, uncommon: 0, rare: 0, mythic: 0 };
  for (const card of source) {
    const key = rarityKey(card);
    if (!byRarity[key]) continue;
    byRarity[key].push(card);
    counts[key] += 1;
  }

  const used = new Set();
  const commons = pickCards(byRarity.common.length ? byRarity.common : source, COMMON_SLOTS, used);
  const uncommons = pickCards(byRarity.uncommon.length ? byRarity.uncommon : source, UNCOMMON_SLOTS, used);

  let rarePool = byRarity.rare;
  if (byRarity.mythic.length && byRarity.rare.length) {
    rarePool = Math.random() < MYTHIC_IN_RARE_SLOT ? byRarity.mythic : byRarity.rare;
  } else if (byRarity.mythic.length) {
    rarePool = byRarity.mythic;
  } else if (!rarePool.length) {
    rarePool = source;
  }
  const rares = pickCards(rarePool, RARE_SLOTS, used);

  return [...commons, ...uncommons, ...rares].map((card) => withChance(card, counts));
}

export async function fetchPack(code, size = PACK_SIZE) {
  const pool = await loadSetCards(code);
  if (!pool.length) return [];
  const pack = buildPack(pool);
  return pack.slice(0, size);
}

export { PACK_SIZE };
