/* =========================================
   PROJECT SECTION MAP
   ========================================= */

const projectSectionMap = {

    desktop:
        "projectDesktopGrid",

    mobile:
        "projectMobileGrid",

    web:
        "projectWebGrid",

    hardware:
        "projectHardwareGrid",

    experiments:
        "projectExperimentsGrid"

};


/* =========================================
   CODED PROJECT BANNERS & ICON FALLBACKS
   Match the Skills page without adding banner images.
   ========================================= */

const projectBannerDesigns = {
    "Grid.AI": {
        "accent": "#79b9d6",
        "art": "<g class=\"project-banner-drawing\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M202 90 284 33 366 80 449 25 530 73 626 29 708 84 M284 33 350 12 449 25 484 106 626 29 M366 80 484 106 530 73 708 84\"/><path d=\"M449 25 414 96 M530 73 590 107 M626 29 665 12\" opacity=\".7\"/></g><g class=\"project-banner-nodes\" fill=\"currentColor\"><circle cx=\"202\" cy=\"90\" r=\"3\"/><circle cx=\"284\" cy=\"33\" r=\"4\"/><circle cx=\"350\" cy=\"12\" r=\"2.5\"/><circle cx=\"366\" cy=\"80\" r=\"4\"/><circle cx=\"449\" cy=\"25\" r=\"4.5\"/><circle cx=\"414\" cy=\"96\" r=\"2.5\"/><circle cx=\"484\" cy=\"106\" r=\"3\"/><circle cx=\"530\" cy=\"73\" r=\"4\"/><circle cx=\"590\" cy=\"107\" r=\"3\"/><circle cx=\"626\" cy=\"29\" r=\"4\"/><circle cx=\"665\" cy=\"12\" r=\"2.5\"/><circle cx=\"708\" cy=\"84\" r=\"3\"/></g>"
    },
    "Schedule Creator V2": {
        "accent": "#83b5ad",
        "art": "<g class=\"project-banner-drawing\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"283\" y=\"12\" width=\"362\" height=\"98\" rx=\"7\"/><path d=\"M283 39h362 M361 39v71 M445 39v71 M529 39v71 M283 63h362 M283 87h362\"/><path d=\"m307 51 7 6 12-13 M388 76l7 6 12-13 M552 51l7 6 12-13\" stroke-width=\"2.2\"/><path d=\"M665 27h37 M665 47h63 M665 67h46 M665 87h54\" opacity=\".58\"/><path d=\"M314 12V4 M354 12V4 M578 12V4 M619 12V4\" stroke-width=\"3\"/></g>"
    },
    "Tower Maintenance Manager": {
        "accent": "#c4a38b",
        "art": "<g class=\"project-banner-drawing\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M268 110 295 11 434 11 470 110 M470 110 520 21 643 21 681 110 M295 11 365 45 434 11 M268 110 365 45 470 110 M520 21l65 38 58-38 M470 110l115-51 96 51\" opacity=\".9\"/><path d=\"M341 78c14-23 25-14 34-32 M558 89c17-9 29-17 30-30\" stroke-dasharray=\"4 6\"/><circle cx=\"339\" cy=\"76\" r=\"5\"/><circle cx=\"373\" cy=\"47\" r=\"5\"/><circle cx=\"558\" cy=\"89\" r=\"5\"/><circle cx=\"589\" cy=\"57\" r=\"5\"/><path d=\"m382 82 12-6 8 11-12 6z M613 86l13-4 6 13-13 4z\"/></g>"
    },
    "The Ultimate Easter Egg Guide": {
        "accent": "#b99bd3",
        "art": "<g class=\"project-banner-drawing\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linejoin=\"round\"><rect x=\"304\" y=\"14\" width=\"262\" height=\"94\" rx=\"8\"/><path d=\"M304 38h262 M321 27h7 M338 27h7 M355 27h7\"/><path d=\"m351 59-18 14 18 14 M519 59l18 14-18 14 M415 49l-17 47\" stroke-width=\"2.2\"/><rect x=\"445\" y=\"58\" width=\"14\" height=\"14\"/><rect x=\"465\" y=\"58\" width=\"14\" height=\"14\"/><rect x=\"445\" y=\"78\" width=\"14\" height=\"14\"/><path d=\"M585 28h14v14h-14z M625 68h10v10h-10z M661 25h17v17h-17z M686 89h8v8h-8z\"/><path d=\"M242 44h30 M257 29v30 M710 54h20 M720 44v20\" opacity=\".7\"/></g>"
    },
    "MTG Pack Opener": {
        "accent": "#c6a3b2",
        "art": "<g class=\"project-banner-drawing\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linejoin=\"round\"><rect x=\"313\" y=\"19\" width=\"115\" height=\"82\" rx=\"6\" transform=\"rotate(-12 370 60)\"/><rect x=\"378\" y=\"18\" width=\"115\" height=\"82\" rx=\"6\" transform=\"rotate(7 435 59)\"/><rect x=\"453\" y=\"16\" width=\"115\" height=\"88\" rx=\"6\"/><rect x=\"468\" y=\"31\" width=\"85\" height=\"52\" rx=\"4\"/><circle cx=\"511\" cy=\"56\" r=\"18\"/><path d=\"m500 56 11-13 11 13-11 13z\"/><path d=\"M592 35h76 M601 53h54 M592 71h84 M605 89h41\" opacity=\".67\"/></g>"
    },
    "Professional Portfolio Website": {
        "accent": "#91a5d6",
        "art": "<g class=\"project-banner-drawing\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linejoin=\"round\"><rect x=\"278\" y=\"10\" width=\"329\" height=\"101\" rx=\"7\"/><path d=\"M278 31h329 M359 31v80 M291 21h5 M303 21h5 M315 21h5 M293 48h51 M293 62h42 M293 76h47\"/><rect x=\"375\" y=\"45\" width=\"92\" height=\"52\" rx=\"4\"/><path d=\"M385 59h40 M385 70h65 M385 81h54\"/><rect x=\"480\" y=\"45\" width=\"109\" height=\"22\" rx=\"4\"/><rect x=\"480\" y=\"75\" width=\"109\" height=\"22\" rx=\"4\"/><path d=\"M631 26h69 M631 47h41 M631 68h63 M631 89h55\" opacity=\".55\"/></g>"
    },
    "ESP Hardware Projects": {
        "accent": "#9cbf9b",
        "art": "<g class=\"project-banner-drawing\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"376\" y=\"17\" width=\"181\" height=\"89\" rx=\"8\"/><rect x=\"403\" y=\"34\" width=\"72\" height=\"55\" rx=\"4\"/><path d=\"M417 17V4 M440 17V4 M463 17V4 M417 106v11 M440 106v11 M463 106v11 M557 35h55l24-21h69 M557 55h87l26 27h49 M557 77h44l30 28h54 M376 38h-59l-32-28h-54 M376 68h-76l-26 25h-55\" stroke-width=\"1.8\"/><circle cx=\"705\" cy=\"14\" r=\"4\"/><circle cx=\"719\" cy=\"82\" r=\"4\"/><circle cx=\"685\" cy=\"105\" r=\"4\"/><circle cx=\"231\" cy=\"10\" r=\"4\"/><circle cx=\"219\" cy=\"93\" r=\"4\"/><path d=\"M489 40q17-13 32 0 M492 51q14-10 26 0 M497 61q8-6 16 0\"/></g>"
    },
    "Almost English Programming Language": {
        "accent": "#c5b18d",
        "art": "<g class=\"project-banner-drawing\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linejoin=\"round\" stroke-linecap=\"round\"><rect x=\"245\" y=\"17\" width=\"184\" height=\"88\" rx=\"6\"/><path d=\"M245 37h184 M260 28h5 M273 28h5 M286 28h5 M270 53h74 M270 69h122 M270 85h88\" opacity=\".86\"/><rect x=\"511\" y=\"11\" width=\"75\" height=\"25\" rx=\"5\"/><rect x=\"466\" y=\"76\" width=\"73\" height=\"25\" rx=\"5\"/><rect x=\"569\" y=\"76\" width=\"84\" height=\"25\" rx=\"5\"/><path d=\"M548 36v22 M502 58h110 M502 58v18 M612 58v18 M429 55h67\" stroke-dasharray=\"5 5\"/><circle cx=\"502\" cy=\"58\" r=\"3\" fill=\"currentColor\"/><circle cx=\"612\" cy=\"58\" r=\"3\" fill=\"currentColor\"/><path d=\"M675 24h50 M675 43h36 M675 62h54\" opacity=\".55\"/></g>"
    }
};

