import { safeSetItem } from "./storage.js";

const ART_CACHE_KEY = "packs.art.v1";
const WIKI = "https://files.mtg.wiki";

const ALIASES = {
  fdn: ["FND"],
  lea: ["Alpha"],
  leb: ["Beta"],
  "2ed": ["Unlimited"],
  "3ed": ["Revised"],
};

function readCache() {
  try {
    return JSON.parse(localStorage.getItem(ART_CACHE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeCache(cache) {
  safeSetItem(ART_CACHE_KEY, JSON.stringify(cache));
}

function imageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.referrerPolicy = "no-referrer";
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

function candidates(code) {
  const raw = String(code || "").toLowerCase();
  const keys = [raw.toUpperCase(), ...(ALIASES[raw] || [])];
  const names = [];
  for (const key of keys) {
    names.push(
      `${key}_Play_Booster.png`,
      `${key}_Play_Booster_1.png`,
      `${key}_Set_Booster.png`,
      `${key}_Draft_Booster.png`,
      `${key}_draft_booster.png`,
      `${key}_Booster_pack.jpg`,
      `${key}_Booster_pack.png`,
      `${key}_booster.jpg`,
      `${key}_Booster.jpg`,
      `${key}_Booster.png`,
      `${key}_Collector_Booster.png`,
    );
  }
  if (raw === "lea") names.unshift("Alpha_booster.jpg");
  if (raw === "leb") names.unshift("Beta_booster.jpg");
  if (raw === "2ed") names.unshift("Unlimited_booster.jpg");
  if (raw === "spm") names.push("/assets/SMPack.png");

  return names.map((name) => (name.startsWith("/") ? name : `${WIKI}/${name}`));
}

async function firstExisting(urls) {
  const chunkSize = 4;
  for (let i = 0; i < urls.length; i += chunkSize) {
    const chunk = urls.slice(i, i + chunkSize);
    const hits = await Promise.all(chunk.map(async (url, offset) => (
      (await imageExists(url)) ? { url, index: i + offset } : null
    )));
    const found = hits.filter(Boolean).sort((a, b) => a.index - b.index)[0];
    if (found) return found.url;
  }
  return null;
}

export async function resolvePackArt(code) {
  const key = String(code || "").toLowerCase();
  const cache = readCache();
  if (Object.prototype.hasOwnProperty.call(cache, key)) return cache[key];
  const url = await firstExisting(candidates(key));
  cache[key] = url;
  writeCache(cache);
  return url;
}

export function packArtFor(code) {
  const cache = readCache();
  return cache[String(code || "").toLowerCase()] || null;
}
