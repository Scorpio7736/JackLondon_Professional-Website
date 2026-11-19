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

        // Vector recreation of the original Images/Banners/404_BANNER.png:
        // black field, cyan upper-left accent, purple lower-right accent,
        // and the original centered 404 lettering.
        const bannerMarkup = `
            <svg class="network404-banner-art" viewBox="0 0 1200 480"
                 preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
                <defs>
                    <radialGradient id="network404-backlight" cx="50%" cy="49%" r="65%">
                        <stop offset="0" stop-color="#090a10"/>
                        <stop offset=".7" stop-color="#030407"/>
                        <stop offset="1" stop-color="#000000"/>
                    </radialGradient>
                    <radialGradient id="network404-cyan-corner" cx="0%" cy="0%" r="100%">
                        <stop offset="0" stop-color="#0876bc"/>
                        <stop offset=".55" stop-color="#00385f"/>
                        <stop offset="1" stop-color="#00101a"/>
                    </radialGradient>
                    <radialGradient id="network404-purple-corner" cx="100%" cy="100%" r="95%">
                        <stop offset="0" stop-color="#5338c2"/>
                        <stop offset=".62" stop-color="#23115c"/>
                        <stop offset="1" stop-color="#0a071b"/>
                    </radialGradient>
                    <linearGradient id="network404-blue-four" x1="0" y1="0" x2="1" y2="1">
                        <stop stop-color="#88b8ff"/><stop offset="1" stop-color="#2f6bff"/>
                    </linearGradient>
                    <linearGradient id="network404-ring" x1="0" y1="0" x2="1" y2="1">
                        <stop stop-color="#20d9ff"/>
                        <stop offset=".5" stop-color="#279cff"/>
                        <stop offset="1" stop-color="#7957ff"/>
                    </linearGradient>
                </defs>
                <rect width="1200" height="480" fill="url(#network404-backlight)"/>
                <path d="M0 0 H185 C173 88 117 140 0 147 Z" fill="url(#network404-cyan-corner)"/>
                <path d="M1200 285 V480 H1001 C1021 381 1095 316 1200 285 Z" fill="url(#network404-purple-corner)"/>

                <g fill="none" stroke-width="18" stroke-linecap="round" stroke-linejoin="round">
                    <!-- Stylized white-and-blue fours -->
                    <path d="M461 175 362 269 H484" stroke="#edf1fa"/>
                    <path d="M461 224 V322" stroke="url(#network404-blue-four)"/>
                    <path d="M776 175 677 269 H799" stroke="#edf1fa"/>
                    <path d="M776 224 V322" stroke="url(#network404-blue-four)"/>
                    <!-- Open circular 0 with cyan upper-left and violet lower-right -->
                    <path d="M622 179 A73 73 0 0 0 553 277" stroke="#20cafa"/>
                    <path d="M561 297 A73 73 0 0 0 652 194" stroke="url(#network404-ring)"/>
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