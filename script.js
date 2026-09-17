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


let activePageName = "home";
let sectionObserver = null;


/* =========================================
   OPEN PAGE
   ========================================= */

function openPage(pageName) {

    const selectedPage =
        document.querySelector(
            `.page-view[data-page="${pageName}"]`
        );


    if (!selectedPage) {
        return;
    }


    activePageName = pageName;


    /* Hide all pages */

    pages.forEach(page => {

        page.classList.remove(
            "active"
        );

    });


    /* Show selected page */

    selectedPage.classList.add(
        "active"
    );


    /* Update sidebar */

    pageNavigation.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.page === pageName
        );

    });


    /* Update workspace header */

    const config =
        pageConfig[pageName];


    if (config) {

        workspaceTitle.textContent =
            config.title;

        workspacePath.textContent =
            config.path;

    }


    /* Reset scroll position */

    workspaceContent.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    /* Build page-specific tabs */

    buildTabs(
        selectedPage
    );


    /* Watch sections while scrolling */

    setupSectionObserver(
        selectedPage
    );

}


/* =========================================
   BUILD TOP TABS
   ========================================= */

function buildTabs(page) {

    workspaceTabs.innerHTML = "";


    /* Create sliding indicator */

    const indicator =
        document.createElement("div");

    indicator.classList.add(
        "workspace-tab-indicator"
    );

    workspaceTabs.appendChild(
        indicator
    );


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


    /* Position indicator under first tab */

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


    /*
        Position relative to the tabs container.
    */

    const containerRect =
        workspaceTabs.getBoundingClientRect();


    const tabRect =
        tab.getBoundingClientRect();


    const left =
        tabRect.left -
        containerRect.left +
        workspaceTabs.scrollLeft;


    /*
        Keep the underline slightly smaller
        than the tab itself.
    */

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
        Slide indicator to new tab.
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
                    button.dataset.page
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
                    button.dataset.page
                );

            }
        );

    }
);


/* =========================================
   INITIALIZE WEBSITE
   ========================================= */

/*
    This function is defined
    inside skills.js.
*/

buildProgrammingLanguageCards();

buildFrameworkCards();

buildToolsCards();

buildAdditionalSkillsCards();

openPage("home");