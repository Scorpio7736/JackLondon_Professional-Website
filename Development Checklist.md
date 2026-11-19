# Development Checklist

## Versioning Conventions

Version numbers follow `MAJOR.MINOR.PATCH` (`#.x.x`):

- **Major (`#.x.x`)** — Full website changes, such as a major redesign or site-wide architectural overhaul.
- **Minor (`x.#.x`)** — Substantial additions, such as introducing a new primary website section (e.g., Home or Activities).
- **Patch (`x.x.#`)** — Changes within existing sections, including content, features, layout, banners, and design refinements.

Major and minor versions can have a custom release name chosen later; use `[INSERT NAME]` as the placeholder until named.

## 1.3 - [London, Jack London - Software Engineer]

- [ ] **1.3.1** - Add more AI-related skills to the homepage.
- [ ] **1.3.2** - Add a note explaining that I use AI as an accelerator and thought partner.
- [ ] **1.3.3** - Improve search discoverability by incorporating relevant keywords naturally into page content, headings, titles, and metadata so Google can better understand and surface the website.
- [ ] **1.3.4** - Fix the Blacksmithing banner image.
- [ ] **1.3.5** - Combine all existing error pages into one dynamic error page that changes its content and presentation based on the error code.

## Development History (Selected Commit Milestones)

This is a retrospective summary of documented Git commits, not a list of pending tasks. The milestones below are grouped by work area rather than assigned retrospective semantic versions; individual commits may include further refinements.

### November 19, 2026 — Activity banner redesign
- Replaced the Outdoors photo header with a coded mountain-and-lake SVG, then updated its styling and stylesheet references ([8c30013](https://github.com/Scorpio7736/JackLondon_Professional-Website/commit/8c30013f2903dc5df8bdae31c6b96cd5fd6b9e4d), [4009cb6](https://github.com/Scorpio7736/JackLondon_Professional-Website/commit/4009cb6395b532309c44f87cad0abfaf847b20e7), [6681575](https://github.com/Scorpio7736/JackLondon_Professional-Website/commit/6681575d4802baa78b8374cf5f56890bba508220)).

### November 17–18, 2026 — Interface and asset refinements
- Created branded 403, 404, 500, 503, and 504 error pages, then aligned their layouts with the portfolio workspace and added error-specific GIFs ([dc41f74](https://github.com/Scorpio7736/JackLondon_Professional-Website/commit/dc41f7487), [3f42bb7](https://github.com/Scorpio7736/JackLondon_Professional-Website/commit/3f42bb72e), [d376f44](https://github.com/Scorpio7736/JackLondon_Professional-Website/commit/d376f440c)).
- Introduced a shared, accessible technical-term glossary across portfolio sections and iterated on hover/focus animations ([cb09b07](https://github.com/Scorpio7736/JackLondon_Professional-Website/commit/cb09b0723), [9d73c39](https://github.com/Scorpio7736/JackLondon_Professional-Website/commit/9d73c396e)).
- Added Grid.AI as a featured project, refined the description around offline agent workflows, and updated gallery images ([8b43aa2](https://github.com/Scorpio7736/JackLondon_Professional-Website/commit/8b43aa283), [8236ea4](https://github.com/Scorpio7736/JackLondon_Professional-Website/commit/8236ea4f0)).
- Expanded AI-related skills and homepage content, including AI skill ratings, icons, and an AI exploration card ([13277b1](https://github.com/Scorpio7736/JackLondon_Professional-Website/commit/13277b1ba), [c220558](https://github.com/Scorpio7736/JackLondon_Professional-Website/commit/c220558d0)).
- Removed unreferenced images and audio files to reduce unused repository assets ([4ea8404](https://github.com/Scorpio7736/JackLondon_Professional-Website/commit/4ea84049bce4ece0c977b4d8f5e11f49c97a0894), [f9132e1](https://github.com/Scorpio7736/JackLondon_Professional-Website/commit/f9132e108)).

### History notes
- This is a **selected history**, not an exhaustive reconstruction of every commit since the repository was created.
- Existing entries under version **1.3** above remain *open checklist tasks*, even when earlier commits made related improvements.
