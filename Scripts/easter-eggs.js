
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
       EASTER EGG REGISTRY

       Add new Easter eggs here.
       ===================================== */

    const easterEggs = [

        {
            id: "on-wisconsin",

            sequence: "ONWISCONSIN",

            description:
                "Plays On, Wisconsin!",

            action: () => {
                playAudio(
                    "Audio/OnWisconsin.mp3"
                );
            }
        }

        // ADD FUTURE EASTER EGGS HERE

    ];


    /* =====================================
       STATE
       ===================================== */

    let keyBuffer = "";
    let lastKeyTime = 0;

    const lastActivated = new Map();

    let currentAudio = null;


    /* =====================================
       AUDIO PLAYER
       ===================================== */

    function playAudio(path) {

        // Stop any existing Easter egg audio
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        const audio = new Audio(path);

        audio.volume = 0.7;

        currentAudio = audio;

        audio.addEventListener(
            "ended",
            () => {
                if (currentAudio === audio) {
                    currentAudio = null;
                }
            }
        );

        audio.addEventListener(
            "error",
            () => {
                console.warn(
                    "Easter egg audio could not load:",
                    path
                );

                if (currentAudio === audio) {
                    currentAudio = null;
                }
            }
        );

        const playback = audio.play();

        if (playback) {
            playback.catch(error => {
                console.warn(
                    "Easter egg audio playback failed:",
                    error
                );

                if (currentAudio === audio) {
                    currentAudio = null;
                }
            });
        }

    }


    /* =====================================
       IGNORE TEXT INPUTS
       ===================================== */

    function shouldIgnoreKey(event) {

        const target = event.target;

        // Ignore modifier shortcuts
        if (
            event.ctrlKey ||
            event.altKey ||
            event.metaKey
        ) {
            return true;
        }

        // Ignore held-down keys
        if (event.repeat) {
            return true;
        }

        // Ignore typing in input fields
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
       ACTIVATE AN EASTER EGG
       ===================================== */

    function activateEasterEgg(egg) {

        const now = Date.now();

        const previous =
            lastActivated.get(egg.id) || 0;

        if (
            now - previous <
            CONFIG.cooldown
        ) {
            return;
        }

        lastActivated.set(
            egg.id,
            now
        );

        console.log(
            "Easter egg discovered:",
            egg.id
        );

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

    const maxSequenceLength = Math.max(
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

            // Only accept regular letters A-Z
            if (!/^[a-z]$/i.test(event.key)) {
                return;
            }

            const now = Date.now();

            // Reset after inactivity
            if (
                now - lastKeyTime >
                CONFIG.keyTimeout
            ) {
                keyBuffer = "";
            }

            lastKeyTime = now;

            keyBuffer +=
                event.key.toUpperCase();

            // Limit stored characters
            keyBuffer = keyBuffer.slice(
                -maxSequenceLength
            );

            // Check registered Easter eggs
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

    // Useful for debugging or future UI

    window.portfolioEasterEggs = {

        list: () => {
            return easterEggs.map(
                egg => ({
                    id: egg.id,
                    description: egg.description
                })
            );
        },

        stopAudio: () => {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                currentAudio = null;
            }
        }

    };

})();
