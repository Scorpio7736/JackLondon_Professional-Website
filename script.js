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

const sidebarNavigation =
    document.querySelector(".sidebar-nav");

const internalPageLinks =
    document.querySelectorAll(".internal-page-link");

const pages =
    document.querySelectorAll(".page-view");

const workspaceTabs =
    document.getElementById("workspaceTabs");

const workspaceHeader =
    document.querySelector(".workspace-header");

const workspaceTitle =
    document.getElementById("workspaceTitle");

const workspacePath =
    document.getElementById("workspacePath");

const workspaceContent =
    document.querySelector(".workspace-content");


let activePageName = null;
let sectionObserver = null;

let pageTransitionId = 0;

let workspaceScrollAnimation = null;

let isProgrammaticScroll = false;


/* =========================================
   SETUP SIDEBAR INDICATOR
   ========================================= */

function setupSidebarIndicator() {

    if (!sidebarNavigation) {
        return;
    }


    let indicator =
        sidebarNavigation.querySelector(
            ".sidebar-nav-indicator"
        );


    if (!indicator) {

        indicator =
            document.createElement(
                "div"
            );


        indicator.classList.add(
            "sidebar-nav-indicator"
        );


        sidebarNavigation.prepend(
            indicator
        );

    }


    requestAnimationFrame(
        () => {

            const activeButton =
                sidebarNavigation.querySelector(
                    ".page-nav.active"
                );


            if (activeButton) {

                moveSidebarIndicator(
                    activeButton,
                    false
                );

            }

        }
    );

}


/* =========================================
   MOVE SIDEBAR INDICATOR
   ========================================= */

function moveSidebarIndicator(
    button,
    animate = true
) {

    if (
        !sidebarNavigation ||
        !button
    ) {
        return;
    }


    const indicator =
        sidebarNavigation.querySelector(
            ".sidebar-nav-indicator"
        );


    if (!indicator) {
        return;
    }


    indicator.style.transition =
        animate
            ? "transform 220ms ease, height 220ms ease"
            : "none";


    indicator.style.height =
        `${button.offsetHeight}px`;


    indicator.style.transform =
        `translateY(${button.offsetTop}px)`;

}


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


    if (
        pageName === activePageName &&
        selectedPage.classList.contains(
            "active"
        )
    ) {
        return;
    }


    let selectedNavigationButton =
        null;


    pageNavigation.forEach(
        button => {

            const isActive =
                button.dataset.page ===
                pageName;


            button.classList.toggle(
                "active",
                isActive
            );


            if (isActive) {

                selectedNavigationButton =
                    button;

            }

        }
    );


    if (selectedNavigationButton) {

        moveSidebarIndicator(
            selectedNavigationButton,
            animate
        );

    }


    const config =
        pageConfig[pageName];


    pageTransitionId++;


    const transitionId =
        pageTransitionId;


    const switchPage = () => {

        if (
            transitionId !==
            pageTransitionId
        ) {
            return;
        }


        pages.forEach(
            page => {

                page.classList.remove(
                    "active"
                );

            }
        );


        selectedPage.classList.add(
            "active"
        );


        activePageName =
            pageName;


        if (config) {

            workspaceTitle.textContent =
                config.title;

            workspacePath.textContent =
                config.path;

        }


        workspaceContent.scrollTop =
            0;


        buildTabs(
            selectedPage
        );


        setupSectionObserver(
            selectedPage
        );


        if (!animate) {

            workspaceContent.classList.remove(
                "workspace-switching",
                "workspace-entering",
                "workspace-entering-active"
            );


            workspaceHeader.classList.remove(
                "workspace-meta-switching",
                "workspace-meta-entering",
                "workspace-meta-entering-active"
            );


            workspaceTabs.classList.remove(
                "workspace-meta-switching",
                "workspace-meta-entering",
                "workspace-meta-entering-active"
            );


            return;

        }


        workspaceContent.classList.remove(
            "workspace-switching"
        );


        workspaceContent.classList.add(
            "workspace-entering"
        );


        workspaceHeader.classList.remove(
            "workspace-meta-switching"
        );


        workspaceTabs.classList.remove(
            "workspace-meta-switching"
        );


        workspaceHeader.classList.add(
            "workspace-meta-entering"
        );


        workspaceTabs.classList.add(
            "workspace-meta-entering"
        );


        void workspaceContent.offsetWidth;
        void workspaceHeader.offsetWidth;
        void workspaceTabs.offsetWidth;


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


                workspaceHeader.classList.add(
                    "workspace-meta-entering-active"
                );


                workspaceTabs.classList.add(
                    "workspace-meta-entering-active"
                );


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


                        workspaceHeader.classList.remove(
                            "workspace-meta-entering",
                            "workspace-meta-entering-active"
                        );


                        workspaceTabs.classList.remove(
                            "workspace-meta-entering",
                            "workspace-meta-entering-active"
                        );

                    },
                    400
                );

            }
        );

    };


    if (!animate) {

        switchPage();

        return;

    }


    workspaceContent.classList.remove(
        "workspace-entering",
        "workspace-entering-active"
    );


    workspaceHeader.classList.remove(
        "workspace-meta-entering",
        "workspace-meta-entering-active"
    );


    workspaceTabs.classList.remove(
        "workspace-meta-entering",
        "workspace-meta-entering-active"
    );


    workspaceContent.classList.add(
        "workspace-switching"
    );


    workspaceHeader.classList.add(
        "workspace-meta-switching"
    );


    workspaceTabs.classList.add(
        "workspace-meta-switching"
    );


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


    requestAnimationFrame(
        () => {

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

        }
    );

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


    const sidePadding =
        12;


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

