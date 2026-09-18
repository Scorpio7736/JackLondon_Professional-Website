/* =========================================
   EXPERIENCE DATA
   ========================================= */

const experiences = [

    {
        containerId: "experienceDentaQuest",

        company: "Sun Life DentaQuest",

        position:
            "IT Service & Delivery Intern",

        icon:
            "Images/Icons/DQ_ICON.png",

        iconFallback:
            "DQ",

        location:
            "Milwaukee, Wisconsin",

        startDate:
            "June 2026",

        endDate:
            "August 2026",

        type:
            "Internship",

        responsibilities: [
            "Worked with the FHIR API and Papercut Avengers teams on internal technology initiatives.",

            "Developed C# automation tools to improve internal processes and reduce repetitive work.",

            "Enhanced internal Utilization Management tools and supporting functionality.",

            "Created training microsites and webpages for internal users.",

            "Improved FHIR API user interfaces and supporting application functionality."
        ]
    },


    {
        containerId: "experienceUREC",

        company:
            "UW–Green Bay UREC Outdoors",

        position:
            "Lead Supervisor — Climbing Tower",

        icon:
            "Images/Icons/UREC_ICON.png",

        iconFallback:
            "UR",

        location:
            "Green Bay, Wisconsin",

        startDate:
            "September 2022",

        endDate:
            "Present",

        type:
            "Leadership",

        responsibilities: [
            "Oversee daily climbing tower operations, staff coverage, opening procedures, and closing procedures.",

            "Create staff schedules and coordinate employee availability and shift coverage.",

            "Train climbing tower staff and lead staff development and in-service sessions.",

            "Inspect, maintain, and document climbing equipment and operational safety procedures.",

            "Teach top-rope belay, climbing movement, and related instructional classes.",

            "Plan climbing events and support broader UREC Outdoors programming.",

            "Develop workflow documentation, training materials, and operational resources for staff."
        ]
    },

    {
        containerId: "experienceUREC",

        company:
            "UW–Green Bay UREC Outdoors",

        position:
            "Route Setter — Climbing Tower",

        icon:
            "Images/Icons/RouteSetters_ICON.png",

        iconFallback:
            "RS",

        location:
            "Green Bay, Wisconsin",

        startDate:
            "Fall 2024",

        endDate:
            "Present",

        type:
            "Team Member",

        responsibilities: [
            "Fill",
            "In",
            "with",
            "actual",
            "responsibilities"
        ]
    },

    {
    containerId:
        "experienceERT",

    company:
        "UW–Green Bay Emergency Response Team",

    position:
        "Emergency Response Team - Team Leader",

    icon:
        "Images/Icons/ERT_ICON.png",

    iconFallback:
        "ERT",

    location:
        "Green Bay, Wisconsin",

    startDate:
        "February 2025",

    endDate:
        "Present",

    type:
        "Leadership",

    responsibilities: [
        "Oversee the readiness and effectiveness of staff responding to physical, medical, and environmental emergencies.",

        "Conduct comprehensive staff testing using simulated physical, medical, and environmental emergency scenarios.",

        "Evaluate staff readiness, decision-making, and response effectiveness during emergency simulations.",

        "Plan, organize, and lead emergency response drills to prepare staff for real-world incidents.",

        "Ensure emergency response procedures remain aligned with university safety standards and expectations.",

        "Coordinate staff during emergency-response training and simulated incidents.",

        "Manage incident documentation and reports, maintaining accurate and organized records for review and continuous improvement."
    ]
},


    {
        containerId:
            "experienceAshwaubenon",

        company:
            "Ashwaubenon Community Center",

        position:
            "Building Supervisor",

        icon:
            "Images/Icons/ACC_ICON.png",

        iconFallback:
            "ACC",

        location:
            "Ashwaubenon, Wisconsin",

        startDate:
            "September 2022",

        endDate:
            "Present",

        type:
            "Operations",

        responsibilities: [
            "Supervise building operations during scheduled community events and facility rentals.",

            "Open and close the facility while ensuring building procedures are completed correctly.",

            "Assist renters and community members with facility needs and operational questions.",

            "Monitor building security and respond to issues that arise during events.",

            "Maintain supplies and help ensure rooms and shared spaces are prepared for use."
        ]
    },


    {
        containerId:
            "experienceScoop",

        company:
            "Scoop DeVille",

        position:
            "Shift Leader",

        icon:
            "Images/Icons/ScoopDeVille_ICON.png",

        iconFallback:
            "SD",

        location:
            "Hartford, Wisconsin",

        startDate:
            "June 2021",

        endDate:
            "September 2023",

        type:
            "Leadership",

        responsibilities: [
            "Led employees during scheduled shifts and helped coordinate daily store operations.",

            "Trained new employees on customer service, food preparation, and store procedures.",

            "Maintained product quality and provided customer service during high-volume periods.",

            "Handled cash management and register responsibilities.",

            "Completed closing procedures and helped prepare the store for the following day."
        ]
    }

];


