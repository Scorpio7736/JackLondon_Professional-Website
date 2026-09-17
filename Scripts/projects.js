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
       SCHEDULE CREATOR V2
       ===================================== */

    {
        title:
            "Schedule Creator V2",

        section:
            "desktop",

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
            "Images/Projects/ScheduleCreator/ScheduleCreator_1.png",
            "Images/Projects/ScheduleCreator/ScheduleCreator_2.png",
            "Images/Projects/ScheduleCreator/ScheduleCreator_3.png"
        ],

        repoLink:
            "https://github.com/Scorpio7736/Schedule_Creator_V2",

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
            "Images/Projects/EasterEggGuide/EasterEggGuide_1.png",
            "Images/Projects/EasterEggGuide/EasterEggGuide_2.png",
            "Images/Projects/EasterEggGuide/EasterEggGuide_3.png"
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
            "Images/Projects/MTGPackOpener/MTG_1.png",
            "Images/Projects/MTGPackOpener/MTG_2.png",
            "Images/Projects/MTGPackOpener/MTG_3.png"
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
            "Images/Projects/Portfolio/Portfolio_1.png",
            "Images/Projects/Portfolio/Portfolio_2.png",
            "Images/Projects/Portfolio/Portfolio_3.png"
        ],

        repoLink:
            "https://github.com/Scorpio7736/JackLondon_Professional-Website",

        demoLink:
            "https://jacklondon.site"
    },


    /* =====================================
       EXAMPLE HARDWARE PROJECT

       Replace this when ready.
       ===================================== */

    {
        title:
            "ESP Hardware Projects",

        section:
            "hardware",

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
            "English-Like Programming Language",

        section:
            "experiments",

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

        images: [],

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

    /*
        Clear every section first.
    */

    Object.values(
        projectSectionMap
    ).forEach(
        containerId => {

            const container =
                document.getElementById(
                    containerId
                );


            if (container) {

                container.innerHTML = "";

            }

        }
    );


    /*
        Each project belongs to ONE
        section only.
    */

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


    /* TOP LINE */

    const headerTop =
        document.createElement(
            "div"
        );


    headerTop.classList.add(
        "project-card-header-top"
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


    headerTop.appendChild(
        eyebrow
    );


    /* FEATURED BADGE */

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


        headerTop.appendChild(
            featuredBadge
        );

    }


    const title =
        document.createElement(
            "h2"
        );


    title.textContent =
        project.title;


    const description =
        document.createElement(
            "p"
        );


    description.textContent =
        project.description;


    header.appendChild(
        headerTop
    );


    header.appendChild(
        title
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
            project.technologies
        )
    );


    /* =====================================
       WHAT I LEARNED
       ===================================== */

    innerGrid.appendChild(
        createProjectLearnedCell(
            project.learned
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


    /* =====================================
       BUILD CARD
       ===================================== */

    card.appendChild(
        header
    );


    card.appendChild(
        innerGrid
    );


    /* =====================================
       OPTIONAL LINKS
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
    technologies
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


            tag.textContent =
                technology;


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
    learned
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


            listItem.textContent =
                item;


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


    const galleryImages =
        images.slice(
            0,
            3
        );


    gallery.classList.add(
        "project-gallery",
        `project-gallery-${galleryImages.length}`
    );


    galleryImages.forEach(
        (imagePath, index) => {

            const wrapper =
                document.createElement(
                    "div"
                );


            wrapper.classList.add(
                "project-gallery-image"
            );


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


            image.addEventListener(
                "error",
                () => {

                    wrapper.style.display =
                        "none";

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