const projectFallbackIcons = {
    "Tower Maintenance Manager": "<svg viewBox=\"0 0 64 64\" role=\"img\" aria-label=\"Climbing wall icon\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M13 54 23 10h22l9 44H13Z M23 10l9 22 13-22 M13 54l19-22 22 22\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linejoin=\"round\"/><circle cx=\"27\" cy=\"42\" r=\"3\" fill=\"currentColor\"/><circle cx=\"38\" cy=\"22\" r=\"3\" fill=\"currentColor\"/></svg>",
    "ESP Hardware Projects": "<svg viewBox=\"0 0 64 64\" role=\"img\" aria-label=\"Microcontroller icon\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"14\" y=\"14\" width=\"36\" height=\"36\" rx=\"4\" stroke=\"currentColor\" stroke-width=\"3\"/><rect x=\"23\" y=\"23\" width=\"18\" height=\"18\" rx=\"2\" stroke=\"currentColor\" stroke-width=\"2.5\"/><path d=\"M23 5v9 M32 5v9 M41 5v9 M23 50v9 M32 50v9 M41 50v9 M5 23h9 M5 32h9 M5 41h9 M50 23h9 M50 32h9 M50 41h9\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/></svg>"
};


function createProjectBanner(project) {
    const design = projectBannerDesigns[project.title] || projectBannerDesigns["Professional Portfolio Website"];
    const banner = document.createElement("div");
    banner.className = "project-banner";
    banner.setAttribute("aria-hidden", "true");
    banner.style.setProperty("--project-banner-accent", design.accent);
    banner.innerHTML = '<svg viewBox="0 0 760 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
        design.art + '</svg>';
    return banner;
}