/* =========================================
   BUILD ALL EXPERIENCES
   ========================================= */

function buildExperiences() {

    experiences.forEach(
        experience => {

            buildExperience(
                experience
            );

        }
    );

}


/* =========================================
   BUILD EXPERIENCE
   ========================================= */

function buildExperience(
    experience
) {

    const container =
        document.getElementById(
            experience.containerId
        );


    if (!container) {

        console.warn(
            "Experience container not found:",
            experience.containerId
        );

        return;

    }


    container.innerHTML = "";


    /* =====================================
       EXPERIENCE GRID
       ===================================== */

    const grid =
        document.createElement(
            "div"
        );


    grid.classList.add(
        "experience-grid"
    );


    /* =====================================
       BUSINESS CELL
       ===================================== */

    const businessCell =
        document.createElement(
            "article"
        );


    businessCell.classList.add(
        "experience-cell",
        "experience-business"
    );


    /* =====================================
       BUSINESS TOP
       ===================================== */

    const businessTop =
        document.createElement(
            "div"
        );


    businessTop.classList.add(
        "experience-business-top"
    );


    /* =====================================
       ICON
       ===================================== */

    const iconWrapper =
        document.createElement(
            "div"
        );


    iconWrapper.classList.add(
        "experience-icon"
    );


    const iconFallback =
        document.createElement(
            "span"
        );


    iconFallback.classList.add(
        "experience-icon-fallback"
    );


    iconFallback.textContent =
        experience.iconFallback;


    const icon =
        document.createElement(
            "img"
        );


    icon.src =
        experience.icon;


    icon.alt =
        `${experience.company} logo`;


    icon.addEventListener(
        "load",
        () => {

            iconFallback.style.display =
                "none";

        }
    );


    icon.addEventListener(
        "error",
        () => {

            icon.style.display =
                "none";

        }
    );


    iconWrapper.appendChild(
        iconFallback
    );


    iconWrapper.appendChild(
        icon
    );


    /* =====================================
       TYPE
       ===================================== */

    const typeBadge =
        document.createElement(
            "span"
        );


    typeBadge.classList.add(
        "experience-type"
    );


    typeBadge.textContent =
        experience.type;


    businessTop.appendChild(
        iconWrapper
    );


    businessTop.appendChild(
        typeBadge
    );


    /* =====================================
       TITLE
       ===================================== */

    const titleArea =
        document.createElement(
            "div"
        );


    titleArea.classList.add(
        "experience-business-title"
    );


    const companyName =
        document.createElement(
            "span"
        );


    companyName.classList.add(
        "experience-eyebrow"
    );


    companyName.textContent =
        experience.company;


    const positionTitle =
        document.createElement(
            "h2"
        );


    positionTitle.textContent =
        experience.position;


    titleArea.appendChild(
        companyName
    );


    titleArea.appendChild(
        positionTitle
    );


    /* =====================================
       DETAIL CELLS
       ===================================== */

    const detailGrid =
        document.createElement(
            "div"
        );


    detailGrid.classList.add(
        "experience-details"
    );


    const locationCell =
        createExperienceDetailCell(
            "Location",
            experience.location,
            "⌖"
        );


    const timelineCell =
        createExperienceTimelineCell(
            experience.startDate,
            experience.endDate
        );


    detailGrid.appendChild(
        locationCell
    );


    detailGrid.appendChild(
        timelineCell
    );


    /* =====================================
       RESPONSIBILITIES INNER CELL
       ===================================== */

    const responsibilitiesCell =
        document.createElement(
            "div"
        );


    responsibilitiesCell.classList.add(
        "experience-detail-cell",
        "experience-responsibilities"
    );


    const responsibilitiesContent =
        document.createElement(
            "div"
        );


    responsibilitiesContent.classList.add(
        "experience-responsibilities-content"
    );


    const responsibilityLabel =
        document.createElement(
            "span"
        );


    responsibilityLabel.classList.add(
        "experience-cell-label"
    );


    responsibilityLabel.textContent =
        "Responsibilities";


    const responsibilityTitle =
        document.createElement(
            "h3"
        );


    responsibilityTitle.textContent =
        "What I did";


    const responsibilityList =
        document.createElement(
            "ul"
        );


    responsibilityList.classList.add(
        "experience-responsibility-list"
    );


    experience.responsibilities.forEach(
        responsibility => {

            const listItem =
                document.createElement(
                    "li"
                );


            listItem.textContent =
                responsibility;


            responsibilityList.appendChild(
                listItem
            );

        }
    );


    responsibilitiesContent.appendChild(
        responsibilityLabel
    );


    responsibilitiesContent.appendChild(
        responsibilityTitle
    );


    responsibilitiesContent.appendChild(
        responsibilityList
    );


    responsibilitiesCell.appendChild(
        responsibilitiesContent
    );


    /* =====================================
       BUILD BUSINESS CELL
       ===================================== */

    businessCell.appendChild(
        businessTop
    );


    businessCell.appendChild(
        titleArea
    );


    businessCell.appendChild(
        detailGrid
    );


    businessCell.appendChild(
        responsibilitiesCell
    );


    grid.appendChild(
        businessCell
    );


    container.appendChild(
        grid
    );

}

