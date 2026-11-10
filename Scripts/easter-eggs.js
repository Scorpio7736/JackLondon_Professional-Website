
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
        legs: ["UW_UniversalLegs_Step_A.png", "UW_UniversalLegs_Step_B.png"],
        drumMajorCar: ["UW_DrumMajorCar_A.png", "UW_DrumMajorCar_B.png"],
        finaleCar: ["UW_JackFinaleCar_Driver_A.png", "UW_JackFinaleCar_Driver_B.png"],
        leadGap: 24,
        finaleGap: 24,

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
    let pendingPlaybackTimer = null;


    /* =====================================
       MARCHING BAND STATE
       ===================================== */

    let marchingBandBar = null;
    let marchingBandCanvas = null;

    let bandImages = null;
    let bandLegs = null;
    let bandCar = null;
    let bandFinaleCar = null;
    let bandImagesPromise = null;

    let bandAnimationFrame = null;

    let bandCurrentFrame = 0;

    let bandRunning = false;
    let bandUnitWidth = 0;
    let bandFormationWidth = 0;
    let bandAudio = null;
    let bandCloseTimer = null;
    const bandTransitionMs = 600;


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
        if (!bandImages || !bandLegs || !bandCar || !bandFinaleCar || !marchingBandCanvas) return false;
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
        const carHeight = height * 0.89;
        const carWidth = carHeight * 1.55;
        const finaleHeight = height * 0.89;
        const finaleWidth = finaleHeight * 1.65;
        const leadingWidth = bandFormationWidth + BAND_CONFIG.leadGap + carWidth;
        const processionWidth = leadingWidth + BAND_CONFIG.finaleGap + finaleWidth;
        // Start with the lead car just outside the left edge. The finale
        // car follows behind the last musician and leaves the screen last.
        const startX = -leadingWidth - 24;
        const travelX = width + processionWidth + 48;
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
                    context.drawImage(leg, legX, 137 * scale,
                        68 * scale, 48 * scale);
                }
                // Cover the hip seam. Percussion extends a little farther
                // down because its drum shells overlap the trousers.
                const cutoff = section === "percussion" ? 151 : 144;
                context.drawImage(torso, 0, 0, torso.naturalWidth, cutoff,
                    sectionX, 0, bandUnitWidth, cutoff * scale);
            }
            sectionX += bandUnitWidth + unitGap;
        });

        // The lead vehicle drives right ahead of the band. The drum major
        // stands in the rear facing left toward the following musicians.
        const carX = x + bandFormationWidth + BAND_CONFIG.leadGap;
        if (carX < width && carX + carWidth > 0) {
            context.drawImage(bandCar[frame], carX,
                (height - carHeight) / 2, carWidth, carHeight);
        }

        // Jack's black car and Wisconsin flag close the parade.
        const finaleX = x - BAND_CONFIG.finaleGap - finaleWidth;
        if (finaleX < width && finaleX + finaleWidth > 0) {
            context.drawImage(bandFinaleCar[frame], finaleX,
                (height - finaleHeight) / 2, finaleWidth, finaleHeight);
        }
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

        // A previous closing animation must not remove the layout class
        // after this new parade has opened.
        if (bandCloseTimer !== null) {
            clearTimeout(bandCloseTimer);
            bandCloseTimer = null;
        }


        /* RESET ANIMATION STATE */

        bandCurrentFrame = 0;
        bandAudio = audio;

        bandRunning = true;

        // Open the strip before playback; the first drawn frame is empty.
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
                return Promise.all(BAND_CONFIG.drumMajorCar.map(load));
            }).then(car => {
                bandCar = car;
                return Promise.all(BAND_CONFIG.finaleCar.map(load));
            }).then(finale => {
                bandFinaleCar = finale;
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

        // Keep the shell in its flex layout until the strip has folded away.
        if (bandCloseTimer !== null) clearTimeout(bandCloseTimer);
        bandCloseTimer = setTimeout(() => {
            document.querySelector(".app-shell")?.classList.remove("band-open");
            bandCloseTimer = null;
        }, bandTransitionMs);

    }


    /* =====================================
       AUDIO PLAYER
       ===================================== */

    function playAudio(
        path,
        options = {}
    ) {

        /* CANCEL ANY PENDING OPENING / PLAYBACK */

        if (pendingPlaybackTimer !== null) {
            clearTimeout(pendingPlaybackTimer);
            pendingPlaybackTimer = null;
        }

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

            if (pendingPlaybackTimer !== null) {
                clearTimeout(pendingPlaybackTimer);
                pendingPlaybackTimer = null;
            }

            if (currentAudio === audio) {

                currentAudio = null;

                stopMarchingBand();

            }

        };


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

        const startPlayback = () => {
            pendingPlaybackTimer = null;
            if (finished || currentAudio !== audio) return;
            const playback = audio.play();
            if (playback) playback.catch(error => {
                console.warn("Easter egg audio playback failed:", error);
                finish();
            });
        };

        if (options.visual === "marching-band") {
            startMarchingBand(audio);
            // Allow the box to finish expanding before the song begins.
            pendingPlaybackTimer = setTimeout(startPlayback, bandTransitionMs);
        } else {
            startPlayback();
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