function addProjectIconFallback(wrapper, title) {
    const markup = projectFallbackIcons[title];

    if (markup) {
        wrapper.innerHTML = markup;
        return;
    }

    const placeholder = document.createElement("span");
    placeholder.textContent = "</>";
    wrapper.appendChild(placeholder);
}


/* =========================================
   PROJECT DATA
   ========================================= */

const projects = [

    /* =====================================
       GRID.AI
       ===================================== */

    {
        title:
            "Grid.AI",

        glossaryTerms: ["Agentic Workflows","MCP","Multi-Agent Orchestration"],

        section:
            "desktop",

        icon:
            "Images/Icons/GridAI_ICON.png",

        featured:
            true,

        description:
            "Your AI agents, your workflows, your data. Grid.AI is an actively developed, local-first multi-agent platform that turns conversations into coordinated, reviewable tasks. MCP orchestrates six specialist agents for software development, security, storage, resources, and communications, with persistent context and human-approved actions. Designed to travel on a flash drive, its prepared self-contained Windows package carries the application, local models, and runtime together so compatible computers need no separate Grid.AI or AI-model installation. Run locally, work offline, and keep control of your tools and information.",

        technologies: [
            "C#",
            ".NET",
            "SQLite",
            "Ollama",
            "Qwen3",
            "Agentic Workflows",
            "AI Agents",
            "Multi-Agent Orchestration",
            "Local AI",
            "Portable / Offline"
        ],

        learned: [
            "Designing specialized AI agents with distinct responsibilities, identities, permissions, and persistent conversation context.",
            "Coordinating agentic workflows through MCP, including specialist delegation, task planning, human review, and saved execution results.",
            "Implementing multi-agent conversations and collaboration while maintaining boundaries between private and shared context.",
            "Connecting agents to controlled local tools for repository inspection, approved build and test operations, diagnostics, and reviewed source changes.",
            "Building reliable orchestration with authorization checks, scoped memory, task persistence, and audit records across application restarts.",
            "Packaging the AI runtime, models, and saved state for self-contained flash-drive deployment without separate target-machine installation."
        ],

        images: [
            "Images/ProjectScreenshots/GridAI/PROMO_GAI_1.png",
            "Images/ProjectScreenshots/GridAI/PROMO_GAI_2.png",
            "Images/ProjectScreenshots/GridAI/PROMO_GAI_3.png"
        ],

        repoLink:
            "https://github.com/Scorpio7736/Grid.AI",

        demoLink:
            null
    },


    /* =====================================
       SCHEDULE CREATOR V2
       ===================================== */

    {
        title:
            "Schedule Creator V2",

        section:
            "desktop",

        icon:
            "Images/Logos/ScheduleCreator_LOGO.jpg",

        featured:
            true,

        description:
            "A workforce scheduling and management application designed to organize employee availability, schedules, days off, staff information, and operational workflows.",

        technologies: [
            "C#",
            ".NET",
            "WPF",
            "XAML",
            "SQL Server"
        ],

        learned: [
            "Designing and organizing larger WPF applications with multiple views.",
            "Connecting desktop applications to SQL Server databases.",
            "Building reusable scheduling and employee-management workflows.",
            "Creating validation and data-handling systems for real-world operational use."
        ],

        images: [
            "Images/ProjectScreenshots/SCV2/Promo_SCV2_1.png",
            "Images/ProjectScreenshots/SCV2/Promo_SCV2_2.png",
            "Images/ProjectScreenshots/SCV2/Promo_SCV2_3.png",
            "Images/ProjectScreenshots/SCV2/Promo_SCV2_4.png",
        ],

        repoLink:
            "https://github.com/Scorpio7736/Schedule_Creator_V2",

        demoLink:
            null
    },


    
    /* =====================================
       TOWER MAINTENANCE MANAGER
       ===================================== */

    {
        title:
            "Tower Maintenance Manager",

        glossaryTerms: [],

        section:
            "desktop",

        icon:
            null,

        featured:
            true,

        description:
            "A JavaFX desktop application designed to simplify maintenance task management for climbing tower operations. Originally developed as a console application, the project evolved into an interactive graphical interface for organizing maintenance work, estimating required hours, monitoring progress, and tracking completed tasks. Features include customizable task quantities, setup and cleanup requirements, live productivity statistics, completion timestamps, and animated feedback.",

        technologies: [
            "Java",
            "JavaFX",
            "FXML",
            "Maven",
            "OOP",
            "Java Streams"
        ],

        learned: [
            "Transitioning a console-based Java application into an interactive desktop application using JavaFX and FXML.",
            "Applying object-oriented programming principles to model maintenance tasks and work categories.",
            "Implementing event-driven interfaces with observable collections, property bindings, and interactive tables.",
            "Calculating live productivity statistics, including estimated remaining hours, completed work hours, and common task categories.",
            "Building task completion workflows with timestamps, dynamic interface updates, and animated visual feedback.",
            "Managing dependencies and application builds using Maven."
        ],

        images: [
            "Images/ProjectScreenshots/MaintenanceTaskManager/Promo_MTM_1.png"
        ],

        repoLink:
            "https://github.com/Scorpio7736/Task_Manager",

        demoLink:
            null
    },

    /* =====================================
       EASTER EGG GUIDE
       ===================================== */

    {
        title:
            "The Ultimate Easter Egg Guide",

        section:
            "mobile",

        icon:
            "Images/Logos/TheUltimateEasterEggGuide_LOGO.png",

        featured:
            true,

        description:
            "An Android application for navigating Call of Duty Zombies maps, Easter Egg steps, strategies, rewards, and supporting gameplay information.",

        technologies: [
            "Java",
            "Android",
            "XML",
            "Android Studio"
        ],

        learned: [
            "Structuring a multi-screen Android application.",
            "Designing mobile interfaces around large amounts of reference information.",
            "Managing navigation between multiple maps, guides, and tools.",
            "Creating a practical interface intended for use alongside gameplay."
        ],

        images: [
            "Images/ProjectScreenshots/TheUltimateEasterEggGuide/EasterEggGuide_1.png",
            "Images/ProjectScreenshots/TheUltimateEasterEggGuide/EasterEggGuide_2.png",
            "Images/ProjectScreenshots/TheUltimateEasterEggGuide/EasterEggGuide_3.png",
            "Images/ProjectScreenshots/TheUltimateEasterEggGuide/EasterEggGuide_4.png",
            "Images/ProjectScreenshots/TheUltimateEasterEggGuide/EasterEggGuide_5.png",
            "Images/ProjectScreenshots/TheUltimateEasterEggGuide/EasterEggGuide_6.png"
        ],

        repoLink:
            "https://github.com/Scorpio7736/TheEasterEggGuide",

        demoLink:
            null
    },


    /* =====================================
       MTG PACK OPENER
       ===================================== */

    {
        title:
            "MTG Pack Opener",

        section:
            "mobile",

        icon:
            "Images/Logos/MTGPackOpener_LOGO.png",

        featured:
            false,

        description:
            "A SwiftUI application for opening simulated Magic: The Gathering booster packs and managing card collections across multiple profiles.",

        technologies: [
            "Swift",
            "SwiftUI",
            "iOS",
            "Xcode"
        ],

        learned: [
            "Building reusable SwiftUI views and interface components.",
            "Managing application state across multiple screens.",
            "Creating profile-based workflows.",
            "Designing an interactive interface around randomized content and collections."
        ],

        images: [
            "Images/ProjectScreenshots/MTG/PROMO_MTG_1.png",
            "Images/ProjectScreenshots/MTG/PROMO_MTG_2.png",
            "Images/ProjectScreenshots/MTG/PROMO_MTG_3.png"
        ],

        repoLink:
            "https://github.com/Scorpio7736/MTG-Pack-Opener",

        demoLink:
            null
    },


    /* =====================================
       PORTFOLIO WEBSITE
       ===================================== */

    {
        title:
            "Professional Portfolio Website",

        section:
            "web",

        icon:
            "Images/Icons/Headshot_ICON.png",

        featured:
            true,

        description:
            "A custom portfolio website designed to present my software projects, technical skills, professional experience, education, and activities through a desktop-workspace-inspired interface.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "Vercel"
        ],

        learned: [
            "Designing a larger website using modular JavaScript and CSS files.",
            "Building reusable data-driven components with vanilla JavaScript.",
            "Creating responsive layouts that work across desktop and mobile devices.",
            "Developing a consistent visual system across multiple sections and page types."
        ],

        images: [
        ],

        repoLink:
            "https://github.com/Scorpio7736/JackLondon_Professional-Website",

        demoLink:
            "https://jacklondon.site"
    },


    /* =====================================
       ESP HARDWARE PROJECTS
       ===================================== */

    {
        title:
            "ESP Hardware Projects",

        section:
            "hardware",

        icon:
            null,

        featured:
            false,

        description:
            "A collection of experimental embedded-system projects focused on microcontrollers, sensors, networking, and connecting software to physical hardware.",

        technologies: [
            "ESP32",
            "C++",
            "Embedded Systems"
        ],

        learned: [
            "Working with microcontrollers and embedded hardware.",
            "Connecting software logic to physical inputs and outputs.",
            "Debugging systems where both hardware and software can cause failures.",
            "Experimenting with networking and connected-device concepts."
        ],

        images: [],

        repoLink:
            null,

        demoLink:
            null
    },


    /* =====================================
       PROGRAMMING LANGUAGE
       ===================================== */

    {
        title:
            "Almost English Programming Language",

        glossaryTerms: ["AST","Lexer","Parser"],

        section:
            "experiments",

        icon:
            "Images/Logos/AlmostEnglish_LOGO.png",

        featured:
            false,

        description:
            "An experimental programming language written in Python with syntax designed to read more naturally while still supporting traditional programming concepts.",

        technologies: [
            "Python",
            "Lexer",
            "Parser",
            "AST",
            "Interpreter"
        ],

        learned: [
            "How source code moves through lexical analysis, parsing, and execution.",
            "Designing grammar and syntax rules for a programming language.",
            "Representing source code using an abstract syntax tree.",
            "Building an interpreter that evaluates custom language constructs."
        ],

        images: [
            
        ],

        repoLink:
            null,

        demoLink:
            null
    }

];


