const SFX_KEY = "settings.sfxEnabled";
const MUSIC_KEY = "settings.musicEnabled";

function bool(key, fallback = true) {
  const raw = localStorage.getItem(key);
  if (raw === null) return fallback;
  return raw === "true";
}

class SoundManager {
  constructor() {
    this.sfxEnabled = bool(SFX_KEY, true);
    this.musicEnabled = bool(MUSIC_KEY, true);
    this.music = new Audio("/assets/audio/background_music.mp3");
    this.music.loop = true;
    this.music.volume = 0.55;
    this.flip = new Audio("/assets/audio/card_flip_sfx.mp3");
    this.mythic = new Audio("/assets/audio/mythic_sfx.mp3");
    this.flip.preload = "auto";
    this.mythic.preload = "auto";
  }

  setSfxEnabled(enabled) {
    this.sfxEnabled = enabled;
    localStorage.setItem(SFX_KEY, String(enabled));
  }

  setMusicEnabled(enabled) {
    this.musicEnabled = enabled;
    localStorage.setItem(MUSIC_KEY, String(enabled));
    if (enabled) this.startMusic();
    else this.stopMusic();
  }

  async startMusic() {
    if (!this.musicEnabled) return;
    try {
      await this.music.play();
    } catch {
      // Browsers block autoplay until a gesture; splash tap retries this.
    }
  }

  stopMusic() {
    this.music.pause();
    this.music.currentTime = 0;
  }

  playFlip() {
    if (!this.sfxEnabled) return;
    const clone = this.flip.cloneNode();
    clone.volume = 0.85;
    clone.play().catch(() => {});
  }

  playMythic() {
    if (!this.sfxEnabled) return;
    const clone = this.mythic.cloneNode();
    clone.volume = 0.9;
    clone.play().catch(() => {});
  }

  playReveal(card) {
    this.playFlip();
    if (String(card?.rarity).toLowerCase() === "mythic") {
      setTimeout(() => this.playMythic(), 100);
    }
  }
}

export const sound = new SoundManager();
