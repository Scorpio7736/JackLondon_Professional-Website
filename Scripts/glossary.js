/* Shared technical term definitions across the portfolio. */
const portfolioGlossary = Object.freeze({
    "FHIR API": {
        title: "FHIR API",
        definition: "Fast Healthcare Interoperability Resources (FHIR) is an HL7 standard for exchanging healthcare information. A FHIR API lets applications request and share that information using standardized web interfaces."
    },
    "Papercut Avengers": {
        title: "Papercut Avengers",
        definition: "An internal Sun Life DentaQuest team focused on reducing repetitive work through automation, improving existing tools and applications, and making complex workflows more efficient so employees can focus on higher-value tasks."
    },
    "Utilization Management": {
        title: "Utilization Management (UM)",
        definition: "A healthcare process for reviewing whether services meet clinical and coverage requirements, including medical necessity and prior authorization."
    },
    "Provider Directory Explorer": {
        title: "Provider Directory Explorer",
        definition: "An internal FHIR tool used by QA testers to browse, search, and look up provider-related healthcare resources. I helped refactor its interface and add more targeted search capabilities."
    },
    "Agentic Workflows": {
        title: "Agentic Workflows",
        definition: "Processes where AI agents plan, coordinate, and carry out multi-step tasks using tools, with appropriate permissions and human oversight."
    },
    "MCP": {
        title: "MCP — Master Control Program",
        definition: "Grid.AI's coordinating agent. MCP organizes requests, delegates tasks to specialized agents, and routes proposed actions through review and approval."
    },
    "Multi-Agent Orchestration": {
        title: "Multi-Agent Orchestration",
        definition: "Coordinating multiple specialized AI agents so they can share the work of planning, handling, and verifying more complex tasks."
    },
    "AST": {
        title: "Abstract Syntax Tree (AST)",
        definition: "A tree-shaped representation of source code structure used by parsers, interpreters, and compilers."
    },
    "Lexer": {
        title: "Lexer",
        definition: "A component that turns raw source code into tokens, such as identifiers, keywords, and operators, before parsing."
    },
    "Parser": {
        title: "Parser",
        definition: "A component that checks token structure against grammar rules and builds a representation of the program."
    },
    "top-rope belay": {
        title: "Top-rope Belay",
        definition: "A climbing safety technique in which a belayer manages a rope running through an anchor above the climber to protect against falls."
    },
    "WPF": {
        title: "Windows Presentation Foundation (WPF)",
        definition: "A Microsoft .NET framework for creating graphical Windows desktop applications."
    },
    "XAML": {
        title: "Extensible Application Markup Language (XAML)",
        definition: "A declarative markup language used to describe user interfaces in frameworks such as WPF."
    }
});

let activePortfolioGlossary = null;

function closePortfolioGlossary() {
    if (!activePortfolioGlossary) return;
    const { trigger, tooltip } = activePortfolioGlossary;
    trigger.setAttribute("aria-expanded", "false");
    trigger.removeAttribute("aria-describedby");
    tooltip.remove();
    activePortfolioGlossary = null;
}

function openPortfolioGlossary(trigger, entry) {
    if (activePortfolioGlossary?.trigger === trigger) return;
    closePortfolioGlossary();

    const tooltip = document.createElement("div");
    tooltip.className = "portfolio-glossary-tooltip";
    tooltip.id = "portfolio-glossary-tooltip";
    tooltip.setAttribute("role", "tooltip");

    const heading = document.createElement("strong");
    heading.textContent = entry.title;
    const body = document.createElement("span");
    body.textContent = entry.definition;
    tooltip.append(heading, body);
    document.body.appendChild(tooltip);

    trigger.setAttribute("aria-expanded", "true");
    trigger.setAttribute("aria-describedby", tooltip.id);
    activePortfolioGlossary = { trigger, tooltip };

    const rect = trigger.getBoundingClientRect();
    const space = 12;
    const width = tooltip.offsetWidth;
    const height = tooltip.offsetHeight;
    const x = Math.max(space, Math.min(rect.left + rect.width / 2 - width / 2, window.innerWidth - width - space));
    const y = rect.top >= height + space + 8 ? rect.top - height - 8 : Math.max(space, Math.min(rect.bottom + 8, window.innerHeight - height - space));
    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
}

function appendGlossaryText(container, sourceText, termNames = []) {
    if (typeof sourceText !== "string" || !termNames.length) {
        container.textContent = sourceText ?? "";
        return;
    }

    // Longest terms first, so related names do not match inside one another.
    const terms = termNames.filter(term => portfolioGlossary[term]).sort((a, b) => b.length - a.length);
    let position = 0;
    while (position < sourceText.length) {
        let bestIndex = sourceText.length;
        let match = null;
        for (const term of terms) {
            let index = sourceText.indexOf(term, position);
            while (index >= 0) {
                const before = index === 0 ? "" : sourceText[index - 1];
                const after = index + term.length === sourceText.length ? "" : sourceText[index + term.length];
                const wordCharacter = /[\w]/;
                if ((!before || !wordCharacter.test(before)) && (!after || !wordCharacter.test(after))) break;
                index = sourceText.indexOf(term, index + 1);
            }
            if (index >= 0 && (index < bestIndex || (index === bestIndex && (!match || term.length > match.length)))) {
                bestIndex = index;
                match = term;
            }
        }

        if (!match) {
            container.appendChild(document.createTextNode(sourceText.slice(position)));
            break;
        }
        if (bestIndex > position) {
            container.appendChild(document.createTextNode(sourceText.slice(position, bestIndex)));
        }

        const trigger = document.createElement("button");
        trigger.type = "button";
        trigger.className = "portfolio-glossary-trigger";
        trigger.textContent = match;
        trigger.setAttribute("aria-label", match + ": show definition");
        trigger.setAttribute("aria-expanded", "false");
        trigger.setAttribute("aria-haspopup", "true");

        const definition = portfolioGlossary[match];
        trigger.addEventListener("mouseenter", () => openPortfolioGlossary(trigger, definition));
        trigger.addEventListener("mouseleave", () => {
            if (document.activeElement !== trigger) closePortfolioGlossary();
        });
        trigger.addEventListener("focus", () => openPortfolioGlossary(trigger, definition));
        trigger.addEventListener("blur", () => closePortfolioGlossary());
        trigger.addEventListener("click", () => openPortfolioGlossary(trigger, definition));
        container.appendChild(trigger);
        position = bestIndex + match.length;
    }
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closePortfolioGlossary();
});
document.addEventListener("pointerdown", event => {
    if (activePortfolioGlossary &&
        !activePortfolioGlossary.trigger.contains(event.target) &&
        !activePortfolioGlossary.tooltip.contains(event.target)) {
        closePortfolioGlossary();
    }
});
window.addEventListener("scroll", closePortfolioGlossary, true);
window.addEventListener("resize", closePortfolioGlossary);
