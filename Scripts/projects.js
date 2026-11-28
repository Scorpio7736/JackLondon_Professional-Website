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
   PROJECT DATA
   ========================================= */

const projects = [

    /* =====================================
       GRID.AI
       ===================================== */

    {
        title:
            "Grid.AI",

        glossaryTerms: ["Agentic Workflows","Mcp","Multi-Agent Orchestration"],

        section:
            "desktop",

        icon:
            "Images/Icons/GridAI_ICON.png",

        featured:
            true,

        status: "Active development",
        summary: "A portable, local-first AI platform that coordinates specialized agents, maintains persistent context, and keeps automated actions under human review.",

        description:
            "Your AI agents, your workflows, your data. Grid.AI is an actively developed, local-first multi-agent platform that turns conversations into coordinated, reviewable tasks. Mcp orchestrates six specialist agents for software development, security, storage, resources, and communications, with persistent context and human-approved actions. Designed to travel on a flash drive, its prepared self-contained Windows package carries the application, local models, and runtime together so compatible computers need no separate Grid.AI or AI-model installation. Run locally, work offline, and keep control of your tools and information.",

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
            "Designed specialized agents with distinct identities, responsibilities, permissions and persistent conversation context.",
            "Implemented Mcp-based task delegation, planning, human review and saved execution results.",
            "Built multi-agent collaboration with boundaries between shared and private context.",
            "Integrated controlled local tools for repository inspection, approved builds, tests and reviewed source changes.",
            "Added authorization checks, scoped memory, task persistence and audit records.",
            "Packaged the runtime, models and saved state for self-contained flash-drive deployment."
        ],

        images: [
            "Images/ProjectScreenshots/GridAI/PROMO_GAI_1.png",
            "Images/ProjectScreenshots/GridAI/PROMO_GAI_2.png",
            "Images/ProjectScreenshots/GridAI/PROMO_GAI_3.png"
        ],

        repoLink:
            "https://github.com/Scorpio7736/Grid.AI",

        demoLink:
            "https://gridai-demo.jacklondon.site/"
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

        status: "Demo available",
        summary: "A workforce scheduling and management application for employee availability, days off, staff records and operational workflows.",

        description:
            "A workforce scheduling and management application designed to organize employee availability, schedules, days off, staff information, and operational workflows. An interactive browser demo lets visitors explore representative scheduling and staff management features using fictional data.",

        technologies: [
            "C#",
            ".NET",
            "WPF",
            "XAML",
            "SQL Server"
        ],

        learned: [
            "Built a multi-view WPF application for workforce management.",
            "Integrated SQL Server persistence for employee and scheduling data.",
            "Developed reusable scheduling and employee-management workflows.",
            "Implemented validation and data handling for real operational requirements."
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
            "https://scv2-demo.jacklondon.site"
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
            false,

        status: "Demo available",
        summary: "A JavaFX application that organizes climbing tower maintenance, estimates work hours, and tracks progress and completion.",

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
            "Converted a console application into a JavaFX/FXML desktop interface.",
            "Modeled maintenance tasks and work categories with object-oriented design.",
            "Used observable collections, property bindings and interactive tables.",
            "Calculated live productivity and estimated remaining work hours.",
            "Implemented task completion timestamps and dynamic feedback.",
            "Managed dependencies and builds using Maven."
        ],

        images: [
            "Images/ProjectScreenshots/MaintenanceTaskManager/Promo_MTM_1.png"
        ],

        repoLink:
            "https://github.com/Scorpio7736/Task_Manager",

        demoLink:
            "https://tmm-demo.jacklondon.site"
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
            false,

        status: "Mobile project",
        summary: "An Android reference app for Call of Duty Zombies maps, Easter egg steps, strategies and rewards.",

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

        status: "Mobile project",
        summary: "A SwiftUI app for simulating Magic: The Gathering booster packs and managing card collections across profiles.",

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
            false,

        status: "Live website",
        summary: "A framework-free portfolio with a desktop-inspired interface, reusable components and responsive layouts.",

        description:
            "A custom portfolio website designed to present my software projects, technical skills, professional experience, education, and activities through a desktop-workspace-inspired interface.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "Vercel"
        ],

        learned: [
            "Organized the website into modular JavaScript and CSS files.",
            "Built reusable data-driven components with vanilla JavaScript.",
            "Implemented responsive layouts across desktop and mobile.",
            "Established a shared visual system across pages."
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

        status: "Experimental",
        summary: "Embedded experiments connecting microcontrollers, sensors, networks and physical hardware.",

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
       Even G2 Glasses Agent Workflow
       ===================================== */

    {
        title:
            "Even G2 Glasses Agent Workflow",

        section:
            "hardware",

        icon:
            "Images/Icons/EvenRealities_ICON.png",

        featured:
            true,

        status: "Active development",
        summary: "Remote AI-assisted development and approval workflows through smart glasses, with cloud/local model handoffs and persistent context.",

        description:
            "A custom AI-powered development workflow that integrates Even Realities G2 smart glasses with my desktop development environment. The system enables remote interaction with AI coding agents, real-time task management, and approval requests directly through the glasses. It leverages intelligent task delegation, cloud and local AI models, and persistent context handoffs to maintain development continuity while maximizing efficiency and minimizing AI usage costs.",

        technologies: [
            "PowerShell",
            "Hardware Integrations",
            "TypeScript"
        ],

        learned: [
            "Integrated wearable hardware with AI development workflows.",
            "Designed multi-agent orchestration and task delegation.",
            "Combined cloud and local AI models to manage resource usage.",
            "Built mechanisms for preserving conversation context across providers.",
            "Developed remote communication and approval workflows.",
            "Designed fallback mechanisms and persistent connections.",
            "Developed PowerShell automation and TypeScript integrations."
        ],

        images: [
            "Images/ProjectScreenshots/G2/G2_PROMO_1.png",
            "Images/ProjectScreenshots/G2/G2_PROMO_2.png",
            "Images/ProjectScreenshots/G2/G2_PROMO_3.png"
        ],

        repoLink:
            null,

        demoLink:
            null
    },


    /* =====================================
       LINUX MCP SERVER
       ===================================== */

    {
        title:
            "Linux MCP Server",

        glossaryTerms: ["Multi-Agent Orchestration"],

        descriptionGlossaryTerms: [
            { term: "MCP", key: "Model Context Protocol" },
            "Multi-Agent Orchestration"
        ],

        stackGlossaryTerms: [
            { term: "Model Context Protocol (MCP)", key: "Model Context Protocol" },
            "Multi-Agent Orchestration"
        ],

        section:
            "hardware",

        icon:
            "Images/Icons/MCPServer_ICON.png",

        featured:
            false,

        status: "In development · planned stack",
        summary: "A self-hosted MCP server under development for Raspberry Pi 5, designed to coordinate AI agents, persistent context and permission-controlled tools.",

        description:
            "A self-hosted Model Context Protocol (MCP) server under development for a dedicated Raspberry Pi 5. Designed to provide centralized infrastructure for AI agents through persistent memory, project context, intelligent task delegation, Git automation, communication integrations, and secure user approvals. The server aims to connect cloud and local AI workflows through a provider-independent coordination layer while maintaining privacy, execution control, and development continuity. The technology stack is planned and subject to validation.",

        technologies: [
            "Linux",
            "Raspberry Pi 5",
            "Python",
            "Model Context Protocol (MCP)",
            "SQLite",
            "Docker",
            "REST APIs",
            "OAuth",
            "VoIP",
            "Multi-Agent Orchestration"
        ],

        learned: [
            "Designing centralized, self-hosted infrastructure for distributed AI agents.",
            "Architecting Model Context Protocol tools, resources, and persistent context systems.",
            "Designing hierarchical agent coordination and intelligent task delegation.",
            "Planning persistent memory, state management, and recovery across AI providers.",
            "Designing controlled Git automation and isolated multi-agent development workflows.",
            "Planning integrations with Google, Microsoft, WhatsApp, and private voice communication services.",
            "Designing secure authentication, permission management, and human approval systems.",
            "Architecting resilient Linux services with an emphasis on privacy, reliability, and resource efficiency."
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

        status: "Experimental",
        summary: "An experimental Python-based programming language designed to read more naturally while supporting traditional programming concepts.",

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

function buildSelectedWork() {
    const container = document.getElementById("homeSelectedWork");
    if (!container) return;
    container.replaceChildren();
    projects.filter(project => project.featured).forEach(project => {
        const card = document.createElement("article");
        card.className = "home-selected-card";
        const heading = document.createElement("div");
        heading.className = "home-selected-heading";
        if (project.icon) {
            const icon = document.createElement("img");
            icon.src = project.icon;
            icon.alt = "";
            icon.loading = "lazy";
            heading.appendChild(icon);
        }
        const title = document.createElement("h3");
        title.textContent = project.title;
        heading.appendChild(title);
        card.appendChild(heading);
        const description = document.createElement("p");
        description.textContent = project.summary;
        card.appendChild(description);
        const stack = document.createElement("p");
        stack.className = "home-selected-stack";
        stack.textContent = project.technologies.slice(0, 3).join(" · ");
        card.appendChild(stack);
        const actions = document.createElement("div");
        actions.className = "home-selected-actions";
        if (project.demoLink) {
            const demo = document.createElement("a");
            demo.href = project.demoLink;
            demo.target = "_blank";
            demo.rel = "noopener noreferrer";
            demo.className = "primary-button";
            demo.textContent = "Open demo";
            actions.appendChild(demo);
        }
        const view = document.createElement("button");
        view.type = "button";
        view.className = "secondary-button";
        view.textContent = project.demoLink ? "Project details" : "Explore project";
        view.addEventListener("click", () => openPage("projects", true, "projects-" + project.section));
        actions.appendChild(view);
        card.appendChild(actions);
        container.appendChild(card);
    });
}

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


    buildSelectedWork();

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

        const icon =
            document.createElement(
                "img"
            );


        icon.src =
            project.icon;


        icon.alt =
            `${project.title} icon`;


        icon.addEventListener(
            "error",
            () => {

                icon.remove();

                const placeholder =
                    document.createElement(
                        "span"
                    );


                placeholder.textContent =
                    "</>";


                iconWrapper.appendChild(
                    placeholder
                );

            },
            {
                once: true
            }
        );


        iconWrapper.appendChild(
            icon
        );

    }
    else {

        const placeholder =
            document.createElement(
                "span"
            );


        placeholder.textContent =
            "</>";


        iconWrapper.appendChild(
            placeholder
        );

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


    appendGlossaryText(title, project.title, project.glossaryTerms || []);


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


    const status = document.createElement("span");
    status.className = "project-status";
    status.textContent = project.status;
    headerRight.appendChild(status);

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


    appendGlossaryText(description, project.summary || project.description, project.descriptionGlossaryTerms ?? project.glossaryTerms ?? []);


    header.appendChild(
        headerMain
    );


    header.appendChild(
        description
    );


    const preview = document.createElement("div");
    preview.className = "project-preview-tags project-stack-tags";
    project.technologies.slice(0, 4).forEach(technology => {
        const tag = document.createElement("span");
        appendGlossaryText(tag, technology, project.stackGlossaryTerms ?? project.glossaryTerms ?? []);
        preview.appendChild(tag);
    });
    header.appendChild(preview);
    card.appendChild(header);

    if (project.repoLink || project.demoLink) {
        card.appendChild(createProjectLinks(project));
    }

    const details = document.createElement("details");
    details.className = "project-details";
    const summary = document.createElement("summary");
    summary.textContent = "View technical details";
    details.appendChild(summary);
    let initialized = false;
    details.addEventListener("toggle", () => {
        summary.textContent = details.open ? "Hide technical details" : "View technical details";
        if (!details.open || initialized) return;
        initialized = true;
        const fullDescription = document.createElement("p");
        fullDescription.className = "project-full-description";
        appendGlossaryText(fullDescription, project.description, project.descriptionGlossaryTerms ?? project.glossaryTerms ?? []);
        details.appendChild(fullDescription);
        const innerGrid = document.createElement("div");
        innerGrid.className = "project-inner-grid";
        innerGrid.appendChild(createProjectTechnologyCell(project.technologies, project.stackGlossaryTerms ?? project.glossaryTerms ?? []));
        innerGrid.appendChild(createProjectLearnedCell(project.learned, project.glossaryTerms || [], project.title));
        if (project.images?.length) {
            innerGrid.appendChild(createProjectGallery(project.images, project.title));
        }
        details.appendChild(innerGrid);
    });
    card.appendChild(details);

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

function createProjectLearnedCell(learned, terms = [], projectTitle = "") {

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
        "Technical development";


    const title =
        document.createElement(
            "h3"
        );


    title.textContent =
        projectTitle === "Linux MCP Server" ? "Planned engineering scope" : "Engineering highlights";


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