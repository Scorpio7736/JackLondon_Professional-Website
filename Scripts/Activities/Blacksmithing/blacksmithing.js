/* =========================================
   BLACKSMITHING & METALWORK ACTIVITY
   ========================================= */


/* =========================================
   DATA
   ========================================= */

const blacksmithingActivityData = {

    eyebrow:
        "activities.blacksmithing",

    title:
        "Blacksmithing & Metalwork",

    subtitle:
        "Forging, fabrication, and hands-on metalwork",

    organization:
        "Black Oak Forge",

    role:
        "Blacksmithing Apprenticeship",

    startDate:
        "Summer 2020",

    endDate:
        "Winter 2022",

    banner:
        "Images/Banners/Blacksmithing_BANNER.png",

    icon:
        "Images/Icons/Blacksmithing_ICON.png",

    iconFallback:
        "BOF",

    description: [
        "My blacksmithing apprenticeship at Black Oak Forge gave me hands-on experience working with traditional forging techniques, heated steel, metalworking tools, and fabrication.",

        "Blacksmithing gives me a different kind of problem solving than software. Instead of debugging code, the challenge is understanding the material, controlling heat, planning each operation, and physically shaping an idea into a finished piece."
    ],

    skills: [
        "Traditional Forging",
        "Metal Shaping",
        "Fabrication",
        "Heat Management",
        "Tool Use",
        "Material Behavior"
    ],

    projects: [
        {
            title: "Forged Rose",
            image: "Images/Activities/Blacksmithing/ForgedRose.png",
            material: "Mild Steel",
            techniques: [
                "Drawing",
                "Bending",
                "Scrolling",
                "Finishing"
            ],
            description:
                "A hand-forged rose made from mild steel, focused on shaping organic forms and clean decorative detail."
        },

        {
            title: "Fredrichs Cross",
            image: "Images/Activities/Blacksmithing/ForgedCross.png",
            material: "Mild Steel / Brass Accenting",
            techniques: [
                "Forge Shaping",
                "Joinery",
                "Decorative Work"
            ],
            description:
                "Decorative forged cross featuring steel construction with brass accenting and detail work."
        },

        {
            title: "Feather Hook",
            image: "Images/Activities/Blacksmithing/FeatherHook.png",
            material: "1/2-inch Angle Iron",
            techniques: [
                "Tapering",
                "Texturing",
                "Forging"
            ],
            description:
                "A forged utility hook shaped with feather-inspired detailing, combining function with decorative metalwork."
        },

        {
            title: "Kindling Splitter",
            image: "Images/Activities/Blacksmithing/KindlingSplitter.png",
            material: "1080 Tool Steel",
            techniques: [
                "Forging",
                "Blade Shaping",
                "Heat Treatment"
            ],
            description:
                "A functional kindling splitter forged from 1080 tool steel with emphasis on durability and practical use."
        }
    ]

};


/* =========================================
   ACTIVITY CLASS
   ========================================= */

class BlacksmithingActivity {

    constructor(
        containerId,
        data
    ) {

        this.container =
            document.getElementById(
                containerId
            );

        this.data =
            data;

    }


    /* =====================================
       INITIALIZE
       ===================================== */

    initialize() {

        if (!this.container) {

            return;

        }


        this.render();

        this.setupImageFallbacks();

    }


    /* =====================================
       MAIN RENDER
       ===================================== */

    render() {

    this.container.innerHTML = `

        <article class="blacksmithing-shell">

            ${this.renderHero()}

            <div class="blacksmithing-content">

                ${this.renderExperience()}

                ${this.renderDescription()}

                ${this.renderSkills()}

            </div>

            ${this.renderProjects()}

        </article>

    `;

}


    /* =====================================
       LEFT VISUAL
       ===================================== */

