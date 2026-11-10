
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

    function dismissBandCelebration() {
        if (celebrationTimer !== null) {
            clearTimeout(celebrationTimer);
            celebrationTimer = null;
        }
        if (celebrationOverlay) {
            celebrationOverlay.remove();
            celebrationOverlay = null;
        }
    }

    function showBandCelebration() {
        dismissBandCelebration();

        const overlay = document.createElement("div");
        overlay.className = "band-celebration";
        const confetti = document.createElement("div");
        confetti.className = "band-confetti";
        confetti.setAttribute("aria-hidden", "true");

        // Small blue pixel squares fall behind the message, never over it.
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
        heading.textContent = "Thanks for hunting for my Easter egg!";
        const detail = document.createElement("p");
        detail.textContent = "There are more waiting to be found. Keep exploring!";
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Keep exploring";
        button.addEventListener("click", dismissBandCelebration);
        dialog.append(heading, detail, button);
        overlay.append(confetti, dialog);
        overlay.addEventListener("click", event => {
            if (event.target === overlay) dismissBandCelebration();
        });
        const onKeyDown = event => {
            if (event.key === "Escape") dismissBandCelebration();
        };
        overlay.addEventListener("keydown", onKeyDown);
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

    function stopTerminatorEgg() {
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
        marchingBandBar?.classList.remove("terminator-mode");
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
        if (!terminatorImagesPromise) {
            terminatorImagesPromise = Promise.all([
                load("Jack_Run.png"),
                load("Terminator_ArmedWalk_Clean_0.png"),
                load("Terminator_ArmedWalk_Clean_1.png"),
                load("Terminator_ArmedWalk_Clean_2.png"),
                load("Terminator_ArmedWalk_Clean_3.png"),
                load("Terminator_ArmedFront.png")
            ]).catch(error => {
                terminatorImagesPromise = null;
                throw error;
            });
        }

        terminatorTimer = setTimeout(() => {
            terminatorTimer = null;
            if (!terminatorRunning) return;
            terminatorImagesPromise.then(images => {
                if (!terminatorRunning) return;
                playTerminatorAudio();
                const start = performance.now();
                const canvas = marchingBandCanvas;
                const draw = now => {
                    if (!terminatorRunning) return;
                    const seconds = (now - start) / 1000;
                    // A three-second soundtrack fade accompanies the final walk-off.
                    const fade = Math.max(0, Math.min(1, (15 - seconds) / 3));
                    terminatorVolumeFactor = fade * (seconds >= 7.3 && seconds < 9.5 ? 0.35 : 1);
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
                    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                    ctx.imageSmoothingEnabled = false;
                    ctx.clearRect(0, 0, width, height);
                    const charHeight = height * 0.88;
                    const groundY = height - charHeight;
                    const jackBob = Math.sin(seconds * 17) * 2;
                    // Four consistent poses per cycle, two grounded footfalls each second.
                    const walkFrame = Math.floor(seconds * 4.2) % 4;
                    const walkBob = Math.sin(seconds * Math.PI * 4.2) * 0.25;
                    const paint = (image, x, y = groundY) => {
                        const w = image.naturalWidth / image.naturalHeight * charHeight;
                        ctx.drawImage(image, x, y, w, charHeight);
                    };

                    // First Jack runs completely off-screen. Only THEN the
                    // Terminator emerges, walks to center and faces the viewer.
                    if (seconds < 3.7) {
                        paint(images[0], -120 + (width + 250) * (seconds / 3.7), groundY + jackBob);
                    } else if (seconds < 7.3) {
                        const approach = (seconds - 3.7) / 3.6;
                        paint(images[1 + walkFrame], -65 + (width / 2 + 35) * approach, groundY + walkBob);
                    } else if (seconds < 9.5) {
                        const centerW = images[5].naturalWidth / images[5].naturalHeight * charHeight;
                        paint(images[5], (width - centerW) / 2);
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
                        if (!terminatorSpeechSpoken && seconds >= 7.55) {
                            terminatorSpeechSpoken = true;
                            playTerminatorLine();
                        }
                    } else if (seconds < 15) {
                        const leaving = (seconds - 9.5) / 5.5;
                        paint(images[1 + walkFrame], width / 2 - 30 + (width / 2 + 160) * leaving, groundY + walkBob);
                    } else {
                        stopTerminatorEgg();
                        stopMarchingBand();
                        return;
                    }
                    terminatorFrame = requestAnimationFrame(draw);
                };
                terminatorFrame = requestAnimationFrame(draw);
            }).catch(error => {
                console.warn("Terminator Easter egg could not load:", error);
                stopTerminatorEgg();
                stopMarchingBand();
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
                        showBandCelebration();
                    }, bandTransitionMs + 80);
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
