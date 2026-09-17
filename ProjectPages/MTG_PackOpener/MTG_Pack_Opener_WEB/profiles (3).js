@font-face {
  font-family: "Beleren2016-Bold";
  src: url("/assets/Beleren2016-Bold.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

:root {
  --light-blue: #2e414e;
  --dark-blue: #0c1c28;
  --tan: #ebd2a2;
  --orange: #ba3d26;
  --common: #9aa0a6;
  --uncommon: #3cb371;
  --rare: #4c8dff;
  --mythic: #9b59d0;
  --legendary: #e67e22;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  min-height: 100%;
  background: #08141d;
  color: var(--tan);
  font-family: "Beleren2016-Bold", Georgia, serif;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100dvh;
}

button,
input,
select {
  font-family: inherit;
}

#phone {
  position: relative;
  width: min(430px, 100%);
  height: 100dvh;
  background: var(--light-blue);
  overflow: hidden;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.45);
}

#app,
#overlay {
  position: absolute;
  inset: 0;
}

#overlay {
  z-index: 20;
}

#overlay[hidden] {
  display: none !important;
}

.screen {
  min-height: 100%;
  background: var(--light-blue);
}

.legal-footer {
  max-width: 430px;
  margin: 12px 16px 24px;
  color: #9bb0bf;
  font-family: system-ui, sans-serif;
  font-size: 12px;
  line-height: 1.45;
  text-align: center;
}

.legal-footer a {
  color: var(--tan);
}

.title-pill,
.cta-pill {
  margin: 20px auto 0;
  width: min(350px, calc(100% - 32px));
  padding: 14px 18px;
  border-radius: 20px;
  background: var(--dark-blue);
  color: var(--tan);
  text-align: center;
  font-size: 28px;
}

.splash {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  padding: 24px 16px 40px;
}

.splash .logo {
  width: 250px;
  height: 250px;
  object-fit: contain;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}

.splash .cta-pill {
  margin-top: auto;
}

.splash.fade-out {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.offline-banner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px 16px;
  background: var(--dark-blue);
  color: var(--tan);
  font-family: system-ui, sans-serif;
  font-size: 13px;
  text-align: center;
}

.page-header,
.sheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
}

.page-header h1,
.sheet-header h2 {
  margin: 0;
  font-size: 24px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-btn,
.text-btn {
  background: none;
  border: none;
  color: var(--tan);
  cursor: pointer;
}

.icon-btn {
  font-size: 32px;
  line-height: 1;
}

.text-btn {
  font-size: 16px;
}

.text-btn.danger,
.btn-danger {
  color: #ffb4b4;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 24px;
  text-align: center;
  opacity: 0.9;
}

.empty-icon {
  font-size: 64px;
  opacity: 0.5;
}

.profile-list {
  list-style: none;
  margin: 0;
  padding: 0 16px 24px;
}

.profile-row,
.setting-row,
.setting-btn,
.list-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-bottom: 12px;
  padding: 12px 16px;
  border: none;
  border-radius: 16px;
  background: var(--dark-blue);
  color: var(--tan);
  text-align: left;
  cursor: pointer;
}

.profile-name {
  flex: 1;
  font-size: 18px;
}

.avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  object-fit: cover;
  background: #1b3344;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.avatar.large {
  width: 64px;
  height: 64px;
}

.check {
  color: #3cb371;
}

.chevron {
  opacity: 0.6;
}

