/* =========================================
   CERTIFICATION DATA
   ========================================= */

const certifications = [

    /* =====================================
       TOP ROPE BELAY
       ===================================== */

    {
        title:
            "Top Rope Belay",

        icon:
            "Images/Icons/TopRopeCert_ICON.png",

        iconFallback:
            "TR",

        certificationDate:
            "",

        expirationDate:
            "",

        status:
            "active",

        description:
            "Top rope belay certification demonstrating safe belay technique, climber communication, equipment checks, and proper rope management."
    },


    /* =====================================
       TOP ROPE BELAY INSTRUCTOR
       ===================================== */

    {
        title:
            "Top Rope Belay Instructor",

        icon:
            "Images/Icons/BelayInstructor_ICON.png",

        iconFallback:
            "BI",

        certificationDate:
            "",

        expirationDate:
            "",

        status:
            "active",

        description:
            "Instructor-level certification focused on teaching top rope belay technique, evaluating belay competency, and reinforcing climbing safety standards."
    },


    /* =====================================
       CPR / FIRST AID / AED
       ===================================== */

    {
        title:
            "CPR, First Aid, and AED",

        icon:
            "Images/Icons/CPR_ICON.png",

        iconFallback:
            "CPR",

        certificationDate:
            "",

        expirationDate:
            "",

        status:
            "active",

        description:
            "Emergency response training covering CPR, basic first aid, AED operation, and initial care during medical emergencies."
    },


    /* =====================================
       MICROSOFT AZURE
       ===================================== */

    {
        title:
            "Microsoft Azure",

        icon:
            "Images/Icons/Azure_ICON.png",

        iconFallback:
            "AZ",

        certificationDate:
            "",

        expirationDate:
            "",

        status:
            "in-progress",

        description:
            "Currently developing knowledge of Microsoft Azure cloud services, infrastructure, resource management, and cloud computing concepts."
    },


    /* =====================================
       MICROSOFT OFFICE 365
       ===================================== */

    {
        title:
            "Microsoft Office 365",

        icon:
            "Images/Icons/Office365_ICON.png",

        iconFallback:
            "365",

        certificationDate:
            "",

        expirationDate:
            "",

        status:
            "in-progress",

        description:
            "Currently expanding proficiency with Microsoft 365 applications, collaboration tools, productivity workflows, and cloud-based Office services."
    }

];

/* =========================================
   EDUCATION DATA
   ========================================= */

const education = [

    {
        containerId:
            "educationUWGB",

        school:
            "University of Wisconsin–Green Bay",

        icon:
            "Images/Icons/UWGB_ICON.png",

        iconFallback:
            "UWGB",

        major:
            "Computer Science — Software Engineering Emphasis",

        startSemester:
            "Fall 2022",

        graduation:
            "May 2027",

        description:
            "Pursuing a Computer Science degree with an emphasis in Software Engineering, focused on practical application development, software design, databases, and modern development technologies. Coursework and personal projects have provided hands-on experience developing desktop, mobile, web, and database-driven applications."
    }

];

/* =========================================
   BUILD EDUCATION
   ========================================= */

function buildEducation() {

    education.forEach(
        school => {

            buildEducationSchool(
                school
            );

        }
    );

}


/* =========================================
   BUILD SCHOOL
   ========================================= */

function buildEducationSchool(
    school
) {

    const container =
        document.getElementById(
            school.containerId
        );


    if (!container) {

        console.warn(
            "Education container not found:",
            school.containerId
        );

        return;

    }


    container.innerHTML = "";


    /* =====================================
       MAIN CARD
       ===================================== */

    const card =
        document.createElement(
            "article"
        );


    card.classList.add(
        "education-school-card"
    );


    /* =====================================
       HEADER
       ===================================== */

    const header =
        document.createElement(
            "div"
        );


    header.classList.add(
        "education-school-header"
    );


    /* =====================================
       ICON
       ===================================== */

    const iconWrapper =
        document.createElement(
            "div"
        );


    iconWrapper.classList.add(
        "education-school-icon"
    );


    const fallback =
        document.createElement(
            "span"
        );


    fallback.classList.add(
        "education-school-icon-fallback"
    );


    fallback.textContent =
        school.iconFallback;


    const image =
        document.createElement(
            "img"
        );


    image.src =
        school.icon;


    image.alt =
        `${school.school} logo`;


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


    iconWrapper.appendChild(
        fallback
    );


    iconWrapper.appendChild(
        image
    );


    /* =====================================
       SCHOOL TITLE
       ===================================== */

    const heading =
        document.createElement(
            "div"
        );


    heading.classList.add(
        "education-school-heading"
    );


    const label =
        document.createElement(
            "span"
        );


    label.classList.add(
        "education-school-eyebrow"
    );


    label.textContent =
        "University";


    const schoolName =
        document.createElement(
            "h2"
        );


    schoolName.textContent =
        school.school;


    heading.appendChild(
        label
    );


    heading.appendChild(
        schoolName
    );


    header.appendChild(
        iconWrapper
    );


    header.appendChild(
        heading
    );


    /* =====================================
       MAJOR
       ===================================== */

    const major =
        document.createElement(
            "div"
        );


    major.classList.add(
        "education-major"
    );


    const majorLabel =
        document.createElement(
            "span"
        );


    majorLabel.classList.add(
        "education-cell-label"
    );


    majorLabel.textContent =
        "Major";


    const majorTitle =
        document.createElement(
            "h3"
        );


    majorTitle.textContent =
        school.major;


    major.appendChild(
        majorLabel
    );


    major.appendChild(
        majorTitle
    );


    /* =====================================
       DATE CELLS
       ===================================== */

    const details =
        document.createElement(
            "div"
        );


    details.classList.add(
        "education-detail-grid"
    );


    details.appendChild(
        createEducationDetailCell(
            "Start Semester",
            school.startSemester
        )
    );


    details.appendChild(
        createEducationDetailCell(
            "Expected Graduation",
            school.graduation
        )
    );


    /* =====================================
       DESCRIPTION
       ===================================== */

    const descriptionCell =
        document.createElement(
            "div"
        );


    descriptionCell.classList.add(
        "education-description-cell"
    );


    const descriptionLabel =
        document.createElement(
            "span"
        );


    descriptionLabel.classList.add(
        "education-cell-label"
    );


    descriptionLabel.textContent =
        "About";


    const description =
        document.createElement(
            "p"
        );


    description.textContent =
        school.description;


    descriptionCell.appendChild(
        descriptionLabel
    );


    descriptionCell.appendChild(
        description
    );


    /* =====================================
       BUILD CARD
       ===================================== */

    card.appendChild(
        header
    );


    card.appendChild(
        major
    );


    card.appendChild(
        details
    );


    card.appendChild(
        descriptionCell
    );


    container.appendChild(
        card
    );

}


