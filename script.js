/* =========================================
   PAGE CONFIGURATION
   ========================================= */

const pageConfig = {

    home: {
        title: "Home",
        path: "jack.london / portfolio / home"
    },

    skills: {
        title: "Skills",
        path: "jack.london / portfolio / skills"
    },

    experience: {
        title: "Experience",
        path: "jack.london / portfolio / experience"
    },

    projects: {
        title: "Projects",
        path: "jack.london / portfolio / projects"
    },

    education: {
        title: "Education",
        path: "jack.london / portfolio / education"
    },

    activities: {
        title: "Activities",
        path: "jack.london / portfolio / activities"
    }

};


/* =========================================
   ELEMENT REFERENCES
   ========================================= */

const pageNavigation =
    document.querySelectorAll(".page-nav");

const internalPageLinks =
    document.querySelectorAll(".internal-page-link");

const pages =
    document.querySelectorAll(".page-view");

const workspaceTabs =
    document.getElementById("workspaceTabs");

const workspaceTitle =
    document.getElementById("workspaceTitle");

const workspacePath =
    document.getElementById("workspacePath");

const workspaceContent =
    document.querySelector(".workspace-content");


let activePageName = null;
let sectionObserver = null;

let pageTransitionId = 0;


/* =========================================
   OPEN PAGE
   ========================================= */

function openPage(
    pageName,
    animate = false
) {

    const selectedPage =
        document.querySelector(
            `.page-view[data-page="${pageName}"]`
        );


    if (!selectedPage) {
        return;
    }


    /* =====================================
       IGNORE CURRENT PAGE
       ===================================== */

    if (
        pageName === activePageName &&
        selectedPage.classList.contains(
            "active"
        )
    ) {
        return;
    }


    /* =====================================
       UPDATE SIDEBAR
       ===================================== */

    pageNavigation.forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.page === pageName
            );

        }
    );


    /* =====================================
       UPDATE WORKSPACE TITLE
       ===================================== */

    const config =
        pageConfig[pageName];


    if (config) {

        workspaceTitle.textContent =
            config.title;

        workspacePath.textContent =
            config.path;

    }


    /* =====================================
       TRANSITION ID
       ===================================== */

    pageTransitionId++;


    const transitionId =
        pageTransitionId;


    /* =====================================
       SWITCH PAGE
       ===================================== */

    const switchPage = () => {

        if (
            transitionId !==
            pageTransitionId
        ) {
            return;
        }


        /* =================================
           HIDE OLD PAGES
           ================================= */

        pages.forEach(
            page => {

                page.classList.remove(
                    "active"
                );

            }
        );


        /* =================================
           SHOW NEW PAGE
           ================================= */

        selectedPage.classList.add(
            "active"
        );


        activePageName =
            pageName;


        /* =================================
           RESET SCROLL
           ================================= */

        workspaceContent.scrollTop =
            0;


        /* =================================
           BUILD TABS
           ================================= */

        buildTabs(
            selectedPage
        );


        /* =================================
           OBSERVE SECTIONS
           ================================= */

        setupSectionObserver(
            selectedPage
        );


        /* =================================
           INITIAL LOAD
           ================================= */

        if (!animate) {

            workspaceContent.classList.remove(
                "workspace-switching",
                "workspace-entering",
                "workspace-entering-active"
            );

            return;

        }


        /* =================================
           PREPARE FADE IN
           ================================= */

        workspaceContent.classList.remove(
            "workspace-switching"
        );


        workspaceContent.classList.add(
            "workspace-entering"
        );


        /*
            Force the browser to render
            opacity: 0 before starting
            the fade-in.
        */

        void workspaceContent.offsetWidth;


        /* =================================
           START FADE IN
           ================================= */

        requestAnimationFrame(
            () => {

                if (
                    transitionId !==
                    pageTransitionId
                ) {
                    return;
                }


                workspaceContent.classList.add(
                    "workspace-entering-active"
                );


                /* =========================
                   CLEAN UP AFTER FADE
                   ========================= */

                setTimeout(
                    () => {

                        if (
                            transitionId !==
                            pageTransitionId
                        ) {
                            return;
                        }


                        workspaceContent.classList.remove(
                            "workspace-entering",
                            "workspace-entering-active"
                        );

                    },
                    400
                );

            }
        );

    };


    /* =====================================
       INITIAL PAGE LOAD
       ===================================== */

    if (!animate) {

        switchPage();

        return;

    }


    /* =====================================
       CLEAN OLD TRANSITION CLASSES
       ===================================== */

    workspaceContent.classList.remove(
        "workspace-entering",
        "workspace-entering-active"
    );


    /* =====================================
       FADE OUT
       ===================================== */

    workspaceContent.classList.add(
        "workspace-switching"
    );


    /* =====================================
       WAIT FOR FADE OUT
       ===================================== */

    setTimeout(
        switchPage,
        275
    );

}


/* =========================================
   BUILD TOP TABS
   ========================================= */