    renderVisual() {

        return `

            <div class="blacksmithing-visual">

                <img
                    src="${this.data.featureImage}"
                    alt="${this.data.title}"
                    class="blacksmithing-feature-image"
                >


                <div
                    class="blacksmithing-image-overlay"
                ></div>


                <div class="blacksmithing-image-caption">

                    <span class="blacksmithing-image-label">
                        Apprenticed At
                    </span>

                    <strong>
                        ${this.data.organization}
                    </strong>

                </div>


                <div class="blacksmithing-logo-wrapper">

                    <img
                        src="${this.data.icon}"
                        alt="${this.data.organization}"
                        class="blacksmithing-logo"
                    >

                    <span
                        class="blacksmithing-logo-fallback"
                    >
                        ${this.data.iconFallback}
                    </span>

                </div>

            </div>

        `;

    }

    renderHero() {

    return `

        <header class="blacksmithing-hero">

            <div class="blacksmithing-banner">

                <img
                    src="${this.data.banner}"
                    alt="${this.data.title} banner"
                    class="blacksmithing-banner-image"
                >

                <div
                    class="blacksmithing-banner-overlay"
                ></div>

            </div>


            <div class="blacksmithing-hero-content">

                <div class="blacksmithing-icon-wrapper">

                    <img
                        src="${this.data.icon}"
                        alt="${this.data.organization}"
                        class="blacksmithing-icon"
                    >

                    <div class="blacksmithing-icon-fallback">
                        ${this.data.iconFallback}
                    </div>

                </div>


                <div class="blacksmithing-title-area">

                    <span class="section-eyebrow">
                        ${this.data.eyebrow}
                    </span>

                    <h2>
                        ${this.data.title}
                    </h2>

                    <p>
                        ${this.data.subtitle}
                    </p>

                </div>

            </div>

        </header>

    `;

}


    /* =====================================
       RIGHT CONTENT
       ===================================== */

    renderContent() {

        return `

            <div class="blacksmithing-content">

                <header class="blacksmithing-header">

                    <span class="section-eyebrow">
                        ${this.data.eyebrow}
                    </span>


                    <h2>
                        ${this.data.title}
                    </h2>


                    <p class="blacksmithing-subtitle">
                        ${this.data.subtitle}
                    </p>

                </header>


                ${this.renderExperience()}


                ${this.renderDescription()}


                ${this.renderSkills()}

            </div>

        `;

    }


    /* =====================================
       EXPERIENCE
       ===================================== */

    renderExperience() {

        return `

            <section class="blacksmithing-experience">

                <span class="blacksmithing-label">
                    Experience
                </span>


                <h3>
                    ${this.data.role}
                </h3>


                <div class="blacksmithing-experience-meta">

                    <div>

                        <span>
                            Organization
                        </span>

                        <strong>
                            ${this.data.organization}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Timeline
                        </span>

                        <strong>
                            ${this.data.startDate}
                            —
                            ${this.data.endDate}
                        </strong>

                    </div>

                </div>

            </section>

        `;

    }


    /* =====================================
       DESCRIPTION
       ===================================== */

    renderDescription() {

        const paragraphs =
            this.data.description
                .filter(
                    paragraph =>
                        paragraph &&
                        paragraph.trim()
                )
                .map(
                    paragraph => `

                        <p>
                            ${paragraph}
                        </p>

                    `
                )
                .join("");


        return `

            <section class="blacksmithing-about">

                <span class="blacksmithing-label">
                    About
                </span>

                ${paragraphs}

            </section>

        `;

    }


    /* =====================================
       SKILLS
       ===================================== */

    renderSkills() {

        const skillMarkup =
            this.data.skills
                .map(
                    skill => `

                        <span class="blacksmithing-skill">
                            ${skill}
                        </span>

                    `
                )
                .join("");


        return `

            <section class="blacksmithing-skills">

                <span class="blacksmithing-label">
                    Techniques & Skills
                </span>


                <div class="blacksmithing-skill-list">

                    ${skillMarkup}

                </div>

            </section>

        `;

    }


    /* =====================================
       PROJECTS
       ===================================== */

