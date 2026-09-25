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

    heroImage:
        "Images/Activities/Outdoors/Boating.png",

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

            description:
                "I enjoy working on the boat almost as much as actually taking it out. Maintenance, repairs, upgrades, and figuring out why something isn't working give me another hands-on outlet for the same kind of problem solving I enjoy in software.",

            tags: [
                "Boating",
                "Maintenance",
                "Repair",
                "Problem Solving"
            ],

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

            description:
                "Fishing has always been something I associate with time spent with my grandpa. More than catching fish, it's about being on the water together, sharing stories, and continuing something we've enjoyed doing for years.",

            tags: [
                "Fishing",
                "Family",
                "Tradition",
                "Time on the Water"
            ],

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

            description:
                "Going up north is one of my favorite ways to get away for a while. Fishing, boating, being around the lake, and spending time outside make it a place where I can reset and enjoy a completely different pace from school and everyday life.",

            tags: [
                "Northern Wisconsin",
                "Fishing",
                "Boating",
                "Outdoors"
            ],

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

                <img
                    src="${this.data.heroImage}"
                    alt="Outdoor recreation"
                    class="outdoors-hero-image"
                >


                <div
                    class="outdoors-hero-overlay"
                ></div>


                <div class="outdoors-hero-copy">

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


    return `

        <article
            class="outdoors-story-card${wideClass}"
        >

            <div class="outdoors-story-image-wrapper">

                <img
                    src="${story.image}"
                    alt="${story.title}"
                    class="outdoors-story-image"
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
                ".outdoors-hero-image, .outdoors-story-image"
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