/* =========================================
   BUILD ALL PROJECTS
   ========================================= */

function buildProjects() {

    Object.values(
        projectSectionMap
    ).forEach(
        containerId => {

            const container =
                document.getElementById(
                    containerId
                );


            if (container) {

                container.innerHTML =
                    "";

            }

        }
    );


    projects.forEach(
        project => {

            const containerId =
                projectSectionMap[
                    project.section
                ];


            if (!containerId) {

                console.warn(
                    "Unknown project section:",
                    project.section,
                    project.title
                );

                return;

            }


            const container =
                document.getElementById(
                    containerId
                );


            if (!container) {

                console.warn(
                    "Project container not found:",
                    containerId
                );

                return;

            }


            container.appendChild(
                createProjectCard(
                    project
                )
            );

        }
    );

}


/* =========================================
   CREATE PROJECT CARD
   ========================================= */

function createProjectCard(
    project
) {

    const card =
        document.createElement(
            "article"
        );


    card.classList.add(
        "project-card"
    );


    if (project.featured) {

        card.classList.add(
            "project-featured"
        );

    }


    /* =====================================
       PROJECT HEADER
       ===================================== */

    const header =
        document.createElement(
            "div"
        );


    header.classList.add(
        "project-card-header"
    );


    /* =====================================
       HEADER MAIN ROW
       ===================================== */

    const headerMain =
        document.createElement(
            "div"
        );


    headerMain.classList.add(
        "project-card-header-main"
    );


    /* =====================================
       HEADER LEFT
       ===================================== */

    const headerLeft =
        document.createElement(
            "div"
        );


    headerLeft.classList.add(
        "project-card-header-left"
    );


    /* =====================================
       ICON
       ===================================== */

    const iconWrapper =
        document.createElement(
            "div"
        );


    iconWrapper.classList.add(
        "project-card-icon"
    );


    if (project.icon) {

        const icon = document.createElement("img");
        icon.src = project.icon;
        icon.alt = project.title + " icon";
        icon.loading = "lazy";
        icon.decoding = "async";

        icon.addEventListener("error", () => {
            icon.remove();
            addProjectIconFallback(iconWrapper, project.title);
        }, { once: true });

        iconWrapper.appendChild(icon);

    } else {

        addProjectIconFallback(iconWrapper, project.title);

    }


    /* =====================================
       TITLE + LABEL
       ===================================== */

    const heading =
        document.createElement(
            "div"
        );


    heading.classList.add(
        "project-card-heading"
    );


    const eyebrow =
        document.createElement(
            "span"
        );


    eyebrow.classList.add(
        "project-card-eyebrow"
    );


    eyebrow.textContent =
        `project.${project.section}`;


    const title =
        document.createElement(
            "h2"
        );


    title.textContent =
        project.title;


    heading.appendChild(
        eyebrow
    );


    heading.appendChild(
        title
    );


    headerLeft.appendChild(
        iconWrapper
    );


    headerLeft.appendChild(
        heading
    );


    /* =====================================
       HEADER RIGHT
       ===================================== */

    const headerRight =
        document.createElement(
            "div"
        );


    headerRight.classList.add(
        "project-card-header-right"
    );


    if (project.featured) {

        const featuredBadge =
            document.createElement(
                "span"
            );


        featuredBadge.classList.add(
            "project-featured-badge"
        );


        featuredBadge.textContent =
            "Featured";


        headerRight.appendChild(
            featuredBadge
        );

    }


    /* =====================================
       BUILD MAIN HEADER
       ===================================== */

    headerMain.appendChild(
        headerLeft
    );


    headerMain.appendChild(
        headerRight
    );


    /* =====================================
       DESCRIPTION
       ===================================== */

    const description =
        document.createElement(
            "p"
        );


    description.classList.add(
        "project-description"
    );


    appendGlossaryText(description, project.description, project.glossaryTerms || []);


    header.appendChild(createProjectBanner(project));

    header.appendChild(
        headerMain
    );


    header.appendChild(
        description
    );


    /* =====================================
       INNER GRID
       ===================================== */

    const innerGrid =
        document.createElement(
            "div"
        );


    innerGrid.classList.add(
        "project-inner-grid"
    );


    /* =====================================
       STACK
       ===================================== */

    innerGrid.appendChild(
        createProjectTechnologyCell(
            project.technologies,
            project.glossaryTerms || []
        )
    );


    /* =====================================
       WHAT I LEARNED
       ===================================== */

    innerGrid.appendChild(
        createProjectLearnedCell(
            project.learned,
            project.glossaryTerms || []
        )
    );


    /* =====================================
       IMAGE GALLERY
       ===================================== */

    if (
        project.images &&
        project.images.length > 0
    ) {

        innerGrid.appendChild(
            createProjectGallery(
                project.images,
                project.title
            )
        );

    }


    card.appendChild(
        header
    );


    card.appendChild(
        innerGrid
    );


    /* =====================================
       LINKS
       ===================================== */

    if (
        project.repoLink ||
        project.demoLink
    ) {

        card.appendChild(
            createProjectLinks(
                project
            )
        );

    }


    return card;

}


