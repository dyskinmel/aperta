//Event Listeners
import { addKeydownEventListeners } from "./EventListenerHandler.js";
import { addHoverEventListeners } from "./EventListenerHandler.js";
import { addClickEventListeners } from "./EventListenerHandler.js";
import { addDblClickEventListeners } from "./EventListenerHandler.js";
import { addDragAndDropEventListeners } from "./EventListenerHandler.js";
//
import { isPhrasingContentTags } from "./HtmlCategories.js";

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
        default: return new Element();
    }
}

class Element {
    addElementToCanvas(elm, textContent) {
        // Add the element to the canvas
        const canvas = document.getElementById("canvas");

        const canvasWindow = canvas.contentWindow;
        const canvasDocument = canvasWindow.document;
        const selectedElement = canvasDocument.getElementsByClassName("selected")[0];

        // return if no element is selected
        if (selectedElement === undefined) {
            return;
        }

        // migrated to setDefaultAttributes mothod
        // // Create an element
        // // console.log(elm);
        // elm.textContent = textContent;
        // // elm.classList.add("canvasItem");
        // elm.setAttribute("draggable", "true");
        // elm.setAttribute("data-uuid", crypto.randomUUID());
        this.setDefaultAttributes(elm, textContent);

        // Add listener to element
        this.addListenerToElement(elm);

        // Add element to canvas
        //addElementToSelectedElement(elm, selectedElement);
        selectedElement.appendChild(elm);
    }

    setDefaultAttributes(elm, textContent) {
        // Add default attributes
        elm.textContent = textContent;
        elm.setAttribute("draggable", "true");
        elm.setAttribute("data-uuid", crypto.randomUUID());
    }

    addListenerToElement(elm) {
        addHoverEventListeners(elm);
        addClickEventListeners(elm);
        addDblClickEventListeners(elm);
        addDragAndDropEventListeners(elm);
    }

    addEleemntToSelectedElement(elm, selectedElement) {
        if (selectedElement.tagName === "BODY") {
            // Add element to selected element
            selectedElement.appendChild(elm);
        } else {
            // Add element to selected element
            selectedElement.after(elm);
        }
    }

    canBeParentOf(child) {
        return true;
    }
}

class BodyElement extends Element {


    addListenerToElement(elm) {
        // addKeydownEventListeners(elm);
        addHoverEventListeners(elm);
        addClickEventListeners(elm);
        addDragAndDropEventListeners(elm);
    }



}

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

class HeadingElement extends Element {
    canBeParentOf(child) {
        return isPhrasingContentTags(child);
    }

}