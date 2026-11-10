
/* =========================================
   PORTFOLIO EASTER EGG MANAGER
   ========================================= */

(() => {
    "use strict";

    /* =====================================
       CONFIGURATION
       ===================================== */

    const CONFIG = {

        // Maximum time between key presses
        keyTimeout: 2000,

        // Minimum time before the same
        // Easter egg can activate again
        cooldown: 3000

    };


    /* =====================================
       MARCHING BAND CONFIGURATION
       ===================================== */

    const BAND_CONFIG = {

        // One unchanged upper-body image per section. Every person uses
        // the SAME universal pair of legs for a consistent marching step.
        images: {
            percussion: "UW_Retro_Percussion_A.png",
            lowBrass: "UW_Retro_LowBrass_A.png",
            brass: "UW_Retro_Brass_A.png",
            woodwinds: "UW_Retro_Woodwinds_A.png"
        },
        legs: ["UW_UniversalLegs_A.png", "UW_UniversalLegs_B.png"],

        // Animation frames per second
        // Estimated from the actual OnWisconsin.mp3 recording.
        marchBpm: 136,

        sectionOrder: [
            "percussion", "percussion", "percussion",
            "lowBrass", "lowBrass", "lowBrass",
            "brass", "brass", "brass",
            "woodwinds", "woodwinds", "woodwinds"
        ],
        sectionGap: 16

    };


    /* =====================================
       EASTER EGG REGISTRY
       ===================================== */

    const easterEggs = [

        {
            id: "on-wisconsin",

            sequence: "ONWISCONSIN",

            description:
                "On, Wisconsin! Marching Band",

            action: () => {

                playAudio(
                    "Audio/OnWisconsin.mp3",
                    {
                        visual: "marching-band"
                    }
                );

            }
        }

        /* ADD FUTURE EASTER EGGS HERE */

    ];


    /* =====================================
       KEYBOARD STATE
       ===================================== */

    let keyBuffer = "";

    let lastKeyTime = 0;

    const lastActivated = new Map();


    /* =====================================
       AUDIO STATE
       ===================================== */

    let currentAudio = null;


    /* =====================================
       MARCHING BAND STATE
       ===================================== */

    let marchingBandBar = null;
    let marchingBandCanvas = null;

    let bandImages = null;
    let bandLegs = null;
    let bandImagesPromise = null;

    let bandAnimationFrame = null;

    let bandCurrentFrame = 0;

    let bandRunning = false;
    let bandUnitWidth = 0;
    let bandFormationWidth = 0;
    let bandAudio = null;


    /* =====================================
       CREATE MARCHING BAND
       ===================================== */

    function createMarchingBand() {

        if (marchingBandBar) {
            return marchingBandBar;
        }

        const topBar =
            document.querySelector(".top-bar");

        if (!topBar) {

            console.warn(
                "Marching band: top bar not found."
            );

            return null;

        }

        /* CREATE BAND BAR */

        const bar =
            document.createElement("div");

        bar.className =
            "marching-band-bar";

        bar.setAttribute(
            "aria-hidden",
            "true"
        );


        /* CREATE SPRITE CANVAS */

        const canvas =
            document.createElement("canvas");

        canvas.className =
            "marching-band-sprite";

        bar.appendChild(canvas);


        /* POSITION BELOW TOP BAR */

        topBar.insertAdjacentElement(
            "afterend",
            bar
        );


        /* STORE REFERENCES */

        marchingBandBar = bar;
        marchingBandCanvas = canvas;

        return bar;

    }


    /* =====================================
       PREPARE SPRITE CANVAS
       ===================================== */

    function prepareBandCanvas() {
        if (!bandImages || !bandLegs || !marchingBandCanvas) return false;
        configureBandCanvas();
        return true;
    }


    /* =====================================
       DRAW SPRITE FRAME
       ===================================== */

    function configureBandCanvas() {
        if (!marchingBandCanvas || !bandImages) return;
        const height = window.matchMedia("(max-width: 700px)").matches ? 94 : 124;
        const reference = bandImages.percussion;
        bandUnitWidth = reference.naturalWidth / reference.naturalHeight * height;
        bandFormationWidth = BAND_CONFIG.sectionOrder.length *
            (bandUnitWidth + BAND_CONFIG.sectionGap);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        marchingBandCanvas.width = Math.round(marchingBandBar.clientWidth * dpr);
        marchingBandCanvas.height = Math.round(height * dpr);
        marchingBandCanvas.style.width = "100%";
        marchingBandCanvas.style.height = height + "px";
    }


    /* =====================================
       DRAW FULL BAND UNITS
       ===================================== */

    function drawBandFrame(frame) {
        if (!bandImages || !marchingBandCanvas) return;

        const context = marchingBandCanvas.getContext("2d");
        if (!context) return;
        const dpr = marchingBandCanvas.height /
            (window.matchMedia("(max-width: 700px)").matches ? 94 : 124);
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        context.imageSmoothingEnabled = false;
        const width = marchingBandCanvas.width / dpr;
        const height = marchingBandCanvas.height / dpr;
        context.clearRect(0, 0, width, height);

        // A single long band travels completely through the viewport.
        // The first frame is empty; there is no looping/reset in the middle.
        const duration = Number.isFinite(bandAudio?.duration) && bandAudio.duration > 0
            ? bandAudio.duration : 75;
        const progress = Math.min(1, Math.max(0, bandAudio?.currentTime / duration || 0));
        const startX = -bandFormationWidth - 24;
        const travelX = width + bandFormationWidth + 48;
        const x = startX + travelX * progress;
        const unitGap = BAND_CONFIG.sectionGap;

        let sectionX = x;
        BAND_CONFIG.sectionOrder.forEach(section => {
            if (sectionX < width && sectionX + bandUnitWidth > 0) {
                const torso = bandImages[section];
                const leg = bandLegs[frame];
                const scale = height / torso.naturalHeight;
                // The six hip positions are shared by all four sprite rows.
                // Draw the universal full-leg pose six times, underneath the
                // unchanged torso/instrument artwork.
                const hips = [50, 112, 178, 245, 317, 386];
                for (const hip of hips) {
                    const legX = sectionX + (hip - 34) * torso.naturalWidth / 450 * scale;
                    context.drawImage(leg, legX, 136 * scale,
                        leg.naturalWidth * scale, leg.naturalHeight * scale);
                }
                // Cover the hip seam. Percussion extends a little farther
                // down because its drum shells overlap the trousers.
                const cutoff = section === "percussion" ? 151 : 144;
                context.drawImage(torso, 0, 0, torso.naturalWidth, cutoff,
                    sectionX, 0, bandUnitWidth, cutoff * scale);
            }
            sectionX += bandUnitWidth + unitGap;
        });
    }


    /* =====================================
       ANIMATE SPRITE
       ===================================== */

    function animateBand(timestamp) {

        if (!bandRunning) {
            return;
        }

        // One alternating left/right step on each musical beat, derived
        // from audio.currentTime so pauses and playback stalls cannot drift.
        bandCurrentFrame = Math.floor(
            (bandAudio?.currentTime || 0) * BAND_CONFIG.marchBpm / 60
        ) % 2;

        drawBandFrame(bandCurrentFrame);
        bandAnimationFrame =
            requestAnimationFrame(
                animateBand
            );

    }


    /* =====================================
       START MARCHING BAND
       ===================================== */

    function startMarchingBand(audio) {

        const bar =
            createMarchingBand();

        if (!bar) {
            return;
        }


        /* STOP PREVIOUS ANIMATION */

        stopMarchingBand();


        /* RESET ANIMATION STATE */

        bandCurrentFrame = 0;
        bandAudio = audio;

        bandRunning = true;

        // Expand the strip as soon as audio starts,
        // even if the sprite needs time to load.
        bar.classList.add("active");
        document.querySelector(".app-shell")?.classList.add("band-open");


        /* LOAD ALL MATCHED POSE PAIRS ONCE */

        if (!bandImagesPromise) {
            const load = filename => new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => resolve(image);
                image.onerror = () => reject(new Error("Missing band sprite: " + filename));
                image.src = "Images/EasterEggs/" + filename;
            });
            bandImagesPromise = Promise.all(
                Object.entries(BAND_CONFIG.images).map(async ([section, file]) =>
                    [section, await load(file)])
            ).then(entries => {
                bandImages = Object.fromEntries(entries);
                return Promise.all(BAND_CONFIG.legs.map(load));
            }).then(legs => {
                bandLegs = legs;
                return bandImages;
            }).catch(error => {
                bandImagesPromise = null;
                throw error;
            });
        }


        /* START ANIMATION WHEN READY */

        const beginAnimation = () => {

            if (!bandRunning) {
                return;
            }

            if (!prepareBandCanvas()) {

                console.error(
                    "Marching-band canvas could not initialize."
                );

                return;
            }


            /* DISPLAY FIRST FRAME */

            drawBandFrame(0);


            /* START SPRITE FRAME LOOP */

            bandAnimationFrame =
                requestAnimationFrame(
                    animateBand
                );

        };


        bandImagesPromise.then(beginAnimation).catch(error => {
            console.error("Marching band sprite failed to load:", error);
        });

    }


    /* =====================================
       STOP MARCHING BAND
       ===================================== */

    function stopMarchingBand() {

        bandRunning = false;
        bandAudio = null;


        /* CANCEL FRAME ANIMATION */

        if (bandAnimationFrame !== null) {

            cancelAnimationFrame(
                bandAnimationFrame
            );

            bandAnimationFrame = null;

        }


        /* CLOSE BAND BAR */

        if (marchingBandBar) {

            marchingBandBar.classList.remove(
                "active"
            );

        }

        document.querySelector(".app-shell")?.classList.remove("band-open");

    }


    /* =====================================
       AUDIO PLAYER
       ===================================== */

    function playAudio(
        path,
        options = {}
    ) {

        /* STOP PREVIOUS AUDIO */

        if (currentAudio) {

            currentAudio.pause();

            currentAudio.currentTime = 0;

            currentAudio = null;

        }


        /* STOP PREVIOUS VISUAL EFFECT */

        stopMarchingBand();


        /* CREATE AUDIO */

        const audio =
            new Audio(path);

        audio.volume = 0.7;

        currentAudio = audio;

        let finished = false;


        /* =================================
           FINISH AND CLEANUP
           ================================= */

        const finish = () => {

            if (finished) {
                return;
            }

            finished = true;

            if (currentAudio === audio) {

                currentAudio = null;

                stopMarchingBand();

            }

        };


        /* =================================
           AUDIO STARTED
           ================================= */

        audio.addEventListener(
            "playing",
            () => {

                if (
                    currentAudio !== audio
                ) {
                    return;
                }

                /* START MATCHING VISUAL */

                if (
                    options.visual ===
                    "marching-band"
                ) {

                    startMarchingBand(audio);

                }

            }
        );


        /* =================================
           SONG COMPLETED
           ================================= */

        audio.addEventListener(
            "ended",
            finish
        );


        /* =================================
           AUDIO ERROR
           ================================= */

        audio.addEventListener(
            "error",
            () => {

                console.warn(
                    "Easter egg audio could not load:",
                    path
                );

                finish();

            }
        );


        /* =================================
           START PLAYBACK
           ================================= */

        const playback =
            audio.play();

        if (playback) {

            playback.catch(error => {

                console.warn(
                    "Easter egg audio playback failed:",
                    error
                );

                finish();

            });

        }

    }


    /* =====================================
       IGNORE TEXT INPUTS
       ===================================== */

    function shouldIgnoreKey(event) {

        const target =
            event.target;


        /* IGNORE MODIFIER SHORTCUTS */

        if (
            event.ctrlKey ||
            event.altKey ||
            event.metaKey
        ) {

            return true;

        }


        /* IGNORE HELD KEYS */

        if (event.repeat) {
            return true;
        }


        /* IGNORE FORM INPUTS */

        if (
            target instanceof Element &&
            target.closest(
                'input, textarea, select, ' +
                '[contenteditable]:not([contenteditable="false"])'
            )
        ) {

            return true;

        }

        return false;

    }


    /* =====================================
       ACTIVATE EASTER EGG
       ===================================== */

    function activateEasterEgg(egg) {

        const now =
            Date.now();

        const previous =
            lastActivated.get(egg.id) || 0;


        /* CHECK COOLDOWN */

        if (
            now - previous <
            CONFIG.cooldown
        ) {

            return;

        }


        /* RECORD ACTIVATION */

        lastActivated.set(
            egg.id,
            now
        );


        console.log(
            "Easter egg discovered:",
            egg.id
        );


        /* EXECUTE ACTION */

        try {

            egg.action();

        }
        catch (error) {

            console.error(
                "Easter egg failed:",
                egg.id,
                error
            );

        }

    }


    /* =====================================
       KEYBOARD LISTENER
       ===================================== */

    const maxSequenceLength =
        Math.max(
            0,
            ...easterEggs.map(
                egg => egg.sequence.length
            )
        );


    document.addEventListener(
        "keydown",
        event => {

            if (shouldIgnoreKey(event)) {
                return;
            }


            /* ONLY ACCEPT LETTERS */

            if (
                !/^[a-z]$/i.test(
                    event.key
                )
            ) {

                return;

            }


            const now =
                Date.now();


            /* RESET AFTER INACTIVITY */

            if (
                now - lastKeyTime >
                CONFIG.keyTimeout
            ) {

                keyBuffer = "";

            }

            lastKeyTime = now;


            /* ADD KEY TO BUFFER */

            keyBuffer +=
                event.key.toUpperCase();


            /* LIMIT BUFFER SIZE */

            keyBuffer =
                keyBuffer.slice(
                    -maxSequenceLength
                );


            /* CHECK EASTER EGGS */

            for (const egg of easterEggs) {

                if (
                    keyBuffer.endsWith(
                        egg.sequence.toUpperCase()
                    )
                ) {

                    activateEasterEgg(egg);

                    keyBuffer = "";

                    break;

                }

            }

        }
    );


    /* =====================================
       PUBLIC UTILITIES
       ===================================== */

    window.portfolioEasterEggs = {

        /* LIST AVAILABLE EASTER EGGS */

        list: () => {

            return easterEggs.map(
                egg => ({

                    id: egg.id,

                    description:
                        egg.description

                })
            );

        },


        /* STOP AUDIO AND EFFECTS */

        stopAudio: () => {

            if (currentAudio) {

                currentAudio.pause();

                currentAudio.currentTime = 0;

                currentAudio = null;

            }

            stopMarchingBand();

        }

    };

})();
