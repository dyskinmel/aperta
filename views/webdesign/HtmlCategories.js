// made based on
// https://html.spec.whatwg.org/multipage/dom.html#content-models
// based on 6 April 2023 version


export function isMetadataContentTags(elm) {
    const array = [
        "BASE",
        "LINK",
        "META",
        "NOSCRIPT",
        "SCRIPT",
        "STYLE",
        "TEMPLATE",
        "TITLE"
    ]
    if (array.includes(elm.tagName)) {
        return true;
    } else {
        return false;
    }
}

export function isFlowContentTags(elm) {
    const array = [
        "A",
        "ABBR",
        "ADDRESS",
        "ARTICLE",
        "ASIDE",
        "AUDIO",
        "B",
        "BDI",
        "BDO",
        "BLOCKQUOTE",
        "BR",
        "BUTTON",
        "CANVAS",
        "CITE",
        "CODE",
        "DATA",
        "DATALIST",
        "DEL",
        "DETAILS",
        "DFN",
        "DIALOG",
        "DIV",
        "DL",
        "EM",
        "EMBED",
        "FIELDSET",
        "FIGURE",
        "FOOTER",
        "FORM",
        "H1",
        "H2",
        "H3",
        "H4",
        "H5",
        "H6",
        "HEADER",
        "HGROUP",
        "HR",
        "I",
        "IFRAME",
        "IMG",
        "INPUT",
        "INS",
        "KBD",
        "LABEL",
        "LINK", //if it is allowed in the body element (if document is HTML5)
        "MAP",
        "MARK",
        "MATH",
        "MENU",
        "METER",
        "NAV",
        "NOSCRIPT",
        "OBJECT",
        "OL",
        "OUTPUT",
        "P",
        "PICTURE",
        "PRE",
        "PROGRESS",
        "Q",
        "RUBY",
        "S",
        "SAMP",
        "SCRIPT",
        "SEARCH",
        "SECTION",
        "SELECT",
        "SLOT",
        "SMALL",
        "SPAN",
        "STRONG",
        "SUB",
        "SUP",
        "SVG",
        "TABLE",
        "TEMPLATE",
        "TEXTAREA",
        "TIME",
        "U",
        "UL",
        "VAR",
        "VIDEO",
        "WBR",
        "TEXT"
    ]
    if (array.includes(elm.tagName)) {
        return true;
    }

    // check if conditional elements falls in to this category
    switch (elm.tagName) {
        case "AREA": {
            //if it is a descendant of a map element
            if (elm.closest("map") !== null) {
                return true;
            } else {
                return false;
            }
        }
        case "MAIN": {
            //if it is a hierarchically corrent main element
            const ancestors = ["DIV", "FORM", "BODY", "HTML", "CUSTOM-ELEMENT"];
            let parent = elm.parentElement;

            while (parent !== null) {
                if (ancestors.includes(parent.tagName)) {
                    return true;
                }
                parent = parent.parentElement;
            }
            return false;
        }
        case "META": {
            //if the itemprop attirbute is present
            if (elm.hasAttribute("itemprop")) {
                return true;
            } else {
                return false;
            }
        }
        default: return false;
    }
}

export function isSectioningContentTags(elm) {
    const array = [
        "ARTICLE",
        "ASIDE",
        "NAV",
        "SECTION"
    ]
    if (array.includes(elm.tagName)) {
        return true;
    } else {
        return false;
    }
}

export function isHeadingContentTags(elm) {
    const array = [
        "H1",
        "H2",
        "H3",
        "H4",
        "H5",
        "H6"
    ]
    if (array.includes(elm.tagName)) {
        return true;
    }
    if (elm.tagName === "HGROUP") {
        if (elm.querySelector("h1, h2, h3, h4, h5, h6") !== null) {
            return true;
        } else {
            return false;
        }
    }

}

export function isPhrasingContentTags(elm) {
    const array = [
        "A",
        "ABBR",
        "AUDIO",
        "B",
        "BDI",
        "BDO",
        "BR",
        "BUTTON",
        "CANVAS",
        "CITE",
        "CODE",
        "DATA",
        "DATALIST",
        "DEL",
        "DFN",
        "EM",
        "EMBED",
        "I",
        "IFRAME",
        "IMG",
        "INPUT",
        "INS",
        "KBD",
        "LABEL",
        "LINK", //if it is allowed in the body element
        "MAP",
        "MARK",
        "MATH",
        "METER",
        "NOSCRIPT",
        "OBJECT",
        "OUTPUT",
        "PICTURE",
        "PROGRESS",
        "Q",
        "RUBY",
        "S",
        "SAMP",
        "SCRIPT",
        "SELECT",
        "SLOT",
        "SMALL",
        "SPAN",
        "STRONG",
        "SUB",
        "SUP",
        "SVG",
        "TEMPLATE",
        "TEXTAREA",
        "TIME",
        "U",
        "VAR",
        "VIDEO",
        "WBR",
        "TEXT"
    ]
    if (array.includes(elm.tagName)) {
        return true;
    }
    // check if conditional elements falls in to this category
    switch (elm.tagName) {
        case "AREA": {
            //if it is a descendant of a map element
            if (elm.closest("map") !== null) {
                return true;
            } else {
                return false;
            }
        }
        case "META": {
            //if the itemprop attirbute is present
            if (elm.hasAttribute("itemprop")) {
                return true;
            } else {
                return false;
            }
        }
        default: return false;
    }
}