function scrollToSection(
    sectionId
) {

    const section =
        document.getElementById(
            sectionId
        );


    if (
        !section ||
        !workspaceContent
    ) {
        return;
    }


    isProgrammaticScroll =
        true;


    setActiveTabBySection(
        sectionId
    );


    const contentRect =
        workspaceContent
            .getBoundingClientRect();


    const sectionRect =
        section
            .getBoundingClientRect();


    const startScroll =
        workspaceContent.scrollTop;


    const targetScroll =
        startScroll +
        sectionRect.top -
        contentRect.top -
        18;


    const maxScroll =
        workspaceContent.scrollHeight -
        workspaceContent.clientHeight;


    const finalTarget =
        Math.max(
            0,
            Math.min(
                targetScroll,
                maxScroll
            )
        );


    animateWorkspaceScroll(
        startScroll,
        finalTarget,
        500,
        sectionId
    );

}


/* =========================================
   ANIMATE WORKSPACE SCROLL
   ========================================= */

function animateWorkspaceScroll(
    start,
    target,
    duration,
    sectionId
) {

    if (
        workspaceScrollAnimation
    ) {

        cancelAnimationFrame(
            workspaceScrollAnimation
        );


        workspaceScrollAnimation =
            null;

    }


    const distance =
        target - start;


    if (
        Math.abs(distance) < 1
    ) {

        workspaceContent.scrollTop =
            target;


        setActiveTabBySection(
            sectionId
        );


        isProgrammaticScroll =
            false;


        return;

    }


    const startTime =
        performance.now();


    function animationStep(
        currentTime
    ) {

        const elapsed =
            currentTime -
            startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const easedProgress =
            progress < 0.5

                ? 4 *
                  progress *
                  progress *
                  progress

                : 1 -
                  Math.pow(
                      -2 * progress + 2,
                      3
                  ) / 2;


        workspaceContent.scrollTop =
            start +
            distance *
            easedProgress;


        if (
            progress < 1
        ) {

            workspaceScrollAnimation =
                requestAnimationFrame(
                    animationStep
                );

        }
        else {

            workspaceContent.scrollTop =
                target;


            workspaceScrollAnimation =
                null;


            setActiveTabBySection(
                sectionId
            );


            isProgrammaticScroll =
                false;

        }

    }


    workspaceScrollAnimation =
        requestAnimationFrame(
            animationStep
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


    let selectedTab =
        null;


    tabs.forEach(
        tab => {

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

        }
    );


    if (selectedTab) {

        moveTabIndicator(
            selectedTab
        );

    }

}


/* =========================================
   WATCH SECTIONS WHILE SCROLLING
   ========================================= */

function setupSectionObserver(
    page
) {

    if (
        sectionObserver
    ) {

        sectionObserver.disconnect();

    }


    const sections =
        page.querySelectorAll(
            ".page-section[data-tab]"
        );


    sectionObserver =
        new IntersectionObserver(

            entries => {

                if (
                    isProgrammaticScroll
                ) {
                    return;
                }


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
                    visibleEntries.length >
                    0
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
   SIDEBAR RESIZE POSITION
   ========================================= */

window.addEventListener(
    "resize",
    () => {

        const activeButton =
            sidebarNavigation?.querySelector(
                ".page-nav.active"
            );


        if (activeButton) {

            moveSidebarIndicator(
                activeButton,
                false
            );

        }

    }
);


/* =========================================
   INITIALIZE
   ========================================= */

setupSidebarIndicator();


/* =========================================
   INITIALIZE SKILLS
   ========================================= */

buildProgrammingLanguageCards();

buildFrameworkCards();

buildToolsCards();

buildAdditionalSkillsCards();


/* =========================================
   INITIALIZE EXPERIENCE
   ========================================= */

buildExperiences();


/* =========================================
   INITIALIZE PROJECTS
   ========================================= */

buildProjects();


/* =========================================
   INITIALIZE EDUCATION
   ========================================= */

buildEducation();

buildCertifications();


/* =========================================
   OPEN INITIAL PAGE
   ========================================= */

openPage(
    "home",
    false
);