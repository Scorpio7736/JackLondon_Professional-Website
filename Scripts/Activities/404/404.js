/* =========================================
   404 NETWORK ACTIVITY
   ========================================= */


/* =========================================
   DATA
   ========================================= */

const network404ActivityData = {

    title:
        "404 Network",

    subtitle:
        "Club Not Found",

    eyebrow:
        "activities.404_network",

    banner:
        "Images/Banners/404_BANNER.png",

    icon:
        "Images/Icons/404_ICON.png",


    /* =====================================
       CLUB DESCRIPTION
       ===================================== */

    description: [

        "404 Network (Club Not Found) is a community for students interested in computer science and technology. This organization provides a space to collaborate on projects, network with peers, and promote technical education through peer led sessions."

    ],


    /* =====================================
       CLUB INFORMATION
       ===================================== */

    startSemester:
        "Fall 2025",

    endSemester:
        "Current",

    currentPosition:
        "Vice President",


    /* =====================================
       OFFICERS
       ===================================== */

    officers: [

        {
            name:
                "Ethan Wollert",

            position:
                "President",

            image:
                "Images/Activities/404/Ethan_Wollert.png"
        },

        {
            name:
                "Jack London",

            position:
                "Vice President",

            image:
                "Images/Activities/404/Jack_London.png"
        },

        {
            name:
                "Ethan Onesti",

            position:
                "Treasurer",

            image:
                "Images/Activities/404/Ethan_Onesti.png"
        },
        {
            name:
                "Kasmir Siekierzynski",

            position:
                "Club Secretary",

            image:
                "Images/Activities/404/Kasmir_Siekierzynski.png"
        },
        {
            name:
                "Payton Schmidt",
            position:
                "Head of Club Marketing",
            image:
                "Images/Activities/404/Payton_Schmidt.png"
        },
        {
            name:
                "Robert VorobcheviciCondria",
            position:
                "Conference & Travel Coordinator",
            image:
                "Images/Activities/404/Robert_VorobcheviciCondria.png"
        },
        {
            name:
                "Omar Meqdadi",
            position:
                "Faculty Mentor",
            image:
                "Images/Activities/404/Omar_Meqdadi.png"
        }
        

    ],


    /* =====================================
       CLUB LINKS
       ===================================== */

    links: [

        {
            name:
                "GitHub",

            shortName:
                "GH",

            url:
                "https://github.com/404network-cnf",
            icon:
                "Images/Activities/404/404_GitHub.png"
        },

        {
            name:
                "TikTok",

            shortName:
                "TT",

            url:
                "https://www.tiktok.com/@404.network.club?_r=1&_t=ZT-99sVLIlLhuA",
            icon:
                "Images/Activities/404/404_TikTok.png"
        },

        {
            name:
                "LinkedIn",

            shortName:
                "IN",

            url:
                "https://www.linkedin.com/company/404network/posts/?feedView=all",
            icon:
                "Images/Activities/404/404_LinkedIn.png"
        },

        {
            name:
                "Instagram",

            shortName:
                "IG",

            url:
                "https://www.instagram.com/404network_cnf/",
            icon:
                "Images/Activities/404/404_Instagram.png"
        },

        {
            name:
                "Discord",

            shortName:
                "DC",

            url:
                "https://discord.gg/CH5kWjxCKB",
            icon:
                "Images/Activities/404/404_Discord.png"
        }

    ]

};


/* =========================================
   ACTIVITY CLASS
   ========================================= */

class Network404Activity {

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

            <article class="network404-shell">

                ${this.renderHero()}

                <div class="network404-content">

                    <div class="network404-main-grid">

                        ${this.renderAbout()}

                        ${this.renderClubInfo()}

                    </div>


                    ${this.renderOfficers()}


                    ${this.renderLinks()}

                </div>

            </article>

