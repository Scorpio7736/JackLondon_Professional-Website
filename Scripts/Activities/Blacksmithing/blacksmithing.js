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

    featureImage:
        "Images/Banners/PFP_BANNER.png",

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
        "7 Blacksmithing Fundamentals",
        "Wleding",
        "Heat Management",
        "Tool Use and Maintenance",
        "Material Behavior"

    ],

    projects: [
        {
            title: "Forged Rose",

            image:
                "Images/Activities/Blacksmithing/ForgedRose.png",

            material:
                "Mild Steel",

            techniques: [
                "Drawing",
                "Rolling",
                "Hot-Cutting"
            ],

            description:
                "Hand-forged Rose made from mild steel."
        },
        {
            title: "Fredrichs Cross",

            image:
                "Images/Activities/Blacksmithing/ForgedCross.png",

            material:
                "Mild Steel",

            techniques: [
                "Drawing",
                "Hot-Cutting",
                "Brass Accenting"
            ],

            description:
                "Hand-forged Cross made from mild steel and brushed with brass."
        },
        {
            title: "Feather Hook",

            image:
                "Images/Activities/Blacksmithing/FeatherHook.png",

            material:
                "1/2 Inch Angle Iron",

            techniques: [
                "Brass Accenting",
                "Forge Welding",
                "Hot Punching"
            ],

            description:
                "A hand forged wall hook in the shape of an eagles feather."
        },
        {
            title: "Kindling Splitter",

            image:
                "Images/Activities/Blacksmithing/KindlingSplitter.png",

            material:
                "1080 Tool Steel",

            techniques: [
                "Hardening & Tempering",
                "Fabrication"
            ],

            description:
                "A wall mounted kindling splitter made with 1080 tool steel."
        },
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

            <div class="blacksmithing-split">

                ${this.renderVisual()}

                ${this.renderContent()}

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

        const logo =
            this.container.querySelector(
                ".blacksmithing-logo"
            );


        if (logo) {

            logo.addEventListener(
                "error",
                () => {

                    logo.style.display =
                        "none";


                    const fallback =
                        logo.parentElement
                            .querySelector(
                                ".blacksmithing-logo-fallback"
                            );


                    if (fallback) {

                        fallback.style.display =
                            "flex";

                    }

                }
            );

        }


        const featureImage =
            this.container.querySelector(
                ".blacksmithing-feature-image"
            );


        if (featureImage) {

            featureImage.addEventListener(
                "error",
                () => {

                    featureImage.style.display =
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