/* =========================================
   TECHNOLOGY CELL
   ========================================= */

function createProjectTechnologyCell(
    technologies,
    terms = []
) {

    const cell =
        document.createElement(
            "div"
        );


    cell.classList.add(
        "project-inner-cell",
        "project-stack-cell"
    );


    const label =
        document.createElement(
            "span"
        );


    label.classList.add(
        "project-cell-label"
    );


    label.textContent =
        "Languages / Frameworks";


    const title =
        document.createElement(
            "h3"
        );


    title.textContent =
        "Stack";


    const tags =
        document.createElement(
            "div"
        );


    tags.classList.add(
        "project-stack-tags"
    );


    technologies.forEach(
        technology => {

            const tag =
                document.createElement(
                    "span"
                );


            appendGlossaryText(tag, technology, terms);


            tags.appendChild(
                tag
            );

        }
    );


    cell.appendChild(
        label
    );


    cell.appendChild(
        title
    );


    cell.appendChild(
        tags
    );


    return cell;

}


/* =========================================
   WHAT I LEARNED CELL
   ========================================= */

function createProjectLearnedCell(
    learned,
    terms = []
) {

    const cell =
        document.createElement(
            "div"
        );


    cell.classList.add(
        "project-inner-cell",
        "project-learned-cell"
    );


    const label =
        document.createElement(
            "span"
        );


    label.classList.add(
        "project-cell-label"
    );


    label.textContent =
        "Development Takeaways";


    const title =
        document.createElement(
            "h3"
        );


    title.textContent =
        "What I Learned";


    const list =
        document.createElement(
            "ul"
        );


    list.classList.add(
        "project-learned-list"
    );


    learned.forEach(
        item => {

            const listItem =
                document.createElement(
                    "li"
                );


            appendGlossaryText(listItem, item, terms);


            list.appendChild(
                listItem
            );

        }
    );


    cell.appendChild(
        label
    );


    cell.appendChild(
        title
    );


    cell.appendChild(
        list
    );


    return cell;

}


