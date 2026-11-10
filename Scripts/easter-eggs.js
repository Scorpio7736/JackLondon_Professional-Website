
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

        // Horizontal sprite sheet
        image:
            "Images/EasterEggs/UW_MarchingBand.png",

        // Number of equally sized frames
        // across the sprite sheet.
        // CHANGE THIS if your sheet
        // has a different frame count.
        frameCount: 6,

        // Animation frames per second
        framesPerSecond: 8

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

    let bandImage = null;

    let bandAnimationFrame = null;

    let bandLastFrameTime = 0;
    let bandCurrentFrame = 0;

    let bandRunning = false;
    let bandCrop = null;
    let bandCellWidth = 0;
    let bandTileWidth = 0;
    let bandRepeatCount = 0;


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
        if (!bandImage || !marchingBandCanvas) return false;

        const count = BAND_CONFIG.frameCount;
        const cellWidth = Math.floor(bandImage.naturalWidth / count);
        const cellHeight = bandImage.naturalHeight;
        if (cellWidth < 1 || cellHeight < 1) {
            console.error("Invalid band sprite size:", bandImage.naturalWidth, cellHeight);
            return false;
        }

        // Inspect transparent pixels in every cell. Use one shared
        // crop so the full formation does not jump between frames.
        const scan = document.createElement("canvas");
        scan.width = bandImage.naturalWidth;
        scan.height = cellHeight;
        const context = scan.getContext("2d", { willReadFrequently: true });
        if (!context) return false;
        context.drawImage(bandImage, 0, 0);

        let pixels;
        try {
            pixels = context.getImageData(0, 0, scan.width, scan.height).data;
        } catch (error) {
            // Safe fallback when reading pixel data is unavailable.
            console.warn("Using full sprite cell:", error);
            bandCellWidth = cellWidth;
            bandCrop = { x: 0, y: 0, width: cellWidth, height: cellHeight };
            configureBandCanvas();
            return true;
        }

        let minX = cellWidth, minY = cellHeight;
        let maxX = -1, maxY = -1;
        for (let frame = 0; frame < count; frame++) {
            for (let y = 0; y < cellHeight; y++) {
                for (let x = 0; x < cellWidth; x++) {
                    const offset = (y * scan.width + frame * cellWidth + x) * 4;
                    const alpha = pixels[offset + 3];
                    // Ignore transparent and nearly transparent pixels.
                    if (alpha <= 24) continue;
                    minX = Math.min(minX, x);
                    maxX = Math.max(maxX, x);
                    minY = Math.min(minY, y);
                    maxY = Math.max(maxY, y);
                }
            }
        }

        if (maxX < minX || maxY < minY) {
            // Never leave the strip blank if transparency
            // analysis finds no pixels; show the full cell.
            console.warn("Band crop was empty; using full sprite cell.");
            minX = 0;
            minY = 0;
            maxX = cellWidth - 1;
            maxY = cellHeight - 1;
        }

        bandCellWidth = cellWidth;
        bandCrop = {
            x: minX,
            y: minY,
            width: maxX - minX + 1,
            height: maxY - minY + 1
        };

        configureBandCanvas();
        console.info("Marching-band crop:", bandCrop);
        return true;
    }


    /* =====================================
       DRAW SPRITE FRAME
       ===================================== */

    function configureBandCanvas() {
        if (!marchingBandCanvas || !bandCrop) return;

        // Each frame already depicts a complete 6x3 unit.
        // Repeat those units with a small visual gap until the
        // entire browser width is covered (plus room to scroll).
        const displayHeight = window.matchMedia("(max-width: 700px)").matches
            ? 68 : 86;
        const gapPx = 12;
        const scale = displayHeight / bandCrop.height;
        const gapSourcePx = Math.max(1, Math.round(gapPx / scale));

        bandTileWidth = bandCrop.width + gapSourcePx;
        const displayTileWidth = bandTileWidth * scale;
        bandRepeatCount = Math.min(
            100,
            Math.ceil(window.innerWidth / displayTileWidth) + 3
        );

        marchingBandCanvas.width = bandTileWidth * bandRepeatCount;
        marchingBandCanvas.height = bandCrop.height;
        marchingBandCanvas.style.setProperty(
            "--band-shift", "-" + displayTileWidth + "px"
        );

        console.info("Marching band units:", bandRepeatCount);
    }


    /* =====================================
       DRAW FULL BAND UNITS
       ===================================== */

    function drawBandFrame(frame) {
        if (!bandImage || !marchingBandCanvas || !bandCrop) return;

        const context = marchingBandCanvas.getContext("2d");
        if (!context) return;
        context.imageSmoothingEnabled = false;
        context.clearRect(
            0, 0, marchingBandCanvas.width, marchingBandCanvas.height
        );

        for (let i = 0; i < bandRepeatCount; i++) {
            context.drawImage(
                bandImage,
                frame * bandCellWidth + bandCrop.x,
                bandCrop.y,
                bandCrop.width,
                bandCrop.height,
                i * bandTileWidth,
                0,
                bandCrop.width,
                bandCrop.height
            );
        }
    }


    /* =====================================
       ANIMATE SPRITE
       ===================================== */

    function animateBand(timestamp) {

        if (!bandRunning) {
            return;
        }

        const frameInterval =
            1000 /
            BAND_CONFIG.framesPerSecond;

        if (!bandLastFrameTime) {
            bandLastFrameTime = timestamp;
        }

        const elapsed =
            timestamp - bandLastFrameTime;

        if (elapsed >= frameInterval) {

            const framesToAdvance =
                Math.floor(
                    elapsed / frameInterval
                );

            bandCurrentFrame =
                (
                    bandCurrentFrame +
                    framesToAdvance
                ) % BAND_CONFIG.frameCount;

            drawBandFrame(
                bandCurrentFrame
            );

            bandLastFrameTime +=
                framesToAdvance *
                frameInterval;

        }

        bandAnimationFrame =
            requestAnimationFrame(
                animateBand
            );

    }


    /* =====================================
       START MARCHING BAND
       ===================================== */

    function startMarchingBand() {

        const bar =
            createMarchingBand();

        if (!bar) {
            return;
        }


        /* STOP PREVIOUS ANIMATION */

        stopMarchingBand();


        /* RESET ANIMATION STATE */

        bandCurrentFrame = 0;
        bandLastFrameTime = 0;

        bandRunning = true;

        // Expand the strip as soon as audio starts,
        // even if the sprite needs time to load.
        bar.classList.add("active");
        document.querySelector(".app-shell")?.classList.add("band-open");


        /* LOAD SPRITE IMAGE */

        if (!bandImage) {

            bandImage =
                new Image();

            bandImage.src =
                BAND_CONFIG.image;

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


            /* RESTART TRAVEL ANIMATION */

            bar.classList.remove(
                "active"
            );

            void bar.offsetWidth;

            bar.classList.add(
                "active"
            );


            /* START SPRITE FRAME LOOP */

            bandAnimationFrame =
                requestAnimationFrame(
                    animateBand
                );

        };


        /* IMAGE ALREADY LOADED */

        if (
            bandImage.complete &&
            bandImage.naturalWidth > 0
        ) {

            beginAnimation();

        }
        else {

            bandImage.onload =
                beginAnimation;

            bandImage.onerror = () => {

                console.error(
                    "Marching band sprite failed to load:",
                    BAND_CONFIG.image
                );

            };

        }

    }


    /* =====================================
       STOP MARCHING BAND
       ===================================== */

    function stopMarchingBand() {

        bandRunning = false;


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

                    startMarchingBand();

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
