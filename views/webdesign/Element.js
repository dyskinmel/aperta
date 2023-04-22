//Event Listeners
import { addKeydownEventListeners } from "./ElementEventListeners.js";
import { addHoverEventListeners } from "./ElementEventListeners.js";
import { addClickEventListeners } from "./ElementEventListeners.js";
import { addDblClickEventListeners } from "./ElementEventListeners.js";
import { addDragAndDropEventListeners } from "./ElementEventListeners.js";
import { adjustBodyHeight } from "./CanvasManager.js";
//
import { isPhrasingContentTags } from "./HtmlCategories.js";

//
// Factory function to create an element
//

// factory function to create an element
export function createElementManager(elm) {
    // console.log(elm + " " + elm.tagName);
    // return new Element();
    switch (elm.tagName) {
        case "BODY":
            return new BodyElement();
        case "H1":
        case "H2":
        case "H3":
        case "H4":
        case "H5":
        case "H6":
            return new HeadingElement();
        case "IMG":
            return new ImgElement();
        // add more cases here
        default: return new Element();
    }
}

//
// Base class for all elements
//

class Element {
    addElementToCanvas(elm, textContent) {
        // Add the element to the canvas
        const canvas = document.getElementById("canvas");

        const canvasWindow = canvas.contentWindow;
        const canvasDocument = canvasWindow.document;
        const selectedElement = canvasDocument.getElementById("selectedElm");

        // return if no element is selected
        if (selectedElement === null) {
            return;
        }

        // set default attributes to a new element
        this.setDefaultAttributes(elm, textContent);

        // Add event listeners to a new element
        this.addListenerToElement(elm);

        // Add element to canvas
        this.addElmToSelectedElm(elm, selectedElement);
    }

    // set default attributes to a new element
    // override this method in child classes if needed
    setDefaultAttributes(elm, textContent) {
        // Add default attributes
        elm.textContent = textContent;
        elm.setAttribute("draggable", "true");
        elm.setAttribute("data-uuid", crypto.randomUUID());
    }

    // default listeners to add to an element
    // override this method in child classes if needed
    addListenerToElement(elm) {
        addHoverEventListeners(elm);
        addClickEventListeners(elm);
        addDblClickEventListeners(elm);
        addDragAndDropEventListeners(elm);
    }

    // add element to/after the selected element
    addElmToSelectedElm(elm, selectedElement) {
        if (selectedElement.tagName === "BODY") {
            // Add element to selected element
            selectedElement.appendChild(elm);
        } else {
            // Add element after selected element
            selectedElement.after(elm);
        }
        adjustBodyHeight();
    }

    // check if the element can be a parent of the child element
    // override this method in child classes 
    // refer https://html.spec.whatwg.org/multipage/semantics.html#semantics for specifcations
    // use methods in HtmlCategories.js to check child elements belogs to which category
    // also add exceptional cases if needed
    // return true if the element can be a parent of the child element
    canBeParentOf(child) {

        return true;
    }
}

//
// Child classes for elements (Categorize if possible)
//

// Body element
//

class BodyElement extends Element {
    addListenerToElement(elm) {
        // addKeydownEventListeners(elm);
        addHoverEventListeners(elm);
        addClickEventListeners(elm);
        addDragAndDropEventListeners(elm);
    }
}

// Image element
//

class ImgElement extends Element {
    setDefaultAttributes(elm, textContent) {
        // Create an element
        // console.log(elm);
        elm.src = "../../img/imgPH.jpeg";
        elm.alt = textContent + ": placeholder";
        // elm.classList.add("canvasItem");
        elm.setAttribute("draggable", "true");
        elm.setAttribute("data-uuid", crypto.randomUUID());
    }
}

// Heading element
//

class HeadingElement extends Element {
    canBeParentOf(child) {
        return isPhrasingContentTags(child);
    }

}