        `;

    }


    /* =====================================
       HERO
       ===================================== */

    renderHero() {

        // Faithful vector recreation of Images/Banners/404_BANNER.png.
        // Original composition and glyph proportions (1983 × 793 canvas).
        const bannerMarkup = `
            <svg class="network404-banner-art" viewBox="0 0 1983 793"
                 preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
                <defs>
                    <radialGradient id="network404-base" cx="50%" cy="48%" r="70%">
                        <stop offset="0" stop-color="#050509"/>
                        <stop offset="1" stop-color="#010204"/>
                    </radialGradient>
                    <radialGradient id="network404-cyan-corner" cx="0%" cy="100%" r="115%">
                        <stop offset="0" stop-color="#005989"/>
                        <stop offset=".52" stop-color="#002944"/>
                        <stop offset="1" stop-color="#000811"/>
                    </radialGradient>
                    <radialGradient id="network404-purple-corner" cx="100%" cy="0%" r="115%">
                        <stop offset="0" stop-color="#3d2299"/>
                        <stop offset=".65" stop-color="#1f1157"/>
                        <stop offset="1" stop-color="#070510"/>
                    </radialGradient>
                    <!-- User-space gradients ensure vertical strokes are visible. -->
                    <linearGradient id="network404-fours" gradientUnits="userSpaceOnUse"
                                    x1="550" y1="380" x2="1500" y2="550">
                        <stop offset="0" stop-color="#5b83ff"/>
                        <stop offset=".55" stop-color="#5578f5"/>
                        <stop offset="1" stop-color="#239bff"/>
                    </linearGradient>
                    <linearGradient id="network404-zero-cyan" gradientUnits="userSpaceOnUse"
                                    x1="866" y1="295" x2="1094" y2="458">
                        <stop offset="0" stop-color="#15c4f4"/>
                        <stop offset="1" stop-color="#20d9ff"/>
                    </linearGradient>
                    <linearGradient id="network404-zero-purple" gradientUnits="userSpaceOnUse"
                                    x1="925" y1="345" x2="1120" y2="535">
                        <stop offset="0" stop-color="#9966ff"/>
                        <stop offset=".52" stop-color="#8660f5"/>
                        <stop offset="1" stop-color="#6453ee"/>
                    </linearGradient>
                </defs>
                <rect width="1983" height="793" fill="url(#network404-base)"/>
                <path d="M0 0H308 C282 143 151 252 0 258Z"
                      fill="url(#network404-cyan-corner)"/>
                <path d="M1983 517V793H1629 C1662 666 1800 535 1983 517Z"
                      fill="url(#network404-purple-corner)"/>
                <g fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <!-- Blue crosses are painted first, white diagonals on top. -->
                    <g stroke="url(#network404-fours)" stroke-width="38">
                        <path d="M605 459H794 M746 401V526"/>
                        <path d="M1203 459H1394 M1346 401V526"/>
                    </g>
                    <g stroke="#f0f3fc" stroke-width="38">
                        <path d="M746 309L598 460"/>
                        <path d="M1346 309L1198 460"/>
                    </g>
                    <path d="M1050 308C987 270 923 306 889 362 C868 397 868 439 891 469"
                          stroke="url(#network404-zero-cyan)" stroke-width="35"/>
                    <path d="M1090 355C1126 418 1104 477 1067 504 C1028 537 980 541 931 510"
                          stroke="url(#network404-zero-purple)" stroke-width="35"/>
                </g>
            </svg>
        `;


        const iconMarkup =
            this.data.icon

                ? `

                    <img
                        src="${this.data.icon}"
                        alt="${this.data.title}"
                        class="network404-icon"
                    >

                    <div
                        class="network404-icon-fallback"
                    >
                        404
                    </div>

                `

                : `

                    <div
                        class="network404-icon-placeholder"
                    >
                        404
                    </div>

                `;


        return `

            <header class="network404-hero">

                <div class="network404-banner">

                    ${bannerMarkup}

                    <div
                        class="network404-banner-overlay"
                    ></div>

                </div>


                <div class="network404-hero-content">

                    <div class="network404-icon-wrapper">

                        ${iconMarkup}

                    </div>


                    <div class="network404-title-area">

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
       ABOUT
       ===================================== */

