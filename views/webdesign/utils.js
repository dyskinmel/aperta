


//
// hovered elements related functions
//

// add caption and outline to hovered element
export function addCaptionToHoveredElm(elm) {
    // delete old hovered element before creating a new one
    delCaptionFromHoveredElm(elm);

    // get position of hovered element
    const rect = elm.getBoundingClientRect();

    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const absoluteRectTop = rect.top + canvasWindow.scrollY;
    const absoluteRectBottom = rect.bottom + canvasWindow.scrollY;
    const absoluteRectLeft = rect.left + canvasWindow.scrollX;
    const absoluteRectRight = rect.right + canvasWindow.scrollX;

    // create a label to show tagName
    let hoverCaption = document.createElement("div");
    hoverCaption.textContent = elm.tagName;
    hoverCaption.id = "hoverCaption";
    hoverCaption.style.left = absoluteRectLeft + "px";
    // new_elm.style.position = "absolute";
    // new_elm.style.color = "#1bbcf1";
    // new_elm.style.fontSize = "10px";
    // new_elm.style.fontWeight = "normal";

    // set position of hovered element
    if (elm.tagName === "BODY") {
        hoverCaption.style.top = absoluteRectTop + "px";
    } else if (rect.top < 50) {
        hoverCaption.style.top = absoluteRectBottom + 3 + "px";
    } else {
        hoverCaption.style.top = absoluteRectTop - 16 + "px";
    }

    elm.ownerDocument.body.after(hoverCaption);

    // add outline to hovered element
    const hoverOutline = document.createElement("div");
    hoverOutline.id = "hoverOutline";
    hoverOutline.style.left = absoluteRectLeft + "px";
    hoverOutline.style.top = absoluteRectTop + "px";
    hoverOutline.style.width = absoluteRectRight - absoluteRectLeft + "px";
    hoverOutline.style.height = absoluteRectBottom - absoluteRectTop + "px";

    hoverCaption.after(hoverOutline);

    // console.log("Hovered");
}

// delete caption and outline from hovered element
//
export function delCaptionFromHoveredElm(elm) {
    // don't proceed to delete if there is no hovered element
    if (elm === null) {
        return;
    }

    const hoverCaption = elm.ownerDocument.getElementById("hoverCaption");
    const hoverOutline = elm.ownerDocument.getElementById("hoverOutline");

    if (hoverCaption !== null && hoverOutline !== null) {
        hoverCaption.remove();
        hoverOutline.remove();
    }
}


//
//　selected elements related functions 
//

// change state of selected elements
//
export function selectElm(elm) {
    const canvasWrapper = new CanvasWrapper();
    const selectedElm = canvasWrapper.getSelectedElement();

    console.log("selectedElm: " + selectedElm);

    // const selectedElement = elm.ownerDocument.getElementById("selectedElm");
    // const selectedElement = elm.ownerDocument.querySelectorAll('[data-aperta-selected-element="true"]')[0];

    if (selectedElm !== undefined) {
        //remove selectedElement id from previously selected element
        // selectedElm.removeAttribute("id");
        selectedElm.removeAttribute(canvasWrapper.getSelectedElementAttributeName());
    }

    // elm.id = "selectedElm";
    elm.setAttribute(canvasWrapper.getSelectedElementAttributeName(), "true");
}

// add caption to selected element
//
export function addCaptionToSelectedElm(elm) {
    // delete old label and menu before creating a new one
    let selectCaption = elm.ownerDocument.getElementById("selectCaption");
    let selectOutline = elm.ownerDocument.getElementById("selectOutline");

    if (selectCaption !== null && selectOutline !== null) {
        selectCaption.remove();
        selectOutline.remove();
    }

    // get position of hovered element
    const rect = elm.getBoundingClientRect();

    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const absoluteRectTop = rect.top + canvasWindow.scrollY;
    const absoluteRectBottom = rect.bottom + canvasWindow.scrollY;
    const absoluteRectLeft = rect.left + canvasWindow.scrollX;
    const absoluteRectRight = rect.right + canvasWindow.scrollX;

    // create a new label and menu element
    selectCaption = document.createElement("div");
    selectCaption.textContent = elm.tagName;
    selectCaption.id = "selectCaption";
    selectCaption.style.left = absoluteRectLeft - 1 + "px";
    // new_elm.style.position = "absolute";
    // new_elm.style.color = "#1bbcf1";
    // new_elm.style.fontSize = "10px";
    // new_elm.style.fontWeight = "normal";

    // set position of hovered element
    if (elm.tagName === "BODY") {
        selectCaption.style.top = absoluteRectTop + "px";
    } else if (rect.top < 50) {
        selectCaption.style.top = absoluteRectBottom + 3 + "px";
    } else {
        selectCaption.style.top = absoluteRectTop - 16 + "px";
    }

    elm.ownerDocument.body.after(selectCaption);

    // add Outline to selected element
    selectOutline = document.createElement("div");
    selectOutline.id = "selectOutline";
    selectOutline.style.left = absoluteRectLeft + "px";
    selectOutline.style.top = absoluteRectTop + "px";
    selectOutline.style.width = absoluteRectRight - absoluteRectLeft + "px";
    selectOutline.style.height = absoluteRectBottom - absoluteRectTop + "px";

    selectCaption.after(selectOutline);

}

//
//
//

export class CanvasWrapper {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.canvasWindow = this.canvas.contentWindow;
        this.canvasDocument = this.canvasWindow.document;
        // this.selectedElement = this.canvasDocument.getElementById("selectedElm");
        this.selectedElement = this.canvasDocument.querySelectorAll('[data-aperta-selected-element="true"]')[0];
    }

    getCanvas() {
        return this.canvas;
    }

    getCanvasWindow() {
        return this.canvasWindow;
    }

    getCanvasDocument() {
        return this.canvasDocument;
    }

    getSelectedElement() {
        return this.selectedElement;
    }
    getSelectedElementAttributeName() {
        // return "selectedElm";
        return "data-aperta-selected-element";
    }
    isSelectedElement(elm) {
        // return elm.id === "selectedElm";
        return elm === this.selectedElement;
    }
}


//
//
//

export function adjustBodyHeight() {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasWindowHeight = canvasWindow.innerHeight;
    const canvasBody = canvasWindow.document.body;
    const lastElmInBody = canvasBody.lastElementChild;
    const absoluteRectBottom = lastElmInBody.getBoundingClientRect().bottom + canvasWindow.scrollY;

    // console.log("lastElmY: ", lastElmY);

    if (absoluteRectBottom < canvasWindowHeight) {
        canvasBody.style.height = `${canvasWindowHeight}px`;
    } else {
        canvasBody.style.height = absoluteRectBottom + 'px';
        // canvasBody.style.height = 'auto';
    }
}



