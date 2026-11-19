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
                    <svg
                        class="outdoors-banner-art"
                        viewBox="0 0 1200 240"
                        preserveAspectRatio="xMidYMid slice"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <defs>
                            <pattern id="outdoors-grid" width="42" height="42" patternUnits="userSpaceOnUse">
                                <path d="M42 0H0V42" fill="none" stroke="#9fc7b0" stroke-width=".6" opacity=".12"/>
                            </pattern>
                            <linearGradient id="outdoors-mountain-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#7fae96" stop-opacity=".18"/>
                                <stop offset="55%" stop-color="#a8d2bc" stop-opacity=".55"/>
                                <stop offset="100%" stop-color="#87c1c7" stop-opacity=".32"/>
                            </linearGradient>
                            <linearGradient id="outdoors-water-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#7fb3b9" stop-opacity=".12"/>
                                <stop offset="50%" stop-color="#b7d8d7" stop-opacity=".42"/>
                                <stop offset="100%" stop-color="#7ea7af" stop-opacity=".16"/>
                            </linearGradient>
                            <radialGradient id="outdoors-glow-left" cx="0%" cy="0%" r="95%">
                                <stop offset="0%" stop-color="#39584d" stop-opacity=".55"/>
                                <stop offset="45%" stop-color="#24372f" stop-opacity=".2"/>
                                <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
                            </radialGradient>
                            <radialGradient id="outdoors-glow-right" cx="100%" cy="100%" r="100%">
                                <stop offset="0%" stop-color="#2f5f66" stop-opacity=".38"/>
                                <stop offset="48%" stop-color="#1f3438" stop-opacity=".15"/>
                                <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
                            </radialGradient>
                        </defs>

                        <rect width="1200" height="240" fill="url(#outdoors-grid)"/>
                        <rect width="1200" height="240" fill="url(#outdoors-glow-left)"/>
                        <rect width="1200" height="240" fill="url(#outdoors-glow-right)"/>

                        <g fill="none" stroke="url(#outdoors-mountain-line)"
                           stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M465 156 565 92 655 152 736 78 842 161 934 110 1042 162"/>
                            <path d="M612 164 680 118 747 164" opacity=".65"/>
                            <path d="M835 162 902 126 968 162" opacity=".58"/>
                            <path d="M708 78 736 46 774 94" opacity=".38"/>
                        </g>

                        <g fill="none" stroke="url(#outdoors-water-line)"
                           stroke-width="1.4" stroke-linecap="round">
                            <path d="M0 170 C90 164 158 174 244 170 C340 165 407 175 505 170 C610 165 682 176 781 171 C888 166 972 176 1200 168"/>
                            <path d="M0 187 C98 181 177 191 269 187 C357 183 426 192 531 188 C628 184 707 194 811 189 C920 184 1002 194 1200 186" opacity=".78"/>
                            <path d="M0 205 C110 198 196 209 288 205 C375 201 454 210 553 206 C652 202 730 212 839 207 C937 203 1020 211 1200 204" opacity=".55"/>
                        </g>

                        <g fill="none" stroke="#8bb49f" stroke-width="1" opacity=".16">
                            <path d="M910 94 968 72 1042 76 1120 58"/>
                            <path d="M545 108 602 88 665 96"/>
                        </g>
                    </svg>
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