import { slimCard } from "../util.js";

export const SET_CACHE_PREFIX = "set.cards.v2.";
const SET_CARDS_PREFIX = "set.cards.";
const DB_NAME = "mtg-pack-opener";
const STORE = "cache";

let dbPromise = null;
let migratePromise = null;

function isQuotaError(error) {
  return Boolean(
    error
    && (error.name === "QuotaExceededError"
      || error.name === "NS_ERROR_DOM_QUOTA_REACHED"
      || error.code === 22
      || /exceeded the quota/i.test(String(error.message || ""))),
  );
}

function listSetCardKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (key?.startsWith(SET_CARDS_PREFIX)) keys.push(key);
  }
  return keys;
}

export function evictSetCardCaches() {
  for (const key of listSetCardKeys()) {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }
}

export function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    if (!isQuotaError(error)) throw error;
    evictSetCardCaches();
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (retryError) {
      if (isQuotaError(retryError)) return false;
      throw retryError;
    }
  }
}

function openDb() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      if (!("indexedDB" in globalThis)) {
        reject(new Error("IndexedDB unavailable"));
        return;
      }
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(STORE)) {
          request.result.createObjectStore(STORE);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    }).catch((error) => {
      dbPromise = null;
      throw error;
    });
  }
  return dbPromise;
}

export async function idbGetSetCache(key) {
  try {
    const db = await openDb();
    return await new Promise((resolve, reject) => {
      const request = db.transaction(STORE, "readonly").objectStore(STORE).get(key);
      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return null;
  }
}

export async function idbSetSetCache(key, value) {
  try {
    const db = await openDb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.objectStore(STORE).put(value, key);
    });
    localStorage.removeItem(key);
    return true;
  } catch {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
    return false;
  }
}

async function runMigration() {
  const keys = listSetCardKeys();
  for (const key of keys) {
    try {
      const cached = JSON.parse(localStorage.getItem(key) || "null");
      if (cached?.cards?.length) {
        await idbSetSetCache(key, {
          ...cached,
          cards: cached.cards.map(slimCard),
        });
      }
    } catch {
      /* drop unreadable cache */
    }
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }
}

export function migrateLegacySetCaches() {
  if (!migratePromise) migratePromise = runMigration();
  return migratePromise;
}
