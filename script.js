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


    /*
        Ignore clicks on the page
        already being displayed.
    */

    if (
        pageName === activePageName &&
        selectedPage.classList.contains(
            "active"
        )
    ) {
        return;
    }


    /*
        Update sidebar immediately.
    */

    pageNavigation.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.page === pageName
        );

    });


    /*
        Update workspace title.
    */

    const config =
        pageConfig[pageName];


    if (config) {

        workspaceTitle.textContent =
            config.title;

        workspacePath.textContent =
            config.path;

    }


    /*
        Create a new transition ID.

        If the user clicks another page
        quickly, old transitions are ignored.
    */

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


        /*
            Hide all pages.
        */

        pages.forEach(page => {

            page.classList.remove(
                "active"
            );

        });


        /*
            Show selected page.
        */

        selectedPage.classList.add(
            "active"
        );


        activePageName =
            pageName;


        /*
            Reset scroll position.
        */

        workspaceContent.scrollTop = 0;


        /*
            Build page-specific tabs.
        */

        buildTabs(
            selectedPage
        );


        /*
            Watch page sections.
        */

        setupSectionObserver(
            selectedPage
        );


        /*
            Fade workspace back in.
        */

        workspaceContent.classList.remove(
            "workspace-switching"
        );

    };


    /* =====================================
       INITIAL LOAD
       ===================================== */

    if (!animate) {

        switchPage();

        return;
    }


    /* =====================================
       FADE OUT WORKSPACE
       ===================================== */

    workspaceContent.classList.add(
        "workspace-switching"
    );


    /*
        Wait for the short fade-out
        before replacing the page.
    */

    setTimeout(
        switchPage,
        120
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
   INITIALIZE WEBSITE
   ========================================= */

/*
    These functions are defined
    inside skills.js.
*/

buildProgrammingLanguageCards();

buildFrameworkCards();

buildToolsCards();

buildAdditionalSkillsCards();


/*
    Start website on Home.

    No animation is used during
    initial page load.
*/

openPage(
    "home",
    false
);