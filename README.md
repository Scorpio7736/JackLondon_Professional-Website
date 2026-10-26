# Jack London — Professional Portfolio

Source code for my personal software engineering portfolio: **[jacklondon.site](https://jacklondon.site)**.

The site showcases my projects, technical skills, professional experience, education, and activities through a custom **desktop-inspired interface** built with HTML, CSS, and JavaScript.

> A portfolio website and ongoing front-end development project. The main site is built without a JavaScript framework or required build step.

## Live website

**[Visit jacklondon.site](https://jacklondon.site)**

## Design concept

I wanted a portfolio that felt like an application rather than a traditional scrolling résumé.

The interface takes inspiration from familiar productivity and desktop software, using:

- A persistent sidebar for primary navigation
- A workspace-style header and tab navigation
- Individual content sections within each page
- Custom cards for experience, skills, education, and projects
- Hover interactions, transitions, and scroll-aware section selection
- A dark color palette with restrained accent colors
- Responsive layouts for smaller screens

The emphasis is on keeping a substantial amount of information organized and easy to explore.

## Portfolio sections

| Section | Content |
| --- | --- |
| **Home** | Introduction, current work, and personal information |
| **Skills** | Programming languages, frameworks, tools, and other capabilities |
| **Experience** | Professional roles, responsibilities, and technical work |
| **Projects** | Desktop, mobile, web, hardware, and experimental projects |
| **Education** | Academic background and certifications |
| **Activities** | Student organizations, outdoor recreation, blacksmithing, and other interests |

The structure allows visitors to move between sections without loading a separate HTML document for every primary page.

## Technology stack

| Technology | Role |
| --- | --- |
| **HTML5** | Site structure and semantic content |
| **CSS3** | Layouts, reusable components, animations, responsive design |
| **JavaScript** | Navigation, section switching, and dynamic content rendering |
| **Static assets** | Icons, banners, photography, and project imagery |

The main portfolio is intentionally **framework-free**. Its interactive behavior is implemented directly in JavaScript, and content such as skills, projects, and work experience is organized into dedicated data scripts.

## Getting started

### Requirements

Any modern desktop browser and a basic static web server are sufficient for the main site. No `npm install`, compilation, or backend service is required to view the portfolio pages.

### Run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Scorpio7736/JackLondon_Professional-Website.git
   cd JackLondon_Professional-Website
   ```

2. Start a local static server from the repository root. For example, with Python 3:

   ```bash
   python -m http.server 8000
   ```

   On systems that use `python3`:

   ```bash
   python3 -m http.server 8000
   ```

3. Open **[http://localhost:8000](http://localhost:8000)** in a browser.

Some browsers can open `index.html` directly, but using a local server provides more consistent behavior for linked assets and nested project pages.

## Project structure

```text
JackLondon_Professional-Website/
├── index.html
├── stylesheet.css
├── script.js
├── Styles/
│   ├── layout.css
│   ├── components.css
│   ├── home.css
│   ├── skills.css
│   ├── experience.css
│   ├── projects.css
│   ├── education.css
│   ├── activities.css
│   ├── responsive.css
│   └── Activities/
├── Scripts/
│   ├── skills.js
│   ├── experience.js
│   ├── projects.js
│   ├── education.js
│   └── Activities/
├── Images/
│   ├── Icons/
│   ├── Banners/
│   ├── Activities/
│   └── Certifications/
├── ProjectPages/
│   ├── ProjectPageStyles.css
│   └── MTG_Pack_Opener/
└── UnderConstruction.html
```

### Important files

- **`index.html`** — Defines the overall application shell, navigation, and portfolio page containers.
- **`script.js`** — Handles main page changes, workspace tabs, scrolling, and active-section state.
- **`stylesheet.css`** — Defines shared theme variables and base styling.
- **`Styles/layout.css`** — Controls the application shell, sidebar, and workspace layout.
- **`Styles/responsive.css`** — Contains responsive layout adjustments.
- **`Scripts/skills.js`** — Defines and renders skills.
- **`Scripts/experience.js`** — Defines and renders professional experience.
- **`Scripts/projects.js`** — Defines and renders project entries.
- **`Scripts/education.js`** — Defines and renders education and certifications.
- **`ProjectPages/`** — Contains additional project-specific web content, including an MTG Pack Opener page.

## Architecture and interactions

### Page navigation

The main site works as a single-page-style interface. Navigation controls select a page container and update the visible workspace rather than navigating to a completely different top-level HTML page.

### Section tabs

Within a page, tabs correspond to content sections. JavaScript coordinates scrolling and active-tab state so the navigation reflects the section being viewed.

### Data-driven content

Several portfolio areas are populated from JavaScript objects instead of being individually hardcoded in the main HTML document. This keeps repeated elements—such as skills, project cards, and experience entries—more consistent.

### Component-based styling

CSS is split by responsibility: application layout, shared components, individual portfolio pages, and activity-specific presentation. The organization makes it easier to update one area without changing every other section.

## Customizing the portfolio

To use this code as a reference for your own project:

1. Replace personal information and external links in `index.html`.
2. Update the content records under `Scripts/`.
3. Replace images under `Images/` with your own assets.
4. Adjust theme variables in `stylesheet.css`.
5. Review page-specific styles and responsive layouts.
6. Test sidebar navigation, tabs, media, and layout at multiple screen sizes.

This repository includes personal photographs, branding, and other assets. Do not assume those assets are licensed for reuse simply because the repository is public.

## Development focus

This project has provided hands-on experience with:

- Semantic HTML and custom CSS layouts
- DOM manipulation and event handling
- Responsive design
- UI transitions and animations
- Data-driven rendering without a front-end framework
- Navigation and scroll-state coordination
- Organizing a growing static website into maintainable files

## Potential improvements

As the portfolio evolves, useful areas to revisit include:

- Accessibility and keyboard navigation
- More comprehensive responsive testing
- Image optimization and performance
- Automated UI checks
- Additional project demos and technical write-ups
- Search or filtering for larger project collections

## Contact and links

- **Website:** [jacklondon.site](https://jacklondon.site)
- **GitHub:** [@Scorpio7736](https://github.com/Scorpio7736)
- **LinkedIn:** [Jack London](https://www.linkedin.com/in/jack-london-8a4001220/)

---

Designed and developed by **Jack London** as a personal portfolio and ongoing front-end development project.
