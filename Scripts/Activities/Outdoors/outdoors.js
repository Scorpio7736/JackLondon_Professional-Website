/* =========================================
   OUTDOORS ACTIVITY
   ========================================= */


/* =========================================
   DATA
   ========================================= */

const outdoorsActivityData = {

    eyebrow:
        "activities.outdoors",

    title:
        "Outdoors",

    subtitle:
        "Boats, fishing, and getting away from the screen.",

    intro:
        "A lot of my time outside of school and software is spent around the water. Whether I'm working on the boat, fishing with my grandpa, or heading up north, it's one of my favorite ways to slow down, work with my hands, and get away from a screen for a while.",


    stories: [

        {
            title:
                "Working on the Boat",

            eyebrow:
                "outdoors.boating",

            image:
                "Images/Activities/Outdoors/Boating_2.png",

            imagePosition:
                "center 50%",

            imageLayout:
                "portrait",

            description:
                "I enjoy working on the boat almost as much as actually taking it out. Maintenance, repairs, upgrades, and figuring out why something isn't working give me another hands-on outlet for the same kind of problem solving I enjoy in software.",

            wide:
                false
        },


        {
            title:
                "Fishing with Grandpa",

            eyebrow:
                "outdoors.fishing",

            image:
                "Images/Activities/Outdoors/GPaw.png",

            imagePosition:
                "center 45%",

            imageLayout:
                "standard",

            description:
                "Fishing has always been something I associate with time spent with my grandpa. More than catching fish, it's about being on the water together, sharing stories, and continuing something we've enjoyed doing for years.",

            wide:
                false
        },


        {
            title:
                "Going Up North",

            eyebrow:
                "outdoors.up_north",

            image:
                "Images/Activities/Outdoors/Fishing.png",

            imagePosition:
                "center 50%",

            imageLayout:
                "wide",

            description:
                "Going up north is one of my favorite ways to get away for a while. Fishing, boating, being around the lake, and spending time outside make it a place where I can reset and enjoy a completely different pace from school and everyday life.",

            wide:
                true
        }

    ]

};


/* =========================================
   ACTIVITY CLASS
   ========================================= */

class OutdoorsActivity {

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
       RENDER
       ===================================== */

    render() {

        this.container.innerHTML = `

            <article class="outdoors-shell">

                ${this.renderHero()}

                <div class="outdoors-content">

                    ${this.renderIntro()}

                    ${this.renderStories()}

                </div>

            </article>

        `;

    }


    /* =====================================
       HERO
       ===================================== */

    renderHero() {

        return `

            <header class="outdoors-hero">

                <div class="outdoors-banner">
                    <img src="Images/Banners/Outdoors_BANNER.png" class="outdoors-banner-image" alt="" loading="lazy">
                    <div class="outdoors-hero-overlay"></div>
                </div>

                <div class="outdoors-hero-content">
                    <div class="outdoors-icon-wrapper" aria-hidden="true">
                        <svg class="outdoors-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 43 23 19 34 34 42 24 57 43" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="m7 43 9-7 7 4 9-8 9 8 7-5 9 8" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>
                            <path d="M9 50c6-4 11-4 17 0s11 4 17 0 10-4 12-2" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                            <circle cx="48" cy="14" r="5" fill="currentColor" opacity=".7"/>
                        </svg>
                    </div>

                    <div class="outdoors-title-area">
                        <span class="section-eyebrow">${this.data.eyebrow}</span>
                        <h2>${this.data.title}</h2>
                        <p>${this.data.subtitle}</p>
                    </div>
                </div>

            </header>

        `;

    }


    /* =====================================
       INTRO
       ===================================== */

    renderIntro() {

        return `

            <section class="outdoors-intro">

                <span class="outdoors-label">
                    Outside the Screen
                </span>


                <p>
                    ${this.data.intro}
                </p>

            </section>

        `;

    }


    /* =====================================
       STORIES
       ===================================== */

    renderStories() {

        const markup =
            this.data.stories
                .map(
                    story =>
                        this.renderStoryCard(
                            story
                        )
                )
                .join("");


        return `

            <div class="outdoors-story-grid">

                ${markup}

            </div>

        `;

    }


    /* =====================================
       STORY CARD
       ===================================== */

    renderStoryCard(
        story
    ) {

        const wideClass =
            story.wide

                ? " outdoors-story-wide"

                : "";


        const imageLayout =
            story.imageLayout ||
            "standard";


        const imageLayoutClass =
            ` outdoors-story-image-${imageLayout}`;


        return `

            <article
                class="
                    outdoors-story-card
                    ${wideClass}
                "
            >

                <div
                    class="
                        outdoors-story-image-wrapper
                        ${imageLayoutClass}
                    "
                >

                    <img
                        src="${story.image}"
                        alt="${story.title}"
                        class="outdoors-story-image"
                        style="
                            object-position:
                            ${story.imagePosition || "center"};
                        "
                    >


                    <div
                        class="outdoors-story-image-overlay"
                    ></div>


                    <div class="outdoors-story-image-title">

                        <span>
                            ${story.eyebrow}
                        </span>


                        <h3>
                            ${story.title}
                        </h3>

                    </div>

                </div>


                <div class="outdoors-story-body">

                    <p>
                        ${story.description}
                    </p>

                </div>

            </article>

        `;

    }


    /* =====================================
       IMAGE FALLBACKS
       ===================================== */

    setupImageFallbacks() {

        const images =
            this.container.querySelectorAll(
                ".outdoors-story-image"
            );


        images.forEach(
            image => {

                image.addEventListener(
                    "error",
                    () => {

                        image.style.display =
                            "none";

                    }
                );

            }
        );

    }

}


/* =========================================
   START
   ========================================= */

function initializeOutdoorsActivity() {

    const activity =
        new OutdoorsActivity(
            "outdoorsActivity",
            outdoorsActivityData
        );


    activity.initialize();

}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeOutdoorsActivity
    );

}
else {

    initializeOutdoorsActivity();

}