    renderAbout() {

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

            <section
                class="
                    network404-cell
                    network404-about
                "
            >

                <div class="network404-cell-heading">

                    <span class="section-eyebrow">
                        404.about
                    </span>


                    <h3>
                        About the Club
                    </h3>

                </div>


                <div class="network404-description">

                    ${paragraphs}

                </div>

            </section>

        `;

    }


    /* =====================================
       CLUB INFORMATION
       ===================================== */

    renderClubInfo() {

        return `

            <section
                class="
                    network404-cell
                    network404-info
                "
            >

                <div class="network404-cell-heading">

                    <span class="section-eyebrow">
                        404.membership
                    </span>


                    <h3>
                        My Involvement
                    </h3>

                </div>


                <div class="network404-info-list">

                    ${this.renderInfoRow(
                        "Started",
                        this.data.startSemester
                    )}


                    ${this.renderInfoRow(
                        "Ended",
                        this.data.endSemester
                    )}


                    ${this.renderInfoRow(
                        "Current Position",
                        this.data.currentPosition
                    )}

                </div>

            </section>

        `;

    }


    /* =====================================
       INFO ROW
       ===================================== */

    renderInfoRow(
        label,
        value
    ) {

        const displayValue =
            value && value.trim()

                ? value

                : "Not Added";


        return `

            <div class="network404-info-row">

                <span>
                    ${label}
                </span>


                <strong>
                    ${displayValue}
                </strong>

            </div>

        `;

    }


    /* =====================================
       OFFICERS
       ===================================== */

    renderOfficers() {

        const officers =
            this.data.officers || [];


        const officerMarkup =
            officers.length

                ? officers
                    .map(
                        officer =>
                            this.renderOfficerCard(
                                officer
                            )
                    )
                    .join("")

                : `

                    <div class="network404-empty">

                        Officer information
                        has not been added yet.

                    </div>

                `;


        return `

            <section
                class="
                    network404-cell
                    network404-officers
                "
            >

                <div class="network404-cell-heading">

                    <span class="section-eyebrow">
                        404.officers
                    </span>


                    <h3>
                        Club Officers
                    </h3>

                </div>


                <div class="network404-officer-grid">

                    ${officerMarkup}

                </div>

            </section>

        `;

    }


    /* =====================================
       OFFICER CARD
       ===================================== */

    renderOfficerCard(
        officer
    ) {

        const name =
            officer.name &&
            officer.name.trim()

                ? officer.name

                : "Officer Name";


        const position =
            officer.position &&
            officer.position.trim()

                ? officer.position

                : "Officer";


        const imageMarkup =
            officer.image &&
            officer.image.trim()

                ? `

                    <img
                        src="${officer.image}"
                        alt="${name}"
                        class="network404-officer-image"
                    >

                    <div
                        class="network404-officer-image-fallback"
                    >

                        ${this.getInitials(name)}

                    </div>

                `

                : `

                    <div
                        class="network404-officer-placeholder"
                    >

                        ${this.getInitials(name)}

                    </div>

                `;


        return `

            <article class="network404-officer-card">

                <div class="network404-officer-image-wrapper">

                    ${imageMarkup}

                </div>


                <div class="network404-officer-copy">

                    <span>
                        ${position}
                    </span>


                    <h4>
                        ${name}
                    </h4>

                </div>

            </article>

        `;

    }


    /* =====================================
       LINKS
       ===================================== */

    renderLinks() {

        const links =
            this.data.links || [];


        const linkMarkup =
            links
                .map(
                    link =>
                        this.renderLinkButton(
                            link
                        )
                )
                .join("");


        return `

            <section
                class="
                    network404-cell
                    network404-links
                "
            >

                <div class="network404-cell-heading">

                    <span class="section-eyebrow">
                        404.links
                    </span>


                    <h3>
                        Find the Club
                    </h3>

                </div>


                <div class="network404-link-grid">

                    ${linkMarkup}

                </div>

            </section>

        `;

    }

    /* =====================================
   LINK ICON
   ===================================== */

renderLinkIcon(
    link
) {

    if (
        link.icon &&
        link.icon.trim()
    ) {

        return `

            <span class="network404-link-icon">

                <img
                    src="${link.icon}"
                    alt=""
                    class="network404-link-icon-image"
                >

                <span class="network404-link-icon-fallback">
                    ${link.shortName || "404"}
                </span>

            </span>

        `;

    }


    return `

        <span class="network404-link-icon">

            <span
                class="
                    network404-link-icon-fallback
                    visible
                "
            >
                ${link.shortName || "404"}
            </span>

        </span>

    `;

}


    /* =====================================
   LINK BUTTON
   ===================================== */

renderLinkButton(
    link
) {

    const hasUrl =
        Boolean(
            link.url &&
            link.url.trim()
        );


    const iconMarkup =
        this.renderLinkIcon(
            link
        );


    if (!hasUrl) {

        return `

            <button
                class="
                    network404-link-button
                    disabled
                "
                type="button"
                disabled
            >

                ${iconMarkup}


                <span>
                    ${link.name}
                </span>

            </button>

        `;

    }


    return `

        <a
            href="${link.url}"
            class="network404-link-button"
            target="_blank"
            rel="noopener noreferrer"
        >

            ${iconMarkup}


            <span>
                ${link.name}
            </span>


            <span class="network404-link-arrow">
                ↗
            </span>

        </a>

    `;

}


    /* =====================================
       INITIALS
       ===================================== */

    getInitials(
        name
    ) {

        if (
            !name ||
            name === "Officer Name"
        ) {

            return "?";

        }


        return name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map(
                part =>
                    part.charAt(0)
            )
            .join("")
            .toUpperCase();

    }


    /* =====================================
       IMAGE FALLBACKS
       ===================================== */

    setupImageFallbacks() {

        const icon =
            this.container.querySelector(
                ".network404-icon"
            );


        if (icon) {

            icon.addEventListener(
                "error",
                () => {

                    icon.style.display =
                        "none";


                    const fallback =
                        icon.parentElement
                            .querySelector(
                                ".network404-icon-fallback"
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
                ".network404-banner-image"
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


        const officerImages =
            this.container.querySelectorAll(
                ".network404-officer-image"
            );

        const linkImages =
    this.container.querySelectorAll(
        ".network404-link-icon-image"
    );


        linkImages.forEach(
            image => {

                image.addEventListener(
                    "error",
                    () => {

                        image.style.display =
                            "none";


                        const fallback =
                            image.parentElement
                                .querySelector(
                                    ".network404-link-icon-fallback"
                                );


                        if (fallback) {

                            fallback.style.display =
                                "flex";

                        }

                    }
                );

            }
        );


        officerImages.forEach(
            image => {

                image.addEventListener(
                    "error",
                    () => {

                        image.style.display =
                            "none";


                        const fallback =
                            image.parentElement
                                .querySelector(
                                    ".network404-officer-image-fallback"
                                );


                        if (fallback) {

                            fallback.style.display =
                                "flex";

                        }

                    }
                );

            }
        );

    }

}


/* =========================================
   START
   ========================================= */

function initializeNetwork404Activity() {

    const activity =
        new Network404Activity(
            "network404Activity",
            network404ActivityData
        );


    activity.initialize();

}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeNetwork404Activity
    );

}
else {

    initializeNetwork404Activity();

}