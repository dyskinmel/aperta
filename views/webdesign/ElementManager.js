//Event Listeners
// import { addKeydownEventListeners } from "./ElementEventListeners.js";
import { addHoverEventListeners } from "./ElementEventListeners.js";
import { addClickEventListeners } from "./ElementEventListeners.js";
import { addDblClickEventListeners } from "./ElementEventListeners.js";
import { addDragAndDropEventListeners } from "./ElementEventListeners.js";
//
import { adjustBodyHeight } from "./utils.js";
//
import { isPhrasingContentTags } from "./HtmlCategories.js";
import { CanvasWrapper } from "./utils.js";

/* 
    *  Factory function to create an element manager from htag
*/

// factory function to create an element
export function elementManagerFactory(htag) {
    // console.log(elm + " " + elm.tagName);
    // return new Element();
    switch (htag) {
        case "BODY":
            // console.log("body" + htag)
            return new BodyElementManager();
        case "H1":
        case "H2":
        case "H3":
        case "H4":
        case "H5":
        case "H6":
            // console.log("heading" + htag);
            return new HeadingElementManager();
        case "IMG":
            return new ImgElementManager();
        // add more cases here
        default: return new ElementManager();
    }
}

/* 
    * Base class for HTML elements
*/

class ElementManager {
    addElementToCanvas(htag, textContent) {
        // Add the element to the canvas
        const canvasWrapper = new CanvasWrapper();
        const selectedElm = canvasWrapper.getSelectedElement();

        // return if no element is selected
        if (canvasWrapper.isSelectedElementNull()) {
            return;
        }

        this.elm = this.createElement(htag);

        // set default attributes to a new element
        this.setDefaultAttributes(this.elm, textContent);

        // Add event listeners to a new element
        this.addListenerToElement(this.elm);

        // Add element to canvas
        this.addElmToSelectedElm(this.elm, selectedElm);
    }

    // create a new element
    // override this method in child classes to create component consists of multiple elements
    createElement(htag) {
        const elm = document.createElement(htag);
        return elm;
    }

    // set default attributes to a new element
    // override this method in child classes if needed
    setDefaultAttributes(elm, textContent) {
        // Add default attributes
        elm.textContent = textContent;
        elm.setAttribute("draggable", "true");
        elm.setAttribute("data-aperta-uuid", crypto.randomUUID());

        //following styles are for development purposes delete later 
        elm.style.height = "auto";
        elm.style.width = "auto";
        elm.classList.add("aperta-element");

    }

    // default event listeners add to an element
    // override this method in child classes if needed
    addListenerToElement(elm) {
        addHoverEventListeners(elm);
        addClickEventListeners(elm);
        addDblClickEventListeners(elm);
        addDragAndDropEventListeners(elm);
    }

    // add element to/after the selected element
    addElmToSelectedElm(elm, selectedElm) {
        if (selectedElm.tagName === "BODY") {
            // Add element to selected element
            selectedElm.appendChild(elm);
        } else {
            // Add element after selected element
            selectedElm.after(elm);
        }
        adjustBodyHeight();
    }

    // check if the element can be a parent of the child element
    // override this method in child classes 
    // refer https://html.spec.whatwg.org/multipage/semantics.html#semantics for specifcations
    // use methods in HtmlCategories.js to check child elements belongs to which category
    // also add conditions for exceptional cases if needed
    // return true if the element can be a parent of the child element
    canBeParentOf(child) {

        return true;
    }

    getEnabledCssProperties() {
        const enabledCssProperties = {
            "width": true,
            "height": true,
            "min-width": true,
            "min-height": true,
            "max-width": true,
            "max-height": true,
        }
        return enabledCssProperties;
    }


}

/*
    * Child classes for individual HTML elements (Categorize if possible)
*/

// Body element
//

class BodyElementManager extends ElementManager {
    addListenerToElement(elm) {
        // addKeydownEventListeners(elm);
        addHoverEventListeners(elm);
        addClickEventListeners(elm);
        addDragAndDropEventListeners(elm);
    }
}

// Image element
//

class ImgElementManager extends ElementManager {
    setDefaultAttributes(elm, textContent) {
        // Create an element
        // console.log(elm);
        elm.src = "../../img/imgPH.jpeg";
        elm.alt = textContent + ": placeholder";
        // elm.classList.add("canvasItem");
        elm.setAttribute("draggable", "true");
        elm.setAttribute("data-aperta-uuid", crypto.randomUUID());
    }
}

// Heading element
//

class HeadingElementManager extends ElementManager {
    canBeParentOf(child) {
        return isPhrasingContentTags(child);
    }
}
