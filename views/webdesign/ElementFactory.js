import { addKeydownEventListeners } from "./EventListenerHandler.js";
import { addHoverEventListeners } from "./EventListenerHandler.js";
import { addClickEventListeners } from "./EventListenerHandler.js";
import { addDblClickEventListeners } from "./EventListenerHandler.js";
import { addDragAndDropEventListeners } from "./EventListenerHandler.js";






// factory function to create an element
export function createElementManager(elm) {
    console.log(elm + " " + elm.tagName);
    // return new Element();
    switch (elm.tagName) {
        case "BODY":
            return new BodyElement();
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

        // Create the element

        console.log(elm);
        elm.textContent = textContent;
        elm.classList.add("canvasItem");
        elm.setAttribute("draggable", "true");
        elm.setAttribute("data-uuid", crypto.randomUUID());



        // Add listener to element
        this.addListenerToElement(elm);

        // Add element to canvas
        selectedElement.appendChild(elm);
    }

    addListenerToElement(elm) {
        addHoverEventListeners(elm);
        addClickEventListeners(elm);
        addDblClickEventListeners(elm);
        addDragAndDropEventListeners(elm);
    }
}

class BodyElement extends Element {
    constructor() {
        super();
    }

    addListenerToElement(elm) {
        // addKeydownEventListeners(elm);
        addHoverEventListeners(elm);
        addClickEventListeners(elm);
    }



}