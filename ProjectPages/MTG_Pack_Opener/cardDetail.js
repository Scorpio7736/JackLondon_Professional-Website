import { uuid } from "../util.js";
import { safeSetItem } from "./storage.js";

const PROFILES_KEY = "profiles.v1";
const ACTIVE_KEY = "profiles.active.id";

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export const profiles = {
  loadAll() {
    const list = readJson(PROFILES_KEY, []);
    return Array.isArray(list) ? list : [];
  },

  saveAll(list) {
    safeSetItem(PROFILES_KEY, JSON.stringify(list));
  },

  activeId() {
    return localStorage.getItem(ACTIVE_KEY);
  },

  setActive(id) {
    if (id) safeSetItem(ACTIVE_KEY, id);
    else localStorage.removeItem(ACTIVE_KEY);
    window.dispatchEvent(new CustomEvent("profiles-changed"));
  },

  active() {
    const id = this.activeId();
    return this.loadAll().find((p) => p.id === id) ?? null;
  },

  upsert({ id, email, username, avatar }) {
    const all = this.loadAll();
    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();
    let record = id ? all.find((p) => p.id === id) : null;

    if (!record && trimmedEmail) {
      record = all.find((p) => p.email.toLowerCase() === trimmedEmail.toLowerCase());
    }

    if (record) {
      record.email = trimmedEmail;
      record.username = trimmedUsername;
      if (avatar !== undefined) record.avatar = avatar;
    } else {
      record = {
        id: id || uuid(),
        email: trimmedEmail,
        username: trimmedUsername,
        avatar: avatar || null,
      };
      all.push(record);
    }

    this.saveAll(all);
    this.setActive(record.id);
    return record;
  },

  delete(id) {
    const remaining = this.loadAll().filter((p) => p.id !== id);
    this.saveAll(remaining);
    if (this.activeId() === id) {
      this.setActive(remaining[0]?.id ?? null);
    } else {
      window.dispatchEvent(new CustomEvent("profiles-changed"));
    }
  },
};
