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

    totalHours:
        2750,

    description: [

        `Kerbal Space Program is my all-time favorite game, and I've been playing it for years. I'm a huge space nerd, so KSP has always been one of my favorite ways to experiment with spacecraft design, mission planning, and orbital mechanics.`,

        `One of my favorite parts of the game is recreating real-world spacecraft and then putting my own spin on them. I'm currently working through an alternate-history playthrough inspired by For All Mankind, where the space race continues well beyond the Moon landing and develops into a much larger era of exploration.`

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

        <article class="ksp-master-cell">

            ${renderKspHero(data)}

            <div class="ksp-master-content">

                ${renderKspDescription(data)}

                ${renderKspHours(data)}

            </div>

        </article>

    `;


    setupKspImageFallbacks(
        container
    );

}


/* =========================================
   HERO
   ========================================= */

function renderKspHero(
    data
) {

    return `

        <header class="ksp-hero">

            <div class="ksp-banner">

                <img
                    src="${data.banner}"
                    alt="Kerbal Space Program banner"
                    class="ksp-banner-image"
                >

                <div
                    class="ksp-banner-overlay"
                ></div>

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

        </header>

    `;

}


/* =========================================
   DESCRIPTION
   ========================================= */

function renderKspDescription(
    data
) {

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

        <section class="ksp-inner-cell ksp-about">

            <span class="section-eyebrow">
                ksp.about
            </span>

            <h3>
                Why Kerbal Space Program?
            </h3>


            <div class="ksp-description">

                ${paragraphs}

            </div>

        </section>

    `;

}


/* =========================================
   HOURS
   ========================================= */

function renderKspHours(
    data
) {

    const hours =
        Number(
            data.totalHours
        );


    const formattedHours =
        Number.isFinite(hours)

            ? hours.toLocaleString()

            : "0";


    return `

        <section class="ksp-inner-cell ksp-hours-card">

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