/* =========================================
   IMAGE GALLERY
   ========================================= */

function createProjectGallery(
    images,
    projectTitle
) {

    const cell =
        document.createElement(
            "div"
        );


    cell.classList.add(
        "project-inner-cell",
        "project-gallery-cell"
    );


    const label =
        document.createElement(
            "span"
        );


    label.classList.add(
        "project-cell-label"
    );


    label.textContent =
        "Project Media";


    const title =
        document.createElement(
            "h3"
        );


    title.textContent =
        "Image Gallery";


    const gallery =
        document.createElement(
            "div"
        );


    /*
        Use every image.

        The class is capped at 3 so
        anything above 3 continues
        onto another row.
    */

    const columnCount =
        Math.min(
            images.length,
            3
        );


    gallery.classList.add(
        "project-gallery",
        `project-gallery-${columnCount}`
    );


    images.forEach(
        (imagePath, index) => {

            /*
                BUTTON WRAPPER

                Using a button makes each
                image keyboard accessible.
            */

            const wrapper =
                document.createElement(
                    "button"
                );


            wrapper.type =
                "button";


            wrapper.classList.add(
                "project-gallery-image"
            );


            wrapper.setAttribute(
                "aria-label",
                `View ${projectTitle} screenshot ${index + 1}`
            );


            /*
                IMAGE
            */

            const image =
                document.createElement(
                    "img"
                );


            image.src =
                imagePath;


            image.alt =
                `${projectTitle} screenshot ${index + 1}`;


            image.loading =
                "lazy";


            /*
                IMAGE LOAD ERROR
            */

            image.addEventListener(
                "error",
                () => {

                    wrapper.style.display =
                        "none";

                }
            );


            /*
                OPEN IMAGE VIEWER
            */

            wrapper.addEventListener(
                "click",
                () => {

                    openProjectImageViewer(
                        imagePath,
                        image.alt
                    );

                }
            );


            wrapper.appendChild(
                image
            );


            gallery.appendChild(
                wrapper
            );

        }
    );


    cell.appendChild(
        label
    );


    cell.appendChild(
        title
    );


    cell.appendChild(
        gallery
    );


    return cell;

}