    renderProjects() {

        const projects =
            this.data.projects || [];


        const projectMarkup =
            projects.length > 0

                ? projects
                    .map(
                        project =>
                            this.renderProjectCard(
                                project
                            )
                    )
                    .join("")

                : `

                    <div class="blacksmithing-project-empty">

                        <span class="blacksmithing-project-empty-icon">
                            ⚒
                        </span>

                        <div>

                            <h4>
                                Metalwork gallery coming next
                            </h4>

                            <p>
                                This section is ready for individual
                                forged pieces, fabrication projects,
                                process photos, materials, and techniques.
                            </p>

                        </div>

                    </div>

                `;


        return `

            <section class="blacksmithing-project-section">

                <div class="blacksmithing-project-heading">

                    <span class="section-eyebrow">
                        metalwork.projects
                    </span>

                    <h3>
                        Metalwork Projects
                    </h3>

                </div>


                <div class="blacksmithing-project-grid">

                    ${projectMarkup}

                </div>

            </section>

        `;

    }


    /* =====================================
       PROJECT CARD
       ===================================== */

    renderProjectCard(
        project
    ) {

        const techniques =
            project.techniques || [];


        const techniqueMarkup =
            techniques
                .map(
                    technique => `

                        <span>
                            ${technique}
                        </span>

                    `
                )
                .join("");


        const imageMarkup =
            project.image

                ? `

                    <img
                        src="${project.image}"
                        alt="${project.title}"
                        class="blacksmithing-project-image"
                    >

                `

                : `

                    <div
                        class="blacksmithing-project-placeholder"
                    >
                        ⚒
                    </div>

                `;


        return `

            <article class="blacksmithing-project-card">

                <div class="blacksmithing-project-visual">

                    ${imageMarkup}

                </div>


                <div class="blacksmithing-project-body">

                    <h4>
                        ${project.title}
                    </h4>


                    ${
                        project.material

                            ? `

                                <span class="blacksmithing-project-material">
                                    ${project.material}
                                </span>

                            `

                            : ""
                    }


                    <p>
                        ${project.description || ""}
                    </p>


                    ${
                        techniques.length

                            ? `

                                <div
                                    class="blacksmithing-project-techniques"
                                >
                                    ${techniqueMarkup}
                                </div>

                            `

                            : ""
                    }

                </div>

            </article>

        `;

    }


    /* =====================================
       IMAGE FALLBACKS
       ===================================== */

    setupImageFallbacks() {

    const icon =
        this.container.querySelector(
            ".blacksmithing-icon"
        );

    if (icon) {

        icon.addEventListener(
            "error",
            () => {

                icon.style.display =
                    "none";

                const fallback =
                    icon.parentElement.querySelector(
                        ".blacksmithing-icon-fallback"
                    );

                if (fallback) {

                    fallback.style.display =
                        "flex";

                }

            }
        );

    }


    const banner =
        this.container.querySelector(
            ".blacksmithing-banner-image"
        );

    if (banner) {

        banner.addEventListener(
            "error",
            () => {

                banner.style.display =
                    "none";

            }
        );

    }


    const projectImages =
        this.container.querySelectorAll(
            ".blacksmithing-project-image"
        );

    projectImages.forEach(
        image => {

            image.addEventListener(
                "error",
                () => {

                    image.style.display =
                        "none";

                    const placeholder =
                        document.createElement(
                            "div"
                        );

                    placeholder.classList.add(
                        "blacksmithing-project-placeholder"
                    );

                    placeholder.textContent =
                        "⚒";

                    image.parentElement.appendChild(
                        placeholder
                    );

                }
            );

        }
    );

}

}


/* =========================================
   START
   ========================================= */

function initializeBlacksmithingActivity() {

    const activity =
        new BlacksmithingActivity(
            "blacksmithingActivity",
            blacksmithingActivityData
        );


    activity.initialize();

}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeBlacksmithingActivity
    );

}
else {

    initializeBlacksmithingActivity();

}