/* =========================================
   EDUCATION DETAIL CELL
   ========================================= */

function createEducationDetailCell(
    label,
    value
) {

    const cell =
        document.createElement(
            "div"
        );


    cell.classList.add(
        "education-detail-cell"
    );


    const labelElement =
        document.createElement(
            "span"
        );


    labelElement.classList.add(
        "education-cell-label"
    );


    labelElement.textContent =
        label;


    const valueElement =
        document.createElement(
            "strong"
        );


    valueElement.textContent =
        value;


    cell.appendChild(
        labelElement
    );


    cell.appendChild(
        valueElement
    );


    return cell;

}


/* =========================================
   STATUS CONFIGURATION
   ========================================= */

const certificationStatusConfig = {

    active: {
        label:
            "Active"
    },

    "in-progress": {
        label:
            "In Progress"
    },

    "awaiting-recertification": {
        label:
            "Awaiting Recertification"
    },

    expired: {
        label:
            "Expired"
    }

};


/* =========================================
   BUILD CERTIFICATIONS
   ========================================= */

function buildCertifications() {

    const container =
        document.getElementById(
            "certificationGrid"
        );


    if (!container) {

        console.warn(
            "Certification grid not found."
        );

        return;

    }


    container.innerHTML = "";


    certifications.forEach(
        certification => {

            container.appendChild(
                createCertificationCard(
                    certification
                )
            );

        }
    );

}


/* =========================================
   CREATE CERTIFICATION CARD
   ========================================= */

function createCertificationCard(
    certification
) {

    const card =
        document.createElement(
            "article"
        );


    card.classList.add(
        "certification-card"
    );


    /* =====================================
       TOP
       ===================================== */

    const top =
        document.createElement(
            "div"
        );


    top.classList.add(
        "certification-card-top"
    );


    /* =====================================
       ICON
       ===================================== */

    const iconWrapper =
        document.createElement(
            "div"
        );


    iconWrapper.classList.add(
        "certification-icon"
    );


    const fallback =
        document.createElement(
            "span"
        );


    fallback.classList.add(
        "certification-icon-fallback"
    );


    fallback.textContent =
        certification.iconFallback;


    const image =
        document.createElement(
            "img"
        );


    image.src =
        certification.icon;


    image.alt =
        `${certification.title} certification icon`;


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


    iconWrapper.appendChild(
        fallback
    );


    iconWrapper.appendChild(
        image
    );


    /* =====================================
       STATUS
       ===================================== */

    const statusConfig =
        certificationStatusConfig[
            certification.status
        ];


    const status =
        document.createElement(
            "span"
        );


    status.classList.add(
        "certification-status",
        `certification-status-${certification.status}`
    );


    status.textContent =
        statusConfig
            ? statusConfig.label
            : certification.status;


    top.appendChild(
        iconWrapper
    );


    top.appendChild(
        status
    );


    /* =====================================
       TITLE
       ===================================== */

    const title =
        document.createElement(
            "h2"
        );


    title.textContent =
        certification.title;


    /* =====================================
       DATE INFORMATION
       ===================================== */

    const dates =
        document.createElement(
            "div"
        );


    dates.classList.add(
        "certification-dates"
    );


    const certifiedDate =
        createCertificationDate(
            "Certified",
            certification.certificationDate,
            certification.status === "in-progress"
                ? "In Progress"
                : "Not Added"
        );


    const expirationDate =
        createCertificationDate(
            "Expires",
            certification.expirationDate,
            certification.status === "in-progress"
                ? "—"
                : "Not Added"
        );


    dates.appendChild(
        certifiedDate
    );


    dates.appendChild(
        expirationDate
    );


    /* =====================================
       DESCRIPTION
       ===================================== */

    const description =
        document.createElement(
            "p"
        );


    description.classList.add(
        "certification-description"
    );


    description.textContent =
        certification.description;


    /* =====================================
       BUILD CARD
       ===================================== */

    card.appendChild(
        top
    );


    card.appendChild(
        title
    );


    card.appendChild(
        dates
    );


    card.appendChild(
        description
    );


    return card;

}


/* =========================================
   CREATE DATE FIELD
   ========================================= */

function createCertificationDate(
    label,
    value,
    fallback
) {

    const item =
        document.createElement(
            "div"
        );


    item.classList.add(
        "certification-date-item"
    );


    const labelElement =
        document.createElement(
            "span"
        );


    labelElement.classList.add(
        "certification-date-label"
    );


    labelElement.textContent =
        label;


    const valueElement =
        document.createElement(
            "strong"
        );


    valueElement.textContent =
        value || fallback;


    item.appendChild(
        labelElement
    );


    item.appendChild(
        valueElement
    );


    return item;

}