/* =========================================
   PROJECT IMAGE VIEWER
   ========================================= */

function openProjectImageViewer(
    imagePath,
    altText
) {

    /*
        Remove an existing viewer
        if one somehow already exists.
    */

    const existingViewer =
        document.querySelector(
            ".project-image-viewer"
        );


    if (existingViewer) {

        existingViewer.remove();

    }


    /*
        SAVE CURRENT BODY OVERFLOW
    */

    const previousOverflow =
        document.body.style.overflow;


    document.body.style.overflow =
        "hidden";


    /*
        VIEWER BACKDROP
    */

    const viewer =
        document.createElement(
            "div"
        );


    viewer.classList.add(
        "project-image-viewer"
    );


    viewer.setAttribute(
        "role",
        "dialog"
    );


    viewer.setAttribute(
        "aria-modal",
        "true"
    );


    viewer.setAttribute(
        "aria-label",
        altText
    );


    /*
        IMAGE CONTAINER
    */

    const content =
        document.createElement(
            "div"
        );


    content.classList.add(
        "project-image-viewer-content"
    );


    /*
        EXPANDED IMAGE
    */

    const image =
        document.createElement(
            "img"
        );


    image.src =
        imagePath;


    image.alt =
        altText;


    image.classList.add(
        "project-image-viewer-image"
    );


    /*
        CLOSE BUTTON
    */

    const closeButton =
        document.createElement(
            "button"
        );


    closeButton.type =
        "button";


    closeButton.classList.add(
        "project-image-viewer-close"
    );


    closeButton.setAttribute(
        "aria-label",
        "Close image viewer"
    );


    closeButton.textContent =
        "×";


    /*
        CLOSE VIEWER
    */

    const closeViewer = () => {

        document.removeEventListener(
            "keydown",
            handleKeyDown
        );


        viewer.remove();


        document.body.style.overflow =
            previousOverflow;

    };


    /*
        ESCAPE KEY
    */

    const handleKeyDown =
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeViewer();

            }

        };


    /*
        CLOSE BUTTON
    */

    closeButton.addEventListener(
        "click",
        closeViewer
    );


    /*
        CLICK BACKDROP TO CLOSE
    */

    viewer.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                viewer
            ) {

                closeViewer();

            }

        }
    );


    /*
        ESCAPE LISTENER
    */

    document.addEventListener(
        "keydown",
        handleKeyDown
    );


    /*
        BUILD VIEWER
    */

    content.appendChild(
        image
    );


    content.appendChild(
        closeButton
    );


    viewer.appendChild(
        content
    );


    document.body.appendChild(
        viewer
    );


    /*
        MOVE KEYBOARD FOCUS
        TO CLOSE BUTTON
    */

    closeButton.focus();

}


/* =========================================
   PROJECT LINKS
   ========================================= */

function createProjectLinks(
    project
) {

    const links =
        document.createElement(
            "div"
        );


    links.classList.add(
        "project-links"
    );


    /* REPOSITORY */

    if (project.repoLink) {

        const repo =
            document.createElement(
                "a"
            );


        repo.href =
            project.repoLink;


        repo.target =
            "_blank";


        repo.rel =
            "noopener noreferrer";


        repo.classList.add(
            "secondary-button"
        );


        repo.textContent =
            "View Repository";


        links.appendChild(
            repo
        );

    }


    /* DEMO */

    if (project.demoLink) {

        const demo =
            document.createElement(
                "a"
            );


        demo.href =
            project.demoLink;


        demo.target =
            "_blank";


        demo.rel =
            "noopener noreferrer";


        demo.classList.add(
            "primary-button"
        );


        demo.textContent =
            "Open Demo";


        links.appendChild(
            demo
        );

    }


    return links;

}