.main {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.main-content {
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 96px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.main-content::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

.tab-bar {
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 12px;
  display: flex;
  justify-content: space-around;
  padding: 10px 18px;
  border-radius: 999px;
  background: var(--dark-blue);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
  z-index: 5;
}

.tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: var(--tan);
  opacity: 0.55;
  cursor: pointer;
}

.tab.selected {
  opacity: 1;
}

.tab img {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.tab span {
  font-size: 12px;
}

.pack-view,
.settings-view,
.collection-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 16px 24px;
}

.set-search {
  width: min(350px, 100%);
  margin-top: 14px;
  padding: 10px 14px;
  border: none;
  border-radius: 12px;
  background: var(--dark-blue);
  color: var(--tan);
  font-size: 16px;
}

.set-search::placeholder {
  color: rgba(235, 210, 162, 0.55);
}

.set-scroller {
  display: flex;
  gap: 8px;
  width: 100%;
  margin-top: 12px;
  padding: 4px 2px;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.set-scroller::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

.set-chip {
  flex: 0 0 108px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 8px;
  border: 2px solid transparent;
  border-radius: 14px;
  background: var(--dark-blue);
  color: var(--tan);
  cursor: pointer;
}

.set-chip img {
  width: 28px;
  height: 28px;
  object-fit: contain;
  filter: invert(89%) sepia(21%) saturate(431%) hue-rotate(351deg) brightness(97%) contrast(92%);
}

.set-chip span {
  max-width: 92px;
  font-size: 11px;
  line-height: 1.2;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.set-chip.selected {
  border-color: var(--tan);
}

.set-status {
  margin: 0 0 8px;
  min-height: 1.2em;
  font-family: system-ui, sans-serif;
  font-size: 13px;
  opacity: 0.85;
  text-align: center;
}

.pack-button {
  position: relative;
  margin-top: 8px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}

.pack-button img:not(.pack-icon),
.pack-photo {
  width: min(240px, 68vw);
  max-height: min(420px, 52vh);
  height: auto;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.4);
  background: transparent;
}

.pack-face {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: min(260px, 72vw);
  aspect-ratio: 7 / 11;
  padding: 24px 16px 56px;
  border-radius: 14px;
  background:
    linear-gradient(180deg, rgba(235, 210, 162, 0.16), transparent 28%),
    linear-gradient(180deg, #163044, var(--dark-blue) 55%, #08141d);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.4);
  color: var(--tan);
}

.pack-icon {
  width: 72px;
  height: 72px;
  object-fit: contain;
  filter: invert(89%) sepia(21%) saturate(431%) hue-rotate(351deg) brightness(97%) contrast(92%);
}

.pack-face strong {
  font-size: 22px;
  text-align: center;
  line-height: 1.2;
}

.pack-face em {
  font-style: normal;
  font-family: system-ui, sans-serif;
  letter-spacing: 0.12em;
  opacity: 0.8;
}

.pack-button span,
.pack-face [data-label] {
  position: absolute;
  top: 18px;
  left: 0;
  right: 0;
  color: var(--tan);
  font-size: 24px;
  text-shadow: 0 2px 8px #000;
}

.pack-button:disabled {
  opacity: 0.8;
}

.reveal-backdrop,
.sheet-backdrop,
.modal-backdrop {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.6);
}

.modal-backdrop {
  z-index: 5;
}

.reveal-card,
.sheet,
.modal {
  width: min(360px, 100%);
  max-height: calc(100% - 24px);
  overflow: auto;
  padding: 16px;
  border-radius: 12px;
  background: var(--dark-blue);
  color: var(--tan);
}

.reveal-card {
  border: 8px solid var(--common);
  animation: wave 1.5s ease-in-out infinite;
}

.reveal-card h2,
.card-detail h2,
.modal h2 {
  margin: 8px 0 4px;
  text-align: center;
}

.rarity-label {
  margin: 0 0 8px;
  text-align: center;
  font-family: system-ui, sans-serif;
  font-weight: 700;
  text-transform: capitalize;
}

.reveal-card.rarity-common,
.card-detail.rarity-common { --wave: var(--common); border-color: var(--common); }
.reveal-card.rarity-uncommon,
.card-detail.rarity-uncommon { --wave: var(--uncommon); border-color: var(--uncommon); }
.reveal-card.rarity-rare,
.card-detail.rarity-rare { --wave: var(--rare); border-color: var(--rare); }
.reveal-card.rarity-mythic,
.card-detail.rarity-mythic { --wave: var(--mythic); border-color: var(--mythic); }
.reveal-card.rarity-legendary,
.card-detail.rarity-legendary { --wave: var(--legendary); border-color: var(--legendary); }

.rarity-common .rarity-label { color: var(--common); }
.rarity-uncommon .rarity-label { color: var(--uncommon); }
.rarity-rare .rarity-label { color: var(--rare); }
.rarity-mythic .rarity-label { color: var(--mythic); }
.rarity-legendary .rarity-label { color: var(--legendary); }

@keyframes wave {
  0%, 100% { border-color: var(--wave, var(--common)); }
  50% { border-color: var(--light-blue); }
}

.card-art {
  display: block;
  width: 100%;
  aspect-ratio: 63 / 88;
  object-fit: contain;
  border-radius: 12px;
  background: #1b2833;
  transition: opacity 0.2s ease;
}

.card-art.fade {
  opacity: 0;
}

.reveal-actions,
.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 12px;
}

.hint {
  margin: 10px 0 0;
  text-align: center;
  font-family: system-ui, sans-serif;
  font-size: 13px;
  opacity: 0.75;
}

.btn {
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
}

.btn-dark,
.btn-light {
  background: var(--dark-blue);
  color: var(--tan);
  box-shadow: inset 0 0 0 1px rgba(235, 210, 162, 0.2);
}

.btn-light {
  background: var(--light-blue);
}

.btn-muted {
  background: rgba(128, 128, 128, 0.6);
  color: #fff;
}

.btn-danger {
  background: rgba(186, 61, 38, 0.95);
  color: #fff;
}

.pack-complete {
  font-size: 28px;
  color: var(--tan);
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
}

.grid-tile {
  padding: 6px;
  border: none;
  border-radius: 12px;
  background: var(--dark-blue);
  cursor: pointer;
}

.grid-tile img,
.list-row img {
  width: 100%;
  aspect-ratio: 63 / 88;
  object-fit: cover;
  border-radius: 10px;
}

.card-list {
  width: 100%;
}

.list-row img {
  width: 70px;
  height: 96px;
  aspect-ratio: auto;
}

.list-row div {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.list-row strong {
  font-size: 20px;
}

.list-row span {
  font-family: system-ui, sans-serif;
  opacity: 0.85;
}

.collection-view {
  position: relative;
  align-items: stretch;
  min-height: 100%;
}

.collection-header {
  position: sticky;
  top: 0;
  z-index: 3;
  display: flex;
  justify-content: center;
  margin: 0 -16px;
  padding: 8px 16px 16px;
  background: var(--light-blue);
}

.collection-title {
  margin: 8px auto 0;
  flex: 0 0 auto;
  align-self: center;
  width: min(350px, calc(100% - 32px));
  font-size: 28px;
  line-height: 1.15;
  overflow-wrap: anywhere;
}

.collection-body {
  width: 100%;
}

.fab {
  position: absolute;
  right: 20px;
  bottom: 88px;
  z-index: 4;
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 50%;
  background: var(--dark-blue);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.fab img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.setting-row {
  width: min(350px, 100%);
  justify-content: space-between;
}

.setting-btn {
  width: min(350px, 100%);
  justify-content: center;
  font-size: 18px;
}

.setting-row input {
  width: 42px;
  height: 24px;
  accent-color: #4c8dff;
}

.profile-form,
.info-sheet,
.card-detail {
  width: min(390px, 100%);
}

.avatar-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 14px;
  border-radius: 20px;
  background: var(--dark-blue);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}

.field span {
  font-size: 14px;
}

.field input,
.field select {
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: rgba(46, 65, 78, 0.7);
  color: #fff;
}

.info-body {
  font-family: system-ui, sans-serif;
  line-height: 1.45;
}

.info-body h3 {
  margin: 16px 0 8px;
  color: var(--tan);
  font-family: "Beleren2016-Bold", Georgia, serif;
}

.info-body p {
  margin: 0 0 8px;
}

.card-detail {
  border: 8px solid var(--wave, var(--common));
  animation: wave 1.5s ease-in-out infinite;
}

@media (min-width: 700px) {
  #phone {
    height: min(900px, 100dvh);
    margin-top: 16px;
    border-radius: 24px;
  }
}
