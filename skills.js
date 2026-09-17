/* =========================================
   PROGRAMMING LANGUAGES
   ========================================= */

const programmingLanguages = [

    {
        name: "C#",
        shortName: "C#",
        image: "Images/Icons/CSharp_ICON.png",
        comfort: 9,

        projects: [
            "Schedule Creator V2",
            "Sun Life DentaQuest Automations",
            "ESP-32 Desktop Application"
        ]
    },

    {
        name: "Java",
        shortName: "JAVA",
        image: "Images/Icons/Java_ICON.png",
        comfort: 8,

        projects: [
            "The Ultimate Easter Egg Guide",
            "Android Development Projects",
            "JavaFX Applications"
        ]
    },

    {
        name: "Python",
        shortName: "PY",
        image: "Images/Icons/Python_ICON.png",
        comfort: 8,

        projects: [
            "Almost English Code",
            "Automation Scripts",
            "Data & Utility Projects"
        ]
    },

    {
        name: "SQL",
        shortName: "SQL",
        image: "Images/Icons/SQL_ICON.png",
        comfort: 8,

        projects: [
            "Schedule Creator V2",
            "Scheduling Database",
            "Tracking & Reporting Queries"
        ]
    },

    {
        name: "Swift",
        shortName: "SWIFT",
        image: "Images/Icons/Swift_ICON.png",
        comfort: 7,

        projects: [
            "MTG Pack Opener",
            "iOS Profile System",
            "SwiftUI Applications"
        ]
    },

    {
        name: "C",
        shortName: "C",
        image: "Images/Icons/C_ICON.png",
        comfort: 6,

        projects: [
            "University Coursework",
            "Pointers & Memory Exercises"
        ]
    },

    {
        name: "C++",
        shortName: "C++",
        image: "Images/Icons/CPP_ICON.png",
        comfort: 6,

        projects: [
            "University Programming Projects"
        ]
    }

];

/* =========================================
   FRAMEWORKS & UI
   ========================================= */

const frameworks = [

    {
        name: ".NET",
        shortName: ".NET",
        image: "Images/Frameworks/DotNet.png",
        comfort: 9,

        projects: [
            "Schedule Creator V2",
            "Sun Life DentaQuest Automations",
            "Desktop Application Development"
        ]
    },

    {
        name: "WPF",
        shortName: "WPF",
        image: "Images/Frameworks/WPF.png",
        comfort: 9,

        projects: [
            "Schedule Creator V2",
            "ESP-32 Desktop Application",
            "C# Desktop Interfaces"
        ]
    },

    {
        name: "XAML",
        shortName: "XAML",
        image: "Images/Frameworks/XAML.png",
        comfort: 9,

        projects: [
            "Schedule Creator V2",
            "WPF User Interfaces",
            "Desktop UI Development"
        ]
    },

    {
        name: "SwiftUI",
        shortName: "SUI",
        image: "Images/Frameworks/SwiftUI.png",
        comfort: 7,

        projects: [
            "MTG Pack Opener",
            "iOS Profile System",
            "iOS Interface Development"
        ]
    },

    {
        name: "Android",
        shortName: "AND",
        image: "Images/Frameworks/Android.png",
        comfort: 8,

        projects: [
            "The Ultimate Easter Egg Guide",
            "Android UI Development",
            "Mobile Application Development"
        ]
    },

    {
        name: "JavaFX",
        shortName: "JFX",
        image: "Images/Frameworks/JavaFX.png",
        comfort: 7,

        projects: [
            "University Projects",
            "Java Desktop Interfaces"
        ]
    }

];


/* =========================================
   BUILD PROGRAMMING LANGUAGE CARDS
   ========================================= */

/* =========================================
   BUILD SKILL CARDS
   ========================================= */

function buildSkillCards(
    containerId,
    skillList
) {

    const container =
        document.getElementById(
            containerId
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    skillList.forEach(
        skill => {

            /* =================================
               CARD
               ================================= */

            const card =
                document.createElement(
                    "article"
                );


            card.classList.add(
                "language-card"
            );


            /* =================================
               IMAGE AREA
               ================================= */

            const imageArea =
                document.createElement(
                    "div"
                );


            imageArea.classList.add(
                "language-card-image"
            );


            const fallback =
                document.createElement(
                    "span"
                );


            fallback.classList.add(
                "language-image-fallback"
            );


            fallback.textContent =
                skill.shortName;


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                skill.image;


            image.alt =
                `${skill.name} logo`;


            image.addEventListener(
                "load",
                () => {

                    fallback.style.display =
                        "none";

                }
            );


            image.addEventListener(
                "error",
                () => {

                    image.style.display =
                        "none";

                }
            );


            imageArea.appendChild(
                fallback
            );


            imageArea.appendChild(
                image
            );


            /* =================================
               HEADER
               ================================= */

            const header =
                document.createElement(
                    "div"
                );


            header.classList.add(
                "language-card-header"
            );


            const title =
                document.createElement(
                    "h3"
                );


            title.textContent =
                skill.name;


            const comfort =
                document.createElement(
                    "span"
                );


            comfort.classList.add(
                "language-comfort"
            );


            comfort.innerHTML =
                `<strong>${skill.comfort}</strong> / 10`;


            header.appendChild(
                title
            );


            header.appendChild(
                comfort
            );


            /* =================================
               COMFORT BAR
               ================================= */

            const comfortBar =
                document.createElement(
                    "div"
                );


            comfortBar.classList.add(
                "comfort-bar"
            );


            const comfortFill =
                document.createElement(
                    "div"
                );


            comfortFill.classList.add(
                "comfort-bar-fill"
            );


            const comfortLevel =
                Math.max(
                    0,
                    Math.min(
                        skill.comfort,
                        10
                    )
                );


            comfortFill.style.width =
                `${comfortLevel * 10}%`;


            comfortBar.appendChild(
                comfortFill
            );


            /* =================================
               PROJECT LIST
               ================================= */

            const projectSection =
                document.createElement(
                    "div"
                );


            projectSection.classList.add(
                "language-projects"
            );


            const projectLabel =
                document.createElement(
                    "span"
                );


            projectLabel.classList.add(
                "language-project-label"
            );


            projectLabel.textContent =
                "Used in";


            const projectList =
                document.createElement(
                    "ul"
                );


            skill.projects.forEach(
                project => {

                    const item =
                        document.createElement(
                            "li"
                        );


                    item.textContent =
                        project;


                    projectList.appendChild(
                        item
                    );

                }
            );


            projectSection.appendChild(
                projectLabel
            );


            projectSection.appendChild(
                projectList
            );


            /* =================================
               BUILD CARD
               ================================= */

            card.appendChild(
                imageArea
            );


            card.appendChild(
                header
            );


            card.appendChild(
                comfortBar
            );


            card.appendChild(
                projectSection
            );


            container.appendChild(
                card
            );

        }
    );

}

/* =========================================
   BUILD LANGUAGE CARDS
   ========================================= */

function buildProgrammingLanguageCards() {

    buildSkillCards(
        "languageCardGrid",
        programmingLanguages
    );

}


/* =========================================
   BUILD FRAMEWORK CARDS
   ========================================= */

function buildFrameworkCards() {

    buildSkillCards(
        "frameworkCardGrid",
        frameworks
    );

}