/* =========================================
   CREATE DETAIL CELL
   ========================================= */

function createExperienceDetailCell(
    label,
    value,
    symbol
) {

    const cell =
        document.createElement(
            "div"
        );


    cell.classList.add(
        "experience-detail-cell"
    );


    /* ICON */

    const icon =
        document.createElement(
            "span"
        );


    icon.classList.add(
        "experience-info-icon"
    );


    icon.textContent =
        symbol;


    /* CONTENT */

    const content =
        document.createElement(
            "div"
        );


    content.classList.add(
        "experience-detail-content"
    );


    const labelElement =
        document.createElement(
            "span"
        );


    labelElement.classList.add(
        "experience-cell-label"
    );


    labelElement.textContent =
        label;


    const valueElement =
        document.createElement(
            "strong"
        );


    valueElement.textContent =
        value;


    content.appendChild(
        labelElement
    );


    content.appendChild(
        valueElement
    );


    cell.appendChild(
        icon
    );


    cell.appendChild(
        content
    );


    return cell;

}


/* =========================================
   CREATE TIMELINE CELL
   ========================================= */

function createExperienceTimelineCell(
    startDate,
    endDate
) {

    const cell =
        document.createElement(
            "div"
        );


    cell.classList.add(
        "experience-detail-cell",
        "experience-timeline-cell"
    );


    /* ICON */

    const icon =
        document.createElement(
            "span"
        );


    icon.classList.add(
        "experience-info-icon"
    );


    icon.textContent =
        "↔";


    /* CONTENT */

    const content =
        document.createElement(
            "div"
        );


    content.classList.add(
        "experience-detail-content"
    );


    const label =
        document.createElement(
            "span"
        );


    label.classList.add(
        "experience-cell-label"
    );


    label.textContent =
        "Timeline";


    const timeline =
        document.createElement(
            "div"
        );


    timeline.classList.add(
        "experience-inline-timeline"
    );


    const start =
        document.createElement(
            "span"
        );


    start.textContent =
        startDate;


    const arrow =
        document.createElement(
            "span"
        );


    arrow.classList.add(
        "experience-date-arrow"
    );


    arrow.textContent =
        "→";


    const end =
        document.createElement(
            "span"
        );


    end.textContent =
        endDate;


    timeline.appendChild(
        start
    );


    timeline.appendChild(
        arrow
    );


    timeline.appendChild(
        end
    );


    content.appendChild(
        label
    );


    content.appendChild(
        timeline
    );


    cell.appendChild(
        icon
    );


    cell.appendChild(
        content
    );


    return cell;

}