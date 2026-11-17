
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
        },
        {
            id: "ill-be-back",
            sequence: "ILLBEBACK",
            description: "I'll Be Back — 8-bit chase",
            action: () => startTerminatorEgg()
        },
        {
            id: "mi6-007",
            sequence: "MI6-007",
            description: "MI6-007 — 8-bit secret agent",
            action: () => startBondEgg()
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
    let terminatorRunning = false;
    let terminatorFrame = null;
    let terminatorTimer = null;
    let terminatorAudio = null;
    let terminatorVoiceAudio = null;
    let terminatorSoundContext = null;
    let terminatorBeatTimer = null;
    let terminatorImagesPromise = null;
    let terminatorSpeechSpoken = false;
    let terminatorVolumeFactor = 1;
    let celebrationTimer = null;
    let celebrationOverlay = null;
    let bondRun = null;
    let bondCloseTimer = null;

    function setEasterEggStatus(label = null) {
        document.body.classList.toggle("easter-egg-busy", Boolean(label));
        const text = label || "Available";
        document.querySelectorAll(".status .status-text, .hover-status-text")
            .forEach(element => { element.textContent = text; });
    }

    function dismissBandCelebration({ resetStatus = true } = {}) {
        if (celebrationTimer !== null) {
            clearTimeout(celebrationTimer);
            celebrationTimer = null;
        }
        if (celebrationOverlay) {
            celebrationOverlay.remove();
            celebrationOverlay = null;
        }
        if (resetStatus) setEasterEggStatus();
    }

    function showBandCelebration(theme = "blue", options = {}) {
        // The busy status persists while the thank-you dialog is visible.
        dismissBandCelebration({ resetStatus: false });

        const overlay = document.createElement("div");
        overlay.className = `band-celebration band-celebration--${theme}`;
        const confetti = document.createElement("div");
        confetti.className = "band-confetti";
        confetti.setAttribute("aria-hidden", "true");

        // Small theme-colored pixel squares fall behind the message.
        for (let i = 0; i < 48; i++) {
            const pixel = document.createElement("span");
            pixel.style.setProperty("--x", `${(i * 37 + 11) % 100}%`);
            pixel.style.setProperty("--delay", `${(i % 12) * 70}ms`);
            pixel.style.setProperty("--duration", `${1800 + (i % 7) * 180}ms`);
            pixel.style.setProperty("--drift", `${(i % 2 ? 1 : -1) * (20 + i % 50)}px`);
            confetti.appendChild(pixel);
        }

        const dialog = document.createElement("div");
        dialog.className = "band-celebration-dialog";
        dialog.setAttribute("role", "alertdialog");
        dialog.setAttribute("aria-modal", "true");
        dialog.setAttribute("aria-labelledby", "band-celebration-title");

        const heading = document.createElement("h2");
        heading.id = "band-celebration-title";
        heading.textContent = options.heading || "Thanks for hunting for my Easter egg!";
        const detail = document.createElement("p");
        detail.textContent = "There are more waiting to be found. Keep exploring!";
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Keep exploring";
        button.addEventListener("click", dismissBandCelebration);
        // Optional photo: each Easter egg can supply its own image and alt text.
        // A missing image does not interrupt the completion message.
        if (options.image) {
            const photo = document.createElement("img");
            photo.className = "band-celebration-photo";
            photo.src = options.image;
            photo.alt = options.imageAlt || "";
            photo.loading = "lazy";
            photo.addEventListener("error", () => photo.remove(), { once: true });
            dialog.appendChild(photo);
        }

        dialog.append(heading, detail, button);
        overlay.append(confetti, dialog);
        document.body.appendChild(overlay);
        celebrationOverlay = overlay;
        button.focus();
    }


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

        const capitolBackground = document.createElement("div");
        capitolBackground.className = "marching-band-capitol";
        bar.appendChild(capitolBackground);


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
        setEasterEggStatus("Marching");

        // Commit the collapsed state to layout before toggling active.
        // A newly inserted element otherwise skips its height transition.
        void bar.offsetHeight;

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
       I'LL BE BACK — 8-BIT CHASE
       ===================================== */

    function stopTerminatorEgg({ keepStage = false } = {}) {
        terminatorRunning = false;
        terminatorVolumeFactor = 1;
        if (terminatorFrame !== null) cancelAnimationFrame(terminatorFrame);
        terminatorFrame = null;
        if (terminatorTimer !== null) clearTimeout(terminatorTimer);
        terminatorTimer = null;
        if (terminatorAudio) {
            terminatorAudio.pause();
            terminatorAudio = null;
        }
        if (terminatorVoiceAudio) {
            terminatorVoiceAudio.pause();
            terminatorVoiceAudio = null;
        }
        if (terminatorBeatTimer !== null) clearInterval(terminatorBeatTimer);
        terminatorBeatTimer = null;
        if (terminatorSoundContext) {
            terminatorSoundContext.close().catch(() => {});
            terminatorSoundContext = null;
        }
        if ("speechSynthesis" in window) window.speechSynthesis.cancel();
        // During a normal ending, keep battlefield terrain visible until
        // the bar has fully retracted; otherwise the parade road flashes in.
        if (!keepStage) marchingBandBar?.classList.remove("terminator-mode");
    }

    function playTerminatorFallback() {
        if (!terminatorRunning || terminatorSoundContext) return;
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        const context = new AudioContextClass();
        terminatorSoundContext = context;
        const notes = [110, 110, 146.83, 98];
        let index = 0;
        const pulse = () => {
            if (!terminatorRunning || context.state === "closed") return;
            const oscillator = context.createOscillator();
            const gain = context.createGain();
            oscillator.type = "square";
            oscillator.frequency.value = notes[index++ % notes.length];
            gain.gain.setValueAtTime(Math.max(0.0001, 0.045 * terminatorVolumeFactor), context.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.19);
            oscillator.connect(gain).connect(context.destination);
            oscillator.start();
            oscillator.stop(context.currentTime + 0.2);
        };
        pulse();
        terminatorBeatTimer = setInterval(pulse, 340);
    }

    function playTerminatorAudio() {
        const audio = new Audio("Audio/TerminatorTheme.mp3");
        audio.volume = 0.65;
        terminatorAudio = audio;
        audio.addEventListener("error", playTerminatorFallback, { once: true });
        const playback = audio.play();
        if (playback) playback.catch(playTerminatorFallback);
    }

    function playTerminatorLine() {
        const voice = new Audio("Audio/IllBeBack.mp3");
        voice.volume = 1;
        terminatorVoiceAudio = voice;
        const fallback = () => {
            if (!terminatorRunning || !("speechSynthesis" in window)) return;
            const line = new SpeechSynthesisUtterance("I'll be back");
            line.rate = 0.75;
            line.pitch = 0.6;
            window.speechSynthesis.speak(line);
        };
        voice.addEventListener("error", fallback, { once: true });
        const playback = voice.play();
        if (playback) playback.catch(fallback);
    }

    function startTerminatorEgg() {
        dismissBandCelebration();
        if (pendingPlaybackTimer !== null) clearTimeout(pendingPlaybackTimer);
        pendingPlaybackTimer = null;
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
        stopTerminatorEgg();
        stopMarchingBand();

        const bar = createMarchingBand();
        if (!bar) return;
        if (bandCloseTimer !== null) clearTimeout(bandCloseTimer);
        bandCloseTimer = null;
        terminatorRunning = true;
        setEasterEggStatus("Running for my life");
        terminatorSpeechSpoken = false;
        terminatorVolumeFactor = 1;
        void bar.offsetHeight;
        bar.classList.add("active", "terminator-mode");
        document.querySelector(".app-shell")?.classList.add("band-open");

        const load = name => new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error("Missing Terminator sprite: " + name));
            image.src = "Images/EasterEggs/" + name;
        });
        const JACK_RUN_FRAME_COUNT = 14;
        const TERMINATOR_WALK_OFFSET = JACK_RUN_FRAME_COUNT;
        const TERMINATOR_FRONT_INDEX = TERMINATOR_WALK_OFFSET + 4;
        if (!terminatorImagesPromise) {
            // Uploaded Jack sprites use zero-padded names: 00 through 13.
            // A missing in-between frame must not stop the entire Easter egg.
            const jackFiles = Array.from({ length: JACK_RUN_FRAME_COUNT }, (_, i) =>
                "Jack_Run_Smooth_" + String(i).padStart(2, "0") + ".png");
            const terminatorFiles = [
                ...[0, 1, 2, 3].map(i => "Terminator_ArmedWalk_Clean_" + i + ".png"),
                "Terminator_ArmedFront.png"
            ];
            terminatorImagesPromise = Promise.all(
                [...jackFiles, ...terminatorFiles].map(name =>
                    load(name).catch(error => {
                        console.warn("ILLBEBACK optional sprite unavailable:", name, error);
                        return null;
                    })
                )
            ).then(images => {
                // At least one actual Jack sprite is required. Once loaded,
                // substitute it for any missing run pose, maintaining indices.
                const firstRunner = images.slice(0, JACK_RUN_FRAME_COUNT).find(Boolean);
                if (!firstRunner) {
                    throw new Error("ILLBEBACK cannot load any Jack running frames");
                }
                for (let i = 0; i < JACK_RUN_FRAME_COUNT; i++) {
                    if (!images[i]) images[i] = firstRunner;
                }
                // Keep the Terminator walking even when a single pose is missing.
                const firstTerminator = images.slice(TERMINATOR_WALK_OFFSET).find(Boolean);
                if (firstTerminator) {
                    for (let i = TERMINATOR_WALK_OFFSET; i <= TERMINATOR_FRONT_INDEX; i++) {
                        if (!images[i]) images[i] = firstTerminator;
                    }
                }
                return images;
            }).catch(error => {
                terminatorImagesPromise = null;
                throw error;
            });
        }

        // The new PNGs have large transparent margins. Measure only the
        // visible runner (exclude the translucent foot shadow) so every
        // running pose is rendered at the same height and ground baseline.
        const getRunnerBounds = image => {
            const scratch = document.createElement("canvas");
            scratch.width = image.naturalWidth;
            scratch.height = image.naturalHeight;
            const scan = scratch.getContext("2d", { willReadFrequently: true });
            if (!scan) return { x: 0, y: 0, w: scratch.width, h: scratch.height };
            try {
                scan.drawImage(image, 0, 0);
                const pixels = scan.getImageData(0, 0, scratch.width, scratch.height).data;
                let left = scratch.width, top = scratch.height, right = -1, bottom = -1;
                for (let y = 0; y < scratch.height; y++) {
                    for (let x = 0; x < scratch.width; x++) {
                        const p = (y * scratch.width + x) * 4;
                        // The shadow is low-opacity, dark gray; the character
                        // has stronger alpha and brighter colored pixels.
                        const alpha = pixels[p + 3];
                        const brightness = Math.max(pixels[p], pixels[p + 1], pixels[p + 2]);
                        if (alpha < 180 || brightness < 65) continue;
                        left = Math.min(left, x);
                        top = Math.min(top, y);
                        right = Math.max(right, x);
                        bottom = Math.max(bottom, y);
                    }
                }
                if (right >= left) {
                    return { x: left, y: top, w: right - left + 1, h: bottom - top + 1 };
                }
            } catch (error) {
                console.warn("Jack sprite bounds unavailable:", error);
            }
            return { x: 0, y: 0, w: scratch.width, h: scratch.height };
        };

        terminatorTimer = setTimeout(() => {
            terminatorTimer = null;
            if (!terminatorRunning) return;
            terminatorImagesPromise.then(images => {
                if (!terminatorRunning) return;
                const runnerBounds = images.slice(0, JACK_RUN_FRAME_COUNT).map(getRunnerBounds);
                const canvas = marchingBandCanvas;
                if (!canvas) {
                    console.error("ILLBEBACK canvas not initialized");
                    stopTerminatorEgg();
                    setEasterEggStatus();
                    return;
                }
                // Start visuals even if audio playback is unavailable.
                try {
                    playTerminatorAudio();
                } catch (error) {
                    console.warn("ILLBEBACK music unavailable:", error);
                }
                const start = performance.now();
                const draw = now => {
                    if (!terminatorRunning) return;
                    const seconds = (now - start) / 1000;
                    // A three-second soundtrack fade accompanies the final walk-off.
                    const fade = Math.max(0, Math.min(1, (16.8 - seconds) / 3));
                    terminatorVolumeFactor = fade * (seconds >= 9.1 && seconds < 11.3 ? 0.35 : 1);
                    if (terminatorAudio) terminatorAudio.volume = 0.65 * terminatorVolumeFactor;
                    const mobile = window.matchMedia("(max-width: 700px)").matches;
                    const height = mobile ? 94 : 124;
                    const dpr = Math.min(window.devicePixelRatio || 1, 2);
                    const width = bar.clientWidth;
                    canvas.width = Math.round(width * dpr);
                    canvas.height = Math.round(height * dpr);
                    canvas.style.width = "100%";
                    canvas.style.height = height + "px";
                    const ctx = canvas.getContext("2d");
                    if (!ctx) {
                        console.error("ILLBEBACK could not initialize 2D canvas");
                        stopTerminatorEgg();
                        setEasterEggStatus();
                        return;
                    }
                    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                    ctx.imageSmoothingEnabled = false;
                    ctx.clearRect(0, 0, width, height);
                    const charHeight = height * 0.88;
                    const groundY = height - charHeight;
                    // All 14 run poses play in order at a steady 14 fps.
                    const runFrame = Math.floor(seconds * 14) % JACK_RUN_FRAME_COUNT;
                    const walkFrame = Math.floor(seconds * 4.2) % 4;
                    const walkBob = Math.sin(seconds * Math.PI * 4.2) * 0.25;
                    const paint = (image, x, y = groundY) => {
                        const w = image.naturalWidth / image.naturalHeight * charHeight;
                        ctx.drawImage(image, x, y, w, charHeight);
                    };
                    const paintJack = (image, bounds, x) => {
                        // Use source crop to eliminate inconsistent empty borders.
                        // No vertical bobbing: head stays steady through all poses.
                        const visibleHeight = height * 0.78;
                        const scale = visibleHeight / bounds.h;
                        const visibleWidth = bounds.w * scale;
                        // Place the soles near the stage floor. The former
                        // 94% baseline left a visible gap beneath Jack.
                        const baseline = height * 0.99;
                        // Keep the shadow under his feet, inside the canvas.
                        ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
                        ctx.beginPath();
                        ctx.ellipse(x, baseline - 1, visibleWidth * 0.37,
                            Math.max(1.5, height * 0.018), 0, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.drawImage(image, bounds.x, bounds.y, bounds.w, bounds.h,
                            Math.round(x - visibleWidth / 2),
                            Math.round(baseline - visibleHeight),
                            Math.round(visibleWidth),
                            Math.round(visibleHeight));
                    };

                    // First Jack runs completely off-screen. Only THEN the
                    // Terminator emerges, walks to center and faces the viewer.
                    if (seconds < 5.5) {
                        const runner = images[runFrame];
                        const bounds = runnerBounds[runFrame];
                        const initialX = -Math.max(20, height * 0.25);
                        paintJack(runner, bounds,
                            initialX + (width + height * 0.8) * (seconds / 5.5));
                    } else if (seconds < 9.1) {
                        const approach = (seconds - 5.5) / 3.6;
                        paint(images[TERMINATOR_WALK_OFFSET + walkFrame], -65 + (width / 2 + 35) * approach, groundY + walkBob);
                    } else if (seconds < 11.3) {
                        const centerW = images[TERMINATOR_FRONT_INDEX].naturalWidth / images[TERMINATOR_FRONT_INDEX].naturalHeight * charHeight;
                        paint(images[TERMINATOR_FRONT_INDEX], (width - centerW) / 2);
                        const text = "I'LL BE BACK";
                        const fontSize = mobile ? 11 : 16;
                        ctx.font = `bold ${fontSize}px monospace`;
                        const textWidth = ctx.measureText(text).width;
                        // Place the bubble to the RIGHT, never over his head.
                        const textX = Math.max(4, Math.min(width - textWidth - 12, width / 2 + centerW / 2 + 16));
                        const bubbleY = Math.round(height * 0.27);
                        ctx.fillStyle = "#12121a";
                        ctx.fillRect(textX - 7, bubbleY, textWidth + 14, fontSize + 10);
                        ctx.strokeStyle = "#ff4646";
                        ctx.lineWidth = 2;
                        ctx.strokeRect(textX - 7, bubbleY, textWidth + 14, fontSize + 10);
                        ctx.fillStyle = "#fff";
                        ctx.fillText(text, textX, bubbleY + fontSize + 2);
                        if (!terminatorSpeechSpoken && seconds >= 9.35) {
                            terminatorSpeechSpoken = true;
                            playTerminatorLine();
                        }
                    } else if (seconds < 16.8) {
                        const leaving = (seconds - 11.3) / 5.5;
                        paint(images[TERMINATOR_WALK_OFFSET + walkFrame], width / 2 - 30 + (width / 2 + 160) * leaving, groundY + walkBob);
                    } else {
                        stopTerminatorEgg({ keepStage: true });
                        stopMarchingBand();
                        // Celebrate only after a completed chase and the bar
                        // has finished folding away, not on interruption.
                        celebrationTimer = setTimeout(() => {
                            celebrationTimer = null;
                            bar.classList.remove("terminator-mode");
                            showBandCelebration("red");
                        }, bandTransitionMs + 80);
                        return;
                    }
                    terminatorFrame = requestAnimationFrame(draw);
                };
                terminatorFrame = requestAnimationFrame(draw);
            }).catch(error => {
                console.warn("Terminator Easter egg could not load:", error);
                stopTerminatorEgg();
                stopMarchingBand();
                setEasterEggStatus();
            });
        }, bandTransitionMs);
    }

    /* =====================================
       AUDIO PLAYER
       ===================================== */

    function playAudio(
        path,
        options = {}
    ) {

        dismissBandCelebration();
        stopTerminatorEgg();
        stopBondEgg();

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

        const finish = (completed = false) => {

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

                if (completed && options.visual === "marching-band") {
                    // Let the bar finish retracting before celebrating.
                    celebrationTimer = setTimeout(() => {
                        celebrationTimer = null;
                        showBandCelebration("blue", {
                            image: "Images/EasterEggs/Jack_Trombone.png",
                            imageAlt: "Jack playing trombone"
                        });
                    }, bandTransitionMs + 80);
                } else if (!completed) {
                    setEasterEggStatus();
                }

            }

        };


        /* =================================
           SONG COMPLETED
           ================================= */

        audio.addEventListener(
            "ended",
            () => finish(true)
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
       MI6-007 — DROP-DOWN SECRET AGENT
       ===================================== */

    /* =====================================
       MI6-007: separate transparent sprite files
       ===================================== */
    // Sprite files are numbered 01-21. Frames 15-21 contain the updated
    // seven-pose walking cycle; 08-14 retain the cinematic turn and aim.
    const BOND_FRAME_PATHS = Array.from({ length: 21 }, (_, i) =>
        "Images/EasterEggs/Bond_Frame_" + String(i + 1).padStart(2, "0") + ".png"
    );
    // Zero-based indices into the preloaded sprites.
    const BOND_WALK_FRAMES = [14, 15, 16, 17, 18, 19, 20];
    const BOND_WALK_FRAME_COUNT = BOND_WALK_FRAMES.length;
    const BOND_TURN_FRAMES = [7, 8, 9, 10, 11, 12, 13];
    // Timing is expressed in seconds on the original Gunbarrel.mp3 timeline.
    const BOND_BARREL_PATH = "Images/EasterEggs/Bond_Barrel.png";
    const BOND_SCAN_START = 12;
    const BOND_RED_WASH_DURATION = 3000; // slower downward blood drips, milliseconds
    const BOND_AUDIO_PATH = "Audio/Gunbarrel.mp3";
    const BOND_AUDIO_START = 12;
    const BOND_WALK_START = 20;
    const BOND_SHOT_TIME = 23;
    const BOND_TURN_DURATION = 600; // milliseconds before the gunshot
    const BOND_HOLD_DURATION = 5000;
    const BOND_WALK_FRAME_DURATION = 150;
    let bondBarrelPromise = null;
    function loadBondBarrel() {
        if (!bondBarrelPromise) {
            bondBarrelPromise = new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => resolve(image);
                image.onerror = () => reject(new Error("MI6 gunbarrel image unavailable"));
                image.src = BOND_BARREL_PATH;
            }).catch(error => {
                // Keep the character animation functional if the art cannot load.
                console.warn(error);
                return null;
            });
        }
        return bondBarrelPromise;
    }

    let bondFramesPromise = null;
    let bondFrameBounds = null;
    let bondRequestId = 0;

    // Transparent padding differs between the original and added sprites.
    // Measure the opaque character, not the PNG canvas, once at preload.
    function measureBondSprite(image) {
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context) return { x: 0, y: 0,
            width: image.naturalWidth, height: image.naturalHeight };
        try {
            context.drawImage(image, 0, 0);
        } catch (error) {
            console.warn("MI6 sprite could not be measured:", error);
            return { x: 0, y: 0, width: canvas.width, height: canvas.height };
        }
        let pixels;
        try {
            pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
        } catch (error) {
            // Canvas pixel reads can be blocked by hosting/security settings.
            // Never let this disable the MI6 trigger.
            console.warn("MI6 sprite pixel access unavailable:", error);
            return { x: 0, y: 0, width: canvas.width, height: canvas.height };
        }
        let left = canvas.width, top = canvas.height, right = -1, bottom = -1;
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                // Ignore the translucent floor shadow while measuring height.
                if (pixels[(y * canvas.width + x) * 4 + 3] < 190) continue;
                left = Math.min(left, x);
                right = Math.max(right, x);
                top = Math.min(top, y);
                bottom = Math.max(bottom, y);
            }
        }
        return right < left
            ? { x: 0, y: 0, width: canvas.width, height: canvas.height }
            : { x: left, y: top, width: right - left + 1,
                height: bottom - top + 1 };
    }

    function loadBondFrames() {
        if (!bondFramesPromise) {
            // Start loading early and retry a transient network/cache failure once.
            const loadFrame = (src, attempt = 0) => new Promise((resolve, reject) => {
                const frame = new Image();
                frame.decoding = "async";
                frame.onload = () => resolve(frame);
                frame.onerror = () => {
                    if (attempt < 1) {
                        loadFrame(src + (src.includes("?") ? "&" : "?") +
                            "retry=1", attempt + 1).then(resolve, reject);
                    } else {
                        reject(new Error("MI6 frame failed to load: " + src));
                    }
                };
                frame.src = src;
            });
            // Only the turn/aim sprites are mandatory. Added walking images
            // may arrive in a different deployment; fall back to original
            // walk sprites rather than preventing the Easter egg from opening.
            bondFramesPromise = Promise.all(
                BOND_FRAME_PATHS.slice(0, 14).map(src => loadFrame(src))
            ).then(async originals => {
                const additions = await Promise.all(
                    BOND_FRAME_PATHS.slice(14).map((src, i) =>
                        loadFrame(src).catch(error => {
                            console.warn(error.message,
                                "- using original walking frame instead");
                            return originals[i];
                        })
                    )
                );
                const images = originals.concat(additions);
                bondFrameBounds = images.map(measureBondSprite);
                return images;
            }).catch(error => {
                bondFramesPromise = null;
                throw error;
            });
        }
        return bondFramesPromise;
    }

    // Warm the small sprite assets before the first MI6 trigger.
    // Failures are retried on the next activation rather than being cached.
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            loadBondFrames().catch(error =>
                console.warn("MI6 preload:", error.message));
        }, { once: true });
    } else {
        loadBondFrames().catch(error =>
            console.warn("MI6 preload:", error.message));
    }

    function stopBondEgg({ closeStrip = true, celebrate = false } = {}) {
        ++bondRequestId;
        if (bondCloseTimer !== null) {
            clearTimeout(bondCloseTimer);
            bondCloseTimer = null;
        }
        if (!bondRun) return;
        const run = bondRun;
        bondRun = null;
        if (run.frame !== null) cancelAnimationFrame(run.frame);
        if (run.holdTimer !== null) clearTimeout(run.holdTimer);
        // Normal completion occurs only when the MP3 has ended.
        // Explicit interruption by another easter egg stops the soundtrack.
        if (run.audio && !run.audio.ended) {
            run.audio.pause();
        }
        if (closeStrip) {
            // Keep the MI6 background in place until the dropdown has
            // fully folded shut, so the Wisconsin scene never flashes.
            stopMarchingBand();
            setEasterEggStatus();
            bondCloseTimer = setTimeout(() => {
                run.canvas.remove();
                run.barrelCanvas.remove();
                run.bar.classList.remove("bond-mode");
                bondCloseTimer = null;
                if (celebrate) {
                    showBandCelebration("bond", {
                        heading: "Thanks for finding my Easter egg!"
                    });
                }
            }, bandTransitionMs);
        } else {
            run.canvas.remove();
            run.barrelCanvas.remove();
            run.bar.classList.remove("bond-mode");
        }
    }

    function startBondEgg() {
        dismissBandCelebration();
        stopBondEgg();
        if (bondCloseTimer !== null) {
            clearTimeout(bondCloseTimer);
            bondCloseTimer = null;
        }
        // Reset any finishing strip before preparing the next run.
        marchingBandBar?.querySelectorAll(".bond-strip-sprite").forEach(sprite => sprite.remove());
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
        if (pendingPlaybackTimer !== null) {
            clearTimeout(pendingPlaybackTimer);
            pendingPlaybackTimer = null;
        }
        stopTerminatorEgg();
        stopMarchingBand();

        let run = null;
        // Do not open an empty dropdown while the first-load images arrive.
        // Only the most recently requested run can start after preloading.
        const requestId = ++bondRequestId;
        Promise.all([loadBondFrames(), loadBondBarrel()]).then(([images, barrelImage]) => {
            if (requestId !== bondRequestId) return;
            openBondStrip(images, barrelImage);
        }).catch(error => {
            if (requestId !== bondRequestId) return;
            console.warn("MI6 could not initialize:", error);
            setEasterEggStatus();
        });

        function openBondStrip(images, barrelImage) {
            const bar = createMarchingBand();
            if (!bar) return;
            if (bandCloseTimer !== null) {
                clearTimeout(bandCloseTimer);
                bandCloseTimer = null;
            }
            bar.classList.remove("terminator-mode");
            bar.classList.add("bond-mode");
            const barrelCanvas = document.createElement("canvas");
            barrelCanvas.className = "bond-strip-barrel";
            bar.appendChild(barrelCanvas);
            const canvas = document.createElement("canvas");
            canvas.className = "bond-strip-sprite";
            bar.appendChild(canvas);
            run = {
                bar, canvas, barrelCanvas, barrelImage,
                frame: null, holdTimer: null,
                started: 0, images, audio: null
            };
            bondRun = run;
            setEasterEggStatus("Saving the world");
            void bar.offsetHeight;
            bar.classList.add("active");
            document.querySelector(".app-shell")?.classList.add("band-open");

            // Seek before playback; never play the first 12 seconds.
            const audio = new Audio(BOND_AUDIO_PATH);
            audio.preload = "auto";
            audio.volume = 0.7;
            run.audio = audio;
            audio.addEventListener("ended", () => {
                // Keep the last pointing pose until playback completes.
                if (bondRun === run) stopBondEgg({ celebrate: true });
            }, { once: true });
            const begin = () => {
                if (bondRun !== run) return;
                audio.currentTime = BOND_AUDIO_START;
                // Start visuals from the same clock as playback.
                run.started = performance.now();
                const playback = audio.play();
                if (playback && typeof playback.catch === "function") {
                    playback.catch(error =>
                        console.warn("MI6 audio playback blocked:", error));
                }
                run.frame = requestAnimationFrame(draw);
            };
            audio.addEventListener("error", () =>
                console.warn("MI6 audio could not load"), { once: true });
            const schedule = () => {
                if (run.holdTimer !== null) clearTimeout(run.holdTimer);
                run.holdTimer = setTimeout(() => {
                    run.holdTimer = null;
                    begin();
                }, bandTransitionMs);
            };
            if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
                schedule();
            } else {
                audio.addEventListener("loadedmetadata", schedule, { once: true });
                audio.load();
            }
        }

        function draw(now) {
            if (bondRun !== run || !run.images) return;
            const elapsed = now - run.started;
            const bar = run.bar;
            const canvas = run.canvas;
            const barrelCanvas = run.barrelCanvas;
            const width = bar.clientWidth;
            const height = window.matchMedia("(max-width: 700px)").matches ? 94 : 124;
            // The dropdown is taller than the sprite stage (136px vs 124px
            // desktop, 106px vs 94px mobile). The front overlay must span it.
            const overlayHeight = bar.clientHeight || height;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const desiredW = Math.round(width * dpr);
            const desiredH = Math.round(height * dpr);
            if (canvas.width !== desiredW || canvas.height !== desiredH) {
                canvas.width = desiredW;
                canvas.height = desiredH;
            }
            canvas.style.height = height + "px";
            const desiredOverlayH = Math.round(overlayHeight * dpr);
            if (barrelCanvas.width !== desiredW ||
                barrelCanvas.height !== desiredOverlayH) {
                barrelCanvas.width = desiredW;
                barrelCanvas.height = desiredOverlayH;
            }
            barrelCanvas.style.height = overlayHeight + "px";
            const ctx = canvas.getContext("2d");
            if (!ctx) { stopBondEgg(); return; }
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.imageSmoothingEnabled = false;
            ctx.clearRect(0, 0, width, height);

            // Play from 12s, remain offscreen until 20s, hit full aim at 23s.
            // Drive poses from the media clock so the gunshot stays aligned.
            const mediaTime = run.audio && !run.audio.paused
                ? run.audio.currentTime
                : BOND_AUDIO_START + elapsed / 1000;
            // Scan slowly from the left and catch the agent at the right
            // boundary, without ever cropping the viewing circle there.
            const irisY = height / 2;
            const irisRadius = height * 0.53;
            const barrelVisible = mediaTime >= BOND_SCAN_START;
            const referenceBounds = bondFrameBounds[0];
            const referenceHeight = height * 0.92 *
                referenceBounds.height / run.images[0].naturalHeight;
            const agentWidth = Math.max(...BOND_WALK_FRAMES.map(index => {
                const bounds = bondFrameBounds[index];
                return referenceHeight * bounds.width / bounds.height;
            }));
            const agentStartX = width + agentWidth / 2;
            const agentWalkDuration = (BOND_SHOT_TIME - BOND_WALK_START) *
                1000 - BOND_TURN_DURATION;
            const agentProgress = Math.max(0, Math.min(1,
                ((mediaTime - BOND_WALK_START) * 1000) / agentWalkDuration));
            const trackedX = agentStartX +
                (width / 2 - agentStartX) * agentProgress;
            // Catch him exactly when his center reaches the rightmost
            // fully-visible iris position. Calculate the timing from the
            // viewport so the handoff stays seamless on mobile and desktop.
            const catchX = width - irisRadius;
            const catchProgress = Math.max(0, Math.min(1,
                (agentStartX - catchX) / (agentStartX - width / 2)));
            const catchTime = BOND_WALK_START +
                (agentWalkDuration / 1000) * catchProgress;
            const scanProgress = Math.max(0, Math.min(1,
                (mediaTime - BOND_SCAN_START) /
                (catchTime - BOND_SCAN_START)));
            const scanEase = scanProgress * scanProgress *
                (3 - 2 * scanProgress);
            const irisX = mediaTime < catchTime
                ? -irisRadius + (catchX + irisRadius) * scanEase
                : trackedX;
            // Monochrome spiral surrounds (but never covers) the viewing hole.
            const barrelCtx = barrelCanvas.getContext("2d");
            if (barrelCtx) {
                barrelCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
                barrelCtx.clearRect(0, 0, width, overlayHeight);

                if (barrelVisible && run.barrelImage) {
                    // Center the spiral image symmetrically around the iris.
                    const drawW = height * 6.4;
                    const drawH = drawW * run.barrelImage.naturalHeight /
                        run.barrelImage.naturalWidth;
                    const rotation = (-0.25 + 0.25 * scanEase) +
                        Math.min(1, Math.max(0, (mediaTime - 20) / 3)) * 0.16;
                    barrelCtx.save();
                    barrelCtx.translate(irisX, irisY);
                    barrelCtx.beginPath();
                    barrelCtx.arc(0, 0, height * 2.85, 0, Math.PI * 2);
                    barrelCtx.arc(0, 0, irisRadius, 0, Math.PI * 2, true);
                    barrelCtx.clip("evenodd");
                    barrelCtx.rotate(rotation);
                    barrelCtx.imageSmoothingEnabled = false;
                    // Build a truly symmetrical spiral from the existing
                    // RIGHT HALF of the barrel asset. Mirror it onto the left.
                    const source = run.barrelImage;
                    const halfWidth = source.naturalWidth / 2;
                    barrelCtx.drawImage(source,
                        halfWidth, 0, halfWidth, source.naturalHeight,
                        0, -drawH / 2, drawW / 2, drawH);
                    barrelCtx.save();
                    barrelCtx.scale(-1, 1);
                    barrelCtx.drawImage(source,
                        halfWidth, 0, halfWidth, source.naturalHeight,
                        0, -drawH / 2, drawW / 2, drawH);
                    barrelCtx.restore();
                    barrelCtx.restore();
                }
            }
            // The cream background and character exist only inside the iris.
            ctx.save();
            ctx.beginPath();
            ctx.arc(irisX, irisY, irisRadius, 0, Math.PI * 2);
            ctx.clip();
            ctx.fillStyle = "#f5ebd5";
            ctx.fillRect(0, 0, width, height);
            const walkElapsed = (mediaTime - BOND_WALK_START) * 1000;
            const walkDuration = (BOND_SHOT_TIME - BOND_WALK_START) * 1000
                - BOND_TURN_DURATION;
            const turning = walkElapsed >= walkDuration;
            const frameIndex = !turning
                ? BOND_WALK_FRAMES[
                    Math.floor(Math.max(0, walkElapsed) / BOND_WALK_FRAME_DURATION)
                        % BOND_WALK_FRAME_COUNT
                ]
                : BOND_TURN_FRAMES[Math.min(
                    BOND_TURN_FRAMES.length - 1,
                    Math.floor((walkElapsed - walkDuration) /
                        (BOND_TURN_DURATION / BOND_TURN_FRAMES.length))
                )];
            const sprite = run.images[frameIndex];
            const bounds = bondFrameBounds[frameIndex];
            // Every pose is scaled to frame 01's visible character height,
            // with the soles resting on one shared baseline. This removes
            // jumping/shrinking caused by different transparent PNG margins.
            const spriteHeight = referenceHeight;
            const spriteWidth = spriteHeight * bounds.width / bounds.height;
            const progress = Math.max(0, Math.min(1, walkElapsed / walkDuration));
            const characterX = agentStartX +
                (width / 2 - agentStartX) * progress;
            const baselineY = (height + height * 0.92) / 2 -
                (run.images[0].naturalHeight -
                    referenceBounds.y - referenceBounds.height) *
                (height * 0.92 / run.images[0].naturalHeight);
            // Draw the entire source image at the calibrated scale so that
            // the translucent ground shadow is preserved below the shoes.
            const spriteScale = spriteHeight / bounds.height;
            if (mediaTime >= BOND_WALK_START) ctx.drawImage(sprite,
                Math.round(characterX -
                    (bounds.x + bounds.width / 2) * spriteScale),
                Math.round(baselineY -
                    (bounds.y + bounds.height) * spriteScale),
                Math.round(sprite.naturalWidth * spriteScale),
                Math.round(sprite.naturalHeight * spriteScale));

            ctx.restore();

            // Render blood on the FRONT barrel canvas, outside the iris clip,
            // so the falling red curtain covers the ENTIRE dropdown.
            if (barrelCtx && mediaTime >= BOND_SHOT_TIME) {
                const shotElapsed = (mediaTime - BOND_SHOT_TIME) * 1000;
                const dripProgress = Math.max(0, Math.min(1,
                    shotElapsed / BOND_RED_WASH_DURATION));
                // Remain semi-transparent through most of the soundtrack,
                // turning fully opaque only as the MP3 reaches its ending.
                // Audio metadata supplies the actual end time across devices.
                const audioEnd = run.audio &&
                    Number.isFinite(run.audio.duration) &&
                    run.audio.duration > BOND_SHOT_TIME
                    ? run.audio.duration : BOND_SHOT_TIME + 12;
                const fadeEnd = Math.max(BOND_SHOT_TIME + 0.5, audioEnd - 0.12);
                const fadeProgress = Math.max(0, Math.min(1,
                    (mediaTime - BOND_SHOT_TIME) /
                    (fadeEnd - BOND_SHOT_TIME)));
                // Ease-in holds translucency longer; end reaches 100%.
                const opacity = 0.38 + 0.62 * Math.pow(fadeProgress, 2.2);
                if (dripProgress > 0) {
                    barrelCtx.save();
                    barrelCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
                    barrelCtx.fillStyle = "rgba(96, 0, 6, " +
                        opacity.toFixed(3) + ")";
                    if (dripProgress >= 1) {
                        // Finish as a solid edge-to-edge red dropdown with
                        // no gaps or translucent vertical lines.
                        barrelCtx.fillRect(0, 0, width, overlayHeight);
                    } else {
                        const front = overlayHeight * Math.pow(dripProgress, 0.8);
                        const spacing = overlayHeight * 0.19;
                        const dripWidth = overlayHeight * 0.055;
                        barrelCtx.beginPath();
                        barrelCtx.moveTo(0, -2);
                        barrelCtx.lineTo(width, -2);
                        for (let x = width; x >= 0; x -= 3) {
                            const local = x / spacing;
                            const index = Math.round(local);
                            const distance = (local - index) * spacing;
                            const pulse = Math.exp(-Math.pow(distance / dripWidth, 4));
                            const variation = 0.6 + 0.4 *
                                Math.pow(Math.sin(index * 2.47 + 0.8), 2);
                            const stagger = Math.max(0, Math.min(1,
                                (dripProgress - (index % 4) * 0.065) / 0.55));
                            const tongue = overlayHeight * 0.27 * variation *
                                Math.sin(Math.PI * 0.5 * stagger) * pulse;
                            const ripple = overlayHeight * 0.019 *
                                Math.sin(x / (overlayHeight * 0.045) + index * 1.6);
                            barrelCtx.lineTo(x, front + tongue + ripple);
                        }
                        barrelCtx.closePath();
                        barrelCtx.fill();
                    }
                    barrelCtx.restore();
                }


            }

            // Keep the last frame until the MP3's ended event.
            // Do not close at 28s or interrupt the soundtrack.
            if (run.audio && run.audio.ended) {
                stopBondEgg({ celebrate: true });
                return;
            }
            run.frame = requestAnimationFrame(draw);
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
                !/^[a-z0-9-]$/i.test(
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
            stopBondEgg();
            setEasterEggStatus();

        }

    };

})();
