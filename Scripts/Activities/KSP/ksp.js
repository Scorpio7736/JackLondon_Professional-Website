/* =========================================
   KERBAL SPACE PROGRAM ACTIVITY
   ========================================= */


/* =========================================
   DATA
   ========================================= */

const kspActivityData = {

    title:
        "Kerbal Space Program",

    eyebrow:
        "activities.kerbal_space_program",

    subtitle:
        "Rocket Science, Engineering, and a Questionable Amount of Explosions",

    icon:
        "Images/Icons/KSP_ICON.png",

    banner:
        "Images/Banners/KSP_BANNER.png",


    /* =====================================
       TOTAL HOURS
       ===================================== */

    totalHours:
        2750,


    /* =====================================
       DESCRIPTION
       ===================================== */

    description: [

        `Kerbal Space Program is one of the games that helped turn
        my interest in engineering, spaceflight, and problem solving
        into something I could experiment with.`,

        `I've spent my time designing spacecraft, planning missions,
        testing ridiculous ideas, learning orbital mechanics, and
        discovering exactly how many boosters can be attached to a
        rocket before the answer becomes "too many."`,

        `This section is a collection of some of the spacecraft,
        aircraft, stations, and other creations I've built throughout
        my time playing Kerbal Space Program.`

    ],

    crafts: [
        {
            title:
                "Armstrong Mun Rocket",

            description:
                "DESCRIPTION",

            icon:
                "Images/Activities/KSP/Crafts/CreativeMode_VAB_Armstrong Mun Rocket.png",

            file:
                "Downloads/KSP_Crafts/Armstrong Mun Rocket.craft"
        },
        {
            title:
                "SLS - A2 ORION",

            description:
                "DESCRIPTION",

            icon:
                "Images/Activities/KSP/Crafts/CreativeMode_VAB_SLS - A2 ORION.png",

            file:
                "Downloads/KSP_Crafts/SLS_A2_ORION.craft"
        },
        {
            title:
                "Welding Shuttle",

            description:
                "DESCRIPTION",

            icon:
                "Images/Activities/KSP/Crafts/CreativeMode_VAB_Welding Shuttle.png",

            file:
                "Downloads/KSP_Crafts/Welding Shuttle.craft"
        },

    ]

};


/* =========================================
   INITIALIZE
   ========================================= */

function initializeKspActivity() {

    const container =
        document.getElementById(
            "kspActivity"
        );


    if (!container) {
        return;
    }


    renderKspActivity(
        container,
        kspActivityData
    );

}


/* =========================================
   RENDER ACTIVITY
   ========================================= */

function renderKspActivity(
    container,
    data
) {

    container.innerHTML = `

        ${renderKspHero(data)}

        <div class="ksp-content-layout">

            ${renderKspDescription(data)}

            ${renderKspHours(data)}

        </div>

        ${renderKspCraftLibrary(data)}

    `;


    setupKspImageFallbacks(
        container
    );

}


/* =========================================
   HERO
   ========================================= */

function renderKspHero(data) {

    return `

        <section class="ksp-hero">

            <div class="ksp-banner">

                <img
                    src="${data.banner}"
                    alt="Kerbal Space Program banner"
                    class="ksp-banner-image"
                >

                <div class="ksp-banner-overlay"></div>

            </div>


            <div class="ksp-hero-content">

                <div class="ksp-icon-wrapper">

                    <img
                        src="${data.icon}"
                        alt="Kerbal Space Program"
                        class="ksp-icon"
                    >

                    <div class="ksp-icon-fallback">
                        KSP
                    </div>

                </div>


                <div class="ksp-title-area">

                    <span class="section-eyebrow">
                        ${data.eyebrow}
                    </span>

                    <h2>
                        ${data.title}
                    </h2>

                    <p>
                        ${data.subtitle}
                    </p>

                </div>

            </div>

        </section>

    `;

}


/* =========================================
   DESCRIPTION
   ========================================= */

function renderKspDescription(data) {

    const paragraphs =
        data.description
            .map(
                paragraph => `
                    <p>
                        ${paragraph}
                    </p>
                `
            )
            .join("");


    return `

        <section class="ksp-panel ksp-about-panel">

            <div class="ksp-panel-heading">

                <div>

                    <span class="section-eyebrow">
                        ksp.about
                    </span>

                    <h3>
                        Why Kerbal Space Program?
                    </h3>

                </div>

            </div>


            <div class="ksp-description">

                ${paragraphs}

            </div>

        </section>

    `;

}


/* =========================================
   HOURS
   ========================================= */