function buildTabs(page) {

    workspaceTabs.innerHTML = "";


    /* =====================================
       SLIDING INDICATOR
       ===================================== */

    const indicator =
        document.createElement(
            "div"
        );


    indicator.classList.add(
        "workspace-tab-indicator"
    );


    workspaceTabs.appendChild(
        indicator
    );


    /* =====================================
       PAGE SECTIONS
       ===================================== */

    const sections =
        page.querySelectorAll(
            ".page-section[data-tab]"
        );


    sections.forEach(
        (section, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.classList.add(
                "workspace-tab"
            );


            button.dataset.sectionId =
                section.id;


            button.textContent =
                section.dataset.tab;


            /*
                First section starts active.
            */

            if (index === 0) {

                button.classList.add(
                    "active"
                );

            }


            button.addEventListener(
                "click",
                () => {

                    scrollToSection(
                        section.id
                    );

                }
            );


            workspaceTabs.appendChild(
                button
            );

        }
    );


    /*
        Position indicator under
        the first active tab.
    */

    requestAnimationFrame(() => {

        const activeTab =
            workspaceTabs.querySelector(
                ".workspace-tab.active"
            );


        if (activeTab) {

            moveTabIndicator(
                activeTab,
                false
            );

        }

    });

}


/* =========================================
   MOVE TOP TAB INDICATOR
   ========================================= */

function moveTabIndicator(
    tab,
    animate = true
) {

    const indicator =
        workspaceTabs.querySelector(
            ".workspace-tab-indicator"
        );


    if (!indicator || !tab) {
        return;
    }


    const containerRect =
        workspaceTabs.getBoundingClientRect();


    const tabRect =
        tab.getBoundingClientRect();


    const left =
        tabRect.left -
        containerRect.left +
        workspaceTabs.scrollLeft;


    const sidePadding = 12;


    indicator.style.transition =
        animate
            ? "left 180ms ease, width 180ms ease"
            : "none";


    indicator.style.left =
        `${left + sidePadding}px`;


    indicator.style.width =
        `${tabRect.width - (sidePadding * 2)}px`;

}


/* =========================================
   SCROLL TO SECTION
   ========================================= */

function scrollToSection(sectionId) {

    const section =
        document.getElementById(
            sectionId
        );


    if (!section) {
        return;
    }


    const contentTop =
        workspaceContent
            .getBoundingClientRect()
            .top;


    const sectionTop =
        section
            .getBoundingClientRect()
            .top;


    const scrollPosition =
        workspaceContent.scrollTop +
        sectionTop -
        contentTop -
        18;


    workspaceContent.scrollTo({
        top: scrollPosition,
        behavior: "smooth"
    });


    setActiveTabBySection(
        sectionId
    );

}


/* =========================================
   SET ACTIVE TOP TAB
   ========================================= */

function setActiveTabBySection(
    sectionId
) {

    const tabs =
        workspaceTabs.querySelectorAll(
            ".workspace-tab"
        );


    let selectedTab = null;


    tabs.forEach(tab => {

        const isActive =
            tab.dataset.sectionId ===
            sectionId;


        tab.classList.toggle(
            "active",
            isActive
        );


        if (isActive) {

            selectedTab =
                tab;

        }

    });


    /*
        Slide indicator to active tab.
    */

    if (selectedTab) {

        moveTabIndicator(
            selectedTab
        );

    }

}


/* =========================================
   WATCH SECTIONS WHILE SCROLLING
   ========================================= */

function setupSectionObserver(page) {

    if (sectionObserver) {

        sectionObserver.disconnect();

    }


    const sections =
        page.querySelectorAll(
            ".page-section[data-tab]"
        );


    sectionObserver =
        new IntersectionObserver(

            entries => {

                const visibleEntries =
                    entries
                        .filter(
                            entry =>
                                entry.isIntersecting
                        )
                        .sort(
                            (a, b) =>
                                b.intersectionRatio -
                                a.intersectionRatio
                        );


                if (
                    visibleEntries.length > 0
                ) {

                    setActiveTabBySection(
                        visibleEntries[0]
                            .target
                            .id
                    );

                }

            },

            {
                root:
                    workspaceContent,

                rootMargin:
                    "-10% 0px -65% 0px",

                threshold: [
                    0,
                    0.1,
                    0.25,
                    0.5
                ]
            }

        );


    sections.forEach(
        section => {

            sectionObserver.observe(
                section
            );

        }
    );

}


/* =========================================
   SIDEBAR NAVIGATION
   ========================================= */

pageNavigation.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                openPage(
                    button.dataset.page,
                    true
                );

            }
        );

    }
);


/* =========================================
   INTERNAL PAGE LINKS
   ========================================= */

internalPageLinks.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                openPage(
                    button.dataset.page,
                    true
                );

            }
        );

    }
);


/* =========================================
   INITIALIZE SKILLS
   ========================================= */

buildProgrammingLanguageCards();

buildFrameworkCards();

buildToolsCards();

buildAdditionalSkillsCards();


buildExperiences();


buildProjects();

buildEducation();

buildCertifications();


openPage(
    "home",
    false
);