export function isEmbeddedContentTags(elm) {
    const array = [
        "AUDIO",
        "CANVAS",
        "EMBED",
        "IFRAME",
        "IMG",
        "MATH",
        "OBJECT",
        "PICTURE",
        "SVG",
        "VIDEO"
    ]
    if (array.includes(elm.tagName)) {
        return true;
    } else {
        return false;
    }
}

export function isInteractiveContentTags(elm) {
    const array = [
        "BUTTON",
        "DETAILS",
        "EMBED",
        "IFRAME",
        "LABEL",
        "SELECT",
        "TEXTAREA",
    ]
    if (array.includes(elm.tagName)) {
        return true;
    }
    // check if conditional elements falls in to this category
    switch (elm.tagName) {
        case "A": {
            //if it has an href attribute
            if (elm.hasAttribute("href")) {
                return true;
            } else {
                return false;
            }
        }
        case "AUDIO": {
            //if it has a controls attribute
            if (elm.hasAttribute("controls")) {
                return true;
            } else {
                return false;
            }
        }
        case "IMG": {
            //if it has a usemap attribute
            if (elm.hasAttribute("usemap")) {
                return true;
            } else {
                return false;
            }
        }
        case "INPUT": {
            //if the type attribute is not in the Hidden state
            if (elm.getAttribute("type") !== "hidden") {
                return true;
            } else {
                return false;
            }
        }
        case "VIDEO": {
            //if it has a controls attribute
            if (elm.hasAttribute("controls")) {
                return true;
            } else {
                return false;
            }
        }
        default: return false;
    }
}

export function isPalpableContentTags(elm) {
    const array = [
        "A",
        "ABBR",
        "ADDRESS",
        "ARTICLE",
        "ASIDE",
        "AUDIO", //if it has a controls attribute
        "B",
        "BDI",
        "BDO",
        "BLOCKQUOTE",
        "BUTTON",
        "CANVAS",
        "CITE",
        "CODE",
        "DATA",
        "DEL",
        "DETAILS",
        "DFN",
        "DIV",
        "DL", //if the element's children include at least one name-value group
        "EM",
        "EMBED",
        "FIELDSET",
        "FIGURE",
        "FOOTER",
        "FORM",
        "H1",
        "H2",
        "H3",
        "H4",
        "H5",
        "H6",
        "HEADER",
        "HGROUP",
        "I",
        "IFRAME",
        "IMG",
        "INPUT",//if the element's type attribute is not in the Hidden state
        "INS",
        "KBD",
        "LABEL",
        "MAIN",
        "MAP",
        "MARK",
        "MATH",
        "MENU", //if the element's children include at least one li element
        "METER",
        "NAV",
        "OBJECT",
        "OL",//if the element's children include at least one li element
        "OUTPUT",
        "P",
        "PICTURE",
        "PRE",
        "PROGRESS",
        "Q",
        "RUBY",
        "S",
        "SAMP",
        "SEARCH",
        "SECTION",
        "SELECT",
        "SMALL",
        "SPAN",
        "STRONG",
        "SUB",
        "SUP",
        "SVG",
        "TABLE",
        "TEXTAREA",
        "TIME",
        "U",
        "UL", //if the element's children include at least one li element
        "VAR",
        "VIDEO", //if it has a controls attribute
    ]
    if (array.includes(elm.tagName)) {
        return true;
    }
    // check if conditional elements falls in to this category
    switch (elm.tagName) {
        case "AUDIO": {
            //if it has a controls attribute
            if (elm.hasAttribute("controls")) {
                return true;
            } else {
                return false;
            }
        }
        case "DL": {
            //if the element's children include at least one name-value group
            if (elm.querySelector("dt") !== null) {
                return true;
            }
            if (elm.querySelector("dd") !== null) {
                return true;
            } else {
                return false;
            }
        }
        case "INPUT": {
            //if the element's type attribute is not in the Hidden state
            if (elm.getAttribute("type") !== "hidden") {
                return true;
            } else {
                return false;
            }
        }
        case "MENU": {
            //if the element's children include at least one li element
            if (elm.querySelector("li") !== null) {
                return true;
            } else {
                return false;
            }
        }
        case "OL": {
            //if the element's children include at least one li element
            if (elm.querySelector("li") !== null) {
                return true;
            } else {
                return false;
            }
        }
        case "UL": {
            //if the element's children include at least one li element
            if (elm.querySelector("li") !== null) {
                return true;
            } else {
                return false;
            }
        }
        case "VIDEO": {
            //if it has a controls attribute
            if (elm.hasAttribute("controls")) {
                return true;
            } else {
                return false;
            }
        }
        default: return false;
    }

}