function renderKspHours(data) {

    const hours =
        Number(
            data.totalHours
        );


    const formattedHours =
        Number.isFinite(hours)

            ? hours.toLocaleString()

            : "0";


    return `

        <section class="ksp-hours-card">

            <span class="section-eyebrow">
                ksp.total_runtime
            </span>


            <div class="ksp-hours-number">
                ${formattedHours}
            </div>


            <div class="ksp-hours-label">
                HOURS
            </div>


            <p>
                Total time dedicated to designing,
                launching, crashing, rebuilding,
                and occasionally landing spacecraft.
            </p>


            <div class="ksp-hours-terminal">

                <span>
                    mission_time.log
                </span>

                <span>
                    ${formattedHours}h
                </span>

            </div>

        </section>

    `;

}


/* =========================================
   CRAFT LIBRARY
   ========================================= */

function renderKspCraftLibrary(data) {

    const craftCount =
        data.crafts.length;


    let content;


    if (craftCount === 0) {

        content = `

            <div class="ksp-craft-empty">

                <div class="ksp-empty-icon">
                    🚀
                </div>

                <h4>
                    Craft Hangar Empty
                </h4>

                <p>
                    Craft files will appear here as
                    they are added to the portfolio.
                </p>

                <span>
                    awaiting_craft_files...
                </span>

            </div>

        `;

    }
    else {

        content = `

            <div class="ksp-craft-grid">

                ${data.crafts
                    .map(
                        renderKspCraftCard
                    )
                    .join("")}

            </div>

        `;

    }


    return `

        <section class="ksp-panel ksp-craft-library">

            <div class="ksp-panel-heading ksp-library-heading">

                <div>

                    <span class="section-eyebrow">
                        ksp.craft_library
                    </span>

                    <h3>
                        Craft Hangar
                    </h3>

                    <p>
                        Downloadable spacecraft and vehicles
                        I've built in Kerbal Space Program.
                    </p>

                </div>


                <div class="ksp-craft-count">

                    <strong>
                        ${craftCount}
                    </strong>

                    <span>
                        Published Crafts
                    </span>

                </div>

            </div>


            ${content}

        </section>

    `;

}


/* =========================================
   CRAFT CARD
   ========================================= */

function renderKspCraftCard(
    craft
) {

    const hasFile =
        Boolean(
            craft.file &&
            craft.file.trim()
        );


    const iconMarkup =
        craft.icon

            ? `

                <img
                    src="${craft.icon}"
                    alt="${craft.title}"
                    class="ksp-craft-icon"
                >

                <div class="ksp-craft-icon-fallback">
                    🚀
                </div>

            `

            : `

                <div class="ksp-craft-icon-placeholder">
                    🚀
                </div>

            `;


    const downloadMarkup =
        hasFile

            ? `

                <a
                    href="${craft.file}"
                    class="ksp-craft-download"
                    download
                >
                    Download Craft
                    <span>↓</span>
                </a>

            `

            : `

                <button
                    class="ksp-craft-download disabled"
                    type="button"
                    disabled
                >
                    File Coming Soon
                </button>

            `;


    return `

        <article class="ksp-craft-card">

            <div class="ksp-craft-card-header">

                <div class="ksp-craft-icon-wrapper">

                    ${iconMarkup}

                </div>


                <div class="ksp-craft-title">

                    <span>
                        .CRAFT FILE
                    </span>

                    <h4>
                        ${craft.title}
                    </h4>

                </div>

            </div>


            <p class="ksp-craft-description">
                ${craft.description}
            </p>


            <div class="ksp-craft-card-footer">

                <span class="ksp-file-type">
                    KSP / .craft
                </span>

                ${downloadMarkup}

            </div>

        </article>

    `;

}


/* =========================================
   IMAGE FALLBACKS
   ========================================= */

function setupKspImageFallbacks(
    container
) {

    const icon =
        container.querySelector(
            ".ksp-icon"
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
                            ".ksp-icon-fallback"
                        );


                if (fallback) {

                    fallback.style.display =
                        "flex";

                }

            }
        );

    }


    const banner =
        container.querySelector(
            ".ksp-banner-image"
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


    const craftIcons =
        container.querySelectorAll(
            ".ksp-craft-icon"
        );


    craftIcons.forEach(
        image => {

            image.addEventListener(
                "error",
                () => {

                    image.style.display =
                        "none";


                    const fallback =
                        image.parentElement
                            .querySelector(
                                ".ksp-craft-icon-fallback"
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


/* =========================================
   START
   ========================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeKspActivity
    );

}
else {

    initializeKspActivity();

}