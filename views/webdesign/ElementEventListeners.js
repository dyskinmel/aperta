import { elementManagerFactory } from "./ElementManager.js";
import { setCssValueToCssEditor } from "./CssEditorUtils.js";
import { adjustBodyHeight } from "./utils.js";
import { selectElm } from "./utils.js";
import { addCaptionToSelectedElm } from "./utils.js";
import { addCaptionToHoveredElm } from "./utils.js";
import { delCaptionFromHoveredElm } from "./utils.js";
import { CanvasWrapper } from "./utils.js";
// import { checkIfElementIsSelected } from "./RightSideMenuTabs.svelte";


// keydown event to delete selected eleemnt on canvas except for a body element
//

export function addKeydownEventListeners(elm) {
    elm.addEventListener('keydown', (event) => {
        // const canvas = document.getElementById("canvas");
        // const canvasWindow = canvas.contentWindow;
        // const canvasDocument = canvasWindow.document;
        // const selectedElement = canvasDocument.getElementById("selectedElm");


        const canvasWrapper = new CanvasWrapper();
        const selectedElm = canvasWrapper.getSelectedElement();

        //delete element when delete or backspace key is pressed
        if (event.keyCode === 46 || event.keyCode === 8) {
            //delete selected element except for a body element

            if (selectedElm.tagName !== "BODY" && selectedElm.hasAttribute("contenteditable") === false) {
                if (selectedElm.previousElementSibling !== null) {
                    selectElm(selectedElm.previousElementSibling);
                    addCaptionToSelectedElm(selectedElm.previousElementSibling);
                } else if (selectedElm.parentElement !== null) {
                    selectElm(selectedElm.parentElement);
                    addCaptionToSelectedElm(selectedElm.parentElement);
                }
                selectedElm.remove();
                adjustBodyHeight();
            }
        }
        //make contenteditable false when meta + enter key is pressed
        if (event.metaKey && event.key === "Enter") {
            //if contentedible is true, make it false

            if (selectedElm.tagName !== "BODY" && selectedElm.hasAttribute("contenteditable") === true) {
                selectedElm.removeAttribute("contenteditable");
                selectedElm.removeAttribute("spellcheck");
            }
        }

        if (event.key === "ArrowUp") {
            //change selected element to previous sibling element or parent element
            event.preventDefault();

            if (selectedElm.tagName === "BODY") return;

            if (selectedElm.previousElementSibling !== null) {
                selectElm(selectedElm.previousElementSibling);
                addCaptionToSelectedElm(selectedElm.previousElementSibling);
            } else if (selectedElm.parentElement !== null) {
                selectElm(selectedElm.parentElement);
                addCaptionToSelectedElm(selectedElm.parentElement);
            }
        }
        if (event.key === "ArrowDown") {
            //change selected element to next sibling element or first child element
            event.preventDefault();

            if (selectedElm.tagName == "BODY") {
                selectElm(selectedElm.firstElementChild);
                addCaptionToSelectedElm(selectedElm.firstElementChild);
                return;
            }

            if (selectedElm.nextElementSibling !== null) {
                selectElm(selectedElm.nextElementSibling);
                addCaptionToSelectedElm(selectedElm.nextElementSibling);
            } else if (selectedElm.firstElementChild !== null) {
                selectElm(selectedElm.firstElementChild);
            }
        }
        if (event.key === "ArrowLeft") {
        }
    }, true);
}

//
// Hover and related functions
//


//Hover activate: add hover class to hovered element to highlight
//

export function addHoverEventListeners(elm) {

    elm.addEventListener("mouseover", (event) => {
        event.preventDefault();
        const canvasWrapper = new CanvasWrapper();

        const ignoreId = ["marginLine", "paddingLine"];

        // return if the target element is selected
        // if (event.target.id === ("selectedElm") || ignoreId.includes(event.target.id)) {
        if (event.target.hasAttribute(canvasWrapper.getSelectedElementAttributeName()) || ignoreId.includes(event.target.id)) {

            return;
        }

        // add caption to hovered element
        addCaptionToHoveredElm(event.target);

        event.stopPropagation();
    }, false);

    //Hover deactivate: remove hover class to hovered element to highlight

    elm.addEventListener("mouseout", (event) => {
        event.preventDefault();

        // delete old hovered element before creating a new one
        delCaptionFromHoveredElm(event.target);

        event.stopPropagation();
    }, false);
}


//
// Click and related functions
//


//Click: add select class to clicked element to target other events
//

export function addClickEventListeners(elm) {

    elm.addEventListener("click", (event) => {

        const ignoreId = ["marginLine", "paddingLine"];

        // return if the target element id is included in ignoreId
        if (ignoreId.includes(event.target.id)) {
            return;
        }

        // delete contenteditable attribute from a current selected element
        const canvasDocument = elm.ownerDocument;

        let targetElements = canvasDocument.querySelector('[contenteditable="true"]');
        if (targetElements !== null) {
            if (elm.getAttribute('data-uuid') !== targetElements.getAttribute('data-uuid')) {
                targetElements.removeAttribute("contenteditable");
                targetElements.removeAttribute("spellcheck");
            }
        }

        //delete hover class from a current hovered element
        const hoverCaption = event.target.ownerDocument.getElementById("hoverCaption");
        delCaptionFromHoveredElm(hoverCaption);

        // set id to selected element
        selectElm(event.target);

        // migrate this function to each CssEditor component
        // set selected element's css value to css editor
        // setCssValueToCssEditor(elm);

        // updateCssEditor();

        // add caption to selected element
        addCaptionToSelectedElm(event.target);

        // addListenersToChangeSizeMarginPadding(canvasDocument, rect);


        event.stopPropagation();
    }, false);
}



// function updateCssEditor() {
//     checkIfElementIsSelected();
// }



function addListenersToChangeSizeMarginPadding() {
    // const canvas = document.getElementById("canvas");
    // const canvasWindow = canvas.contentWindow;
    // const canvasDocument = canvasWindow.document;
    const canvasWrapper = new CanvasWrapper();
    const canvasDocument = canvasWrapper.getCanvasDocument();

    const cursorIsOn = "notInArea";

    //track if the margin or padding has changed
    let marginChanged = true;
    let paddingChanged = true;

    canvasDocument.addEventListener("mousemove", function (event) {


        //get the selected element to get its position
        const selectedElm = canvasWrapper().getSelectedElm();
        //return if selected elm is body
        if (selectedElm.tagName === "BODY") {
            return;
        }

        const rect = selectedElm.getBoundingClientRect();
        const rectTop = Math.round(rect.top);
        const rectBottom = Math.round(rect.bottom);
        const rectLeft = Math.round(rect.left);
        const rectRight = Math.round(rect.right);

        const incrementIfZero = value => value === 0 ? 1 : value;

        //get the margin and padding of the selected element
        const marginTop = parseInt(window.getComputedStyle(selectedElm).marginTop);
        const marginRight = parseInt(window.getComputedStyle(selectedElm).marginRight);
        const marginBottom = parseInt(window.getComputedStyle(selectedElm).marginBottom);
        const marginLeft = parseInt(window.getComputedStyle(selectedElm).marginLeft);

        //if margin is 0, set it to 1 to show the line
        const marginLineTop = incrementIfZero(marginTop);
        const marginLineRight = incrementIfZero(marginRight);
        const marginLineBottom = incrementIfZero(marginBottom);
        const marginLineLeft = incrementIfZero(marginLeft);

        const paddingTop = parseInt(window.getComputedStyle(selectedElm).paddingTop);
        const paddingRight = parseInt(window.getComputedStyle(selectedElm).paddingRight);
        const paddingBottom = parseInt(window.getComputedStyle(selectedElm).paddingBottom);
        const paddingLeft = parseInt(window.getComputedStyle(selectedElm).paddingLeft);

        //if padding is 0, set it to 1 to show the line
        const paddingLineTop = incrementIfZero(paddingTop);
        const paddingLineRight = incrementIfZero(paddingRight);
        const paddingLineBottom = incrementIfZero(paddingBottom);
        const paddingLineLeft = incrementIfZero(paddingLeft);


        //only create new margin line if the margin has changed
        if (marginChanged === true) {
            //delete previous margin and padding line
            let marginLine = canvasDocument.getElementById("marginLine");
            if (marginLine !== null) {
                marginLine.remove();
            }
            // add new margin line
            //add div to show line of margin
            marginLine = document.createElement("div");
            marginLine.id = "marginLine";
            marginLine.style.position = "absolute";
            // marginLine.style.backgroundColor = "red";
            marginLine.style.height = rectBottom - rectTop + marginLineTop + marginLineBottom + "px";
            marginLine.style.width = rectRight - rectLeft + marginLineRight + marginLineLeft + "px";
            marginLine.style.top = rectTop - marginLineTop + "px";
            marginLine.style.left = rectLeft - marginLineLeft + "px";
            marginLine.style.border = "1px dashed #1bbcf1";
            marginLine.style.zIndex = "9";

            console.log("rectLeft: " + rectLeft + "marginLineLeft: " + marginLineLeft + "rectRight: " + rectRight + "marginLineRight: " + marginLineRight + "rectTop: " + rectTop + "marginLineTop: " + marginLineTop + "rectBottom: " + rectBottom + "marginLineBottom: " + marginLineBottom + "");

            event.target.before(marginLine);

            marginChanged = false;
        }

        //only create new padding line if the padding has changed
        if (paddingChanged === true) {
            //delete previous margin and padding line
            let paddingLine = canvasDocument.getElementById("paddingLine");
            if (paddingLine !== null) {
                paddingLine.remove();
            }

            //add div to show line of padding
            paddingLine = document.createElement("div");
            paddingLine.id = "paddingLine";
            paddingLine.style.position = "absolute";
            // paddingLine.style.backgroundColor = "red";
            paddingLine.style.height = rectBottom - rectTop - (paddingLineTop * 2) - paddingLineBottom + "px";
            paddingLine.style.width = rectRight - rectLeft - paddingLineRight - (paddingLineLeft * 2) + "px";
            paddingLine.style.top = rectTop + paddingLineTop + "px";
            paddingLine.style.left = rectLeft + paddingLineLeft + "px";
            paddingLine.style.border = "1px dashed #1bbcf1";
            paddingLine.style.zIndex = "9";
            event.target.before(paddingLine);

            paddingChanged = false;
        }




        //add div to show line of padding



        //check marign and padding of the selected element
        // console.log("margin: " + marginTop + " " + marginRight + " " + marginBottom + " " + marginLeft);
        // console.log("padding: " + paddingTop + " " + paddingRight + " " + paddingBottom + " " + paddingLeft);





        // console.log("margin: " + marginTop + " " + marginRight + " " + marginBottom + " " + marginLeft);
        // console.log("padding: " + paddingTop + " " + paddingRight + " " + paddingBottom + " " + paddingLeft);

        //check if the cursor is on the top left edge of the selected element
        // if (event.clientX === rectLeft && event.clientY === rectTop) {
        //     console.log("elm: top left");
        // } else if (event.clientX === rectRight && event.clientY === rectTop) {
        //     console.log("elm: top right");
        // } else if (event.clientX === rectLeft && event.clientY === rectBottom) {
        //     console.log("elm: bottom left");
        // } else if (event.clientX === rectRight && event.clientY === rectBottom) {
        //     console.log("elm: bottom right");
        // } else if (event.clientX > rectLeft && event.clientX < rectRight && event.clientY === rectTop) {
        //     console.log("elm: top");
        // } else if (event.clientX > rectLeft && event.clientX < rectRight && event.clientY === rectBottom) {
        //     console.log("elm: bottom");
        // } else if (event.clientX === rectLeft && event.clientY > rectTop && event.clientY < rectBottom) {
        //     console.log("elm: left");
        // } else if (event.clientX === rectRight && event.clientY > rectTop && event.clientY < rectBottom) {
        //     console.log("elm: right");
        // }
        // //check if the cursor is on the top left edge of the selected elemnt's margin
        // else if (event.clientX === rectLeft - marginLineLeft && event.clientY === rectTop - marginLineTop) {
        //     console.log("margin: top left");
        // } else if (event.clientX === rectRight + marginLineRight && event.clientY === rectTop - marginLineTop) {
        //     console.log("margin: top right");
        // } else if (event.clientX === rectLeft - marginLineLeft && event.clientY === rectBottom + marginLineBottom) {
        //     console.log("margin: bottom left");
        // } else if (event.clientX === rectRight + marginLineRight && event.clientY === rectBottom + marginLineBottom) {
        //     console.log("margin: bottom right");
        // } else if (event.clientX > rectLeft - marginLineLeft && event.clientX < rectRight + marginLineRight && event.clientY === rectTop - marginLineTop) {
        //     console.log("margin: top");
        // } else if (event.clientX > rectLeft - marginLineLeft && event.clientX < rectRight + marginLineRight && event.clientY === rectBottom + marginLineBottom) {
        //     console.log("margin: bottom");
        // } else if (event.clientX === rectLeft - marginLineLeft && event.clientY > rectTop - marginLineTop && event.clientY < rectBottom + marginLineBottom) {
        //     console.log("margin: left");
        // } else if (event.clientX === rectRight + marginLineRight && event.clientY > rectTop - marginLineTop && event.clientY < rectBottom + marginLineBottom) {
        //     console.log("margin: right");
        // }
        // //check if the cursor is on the top left edge of the selected elemnt's padding
        // else if (event.clientX === rectLeft + marginLeft && event.clientY === rectTop + marginTop) {
        //     console.log("padding: top left");
        // } else if (event.clientX === rectRight - marginRight && event.clientY === rectTop + marginTop) {
        //     console.log("padding: top right");
        // } else if (event.clientX === rectLeft + marginLeft && event.clientY === rectBottom - marginBottom) {
        //     console.log("padding: bottom left");
        // } else if (event.clientX === rectRight - marginRight && event.clientY === rectBottom - marginBottom) {

        //     console.log("padding: bottom right");
        // } else if (event.clientX > rectLeft + marginLeft && event.clientX < rectRight - marginRight && event.clientY === rectTop + marginTop) {
        //     console.log("padding: top");
        // } else if (event.clientX > rectLeft + marginLeft && event.clientX < rectRight - marginRight && event.clientY === rectBottom - marginBottom) {
        //     console.log("padding: bottom");
        // } else if (event.clientX === rectLeft + marginLeft && event.clientY > rectTop + marginTop && event.clientY < rectBottom - marginBottom) {
        //     console.log("padding: left");
        // } else if (event.clientX === rectRight - marginRight && event.clientY > rectTop + marginTop && event.clientY < rectBottom - marginBottom) {
        //     console.log("padding: right");
        // } else {
        //     console.log("notInArea");
        // }




        // check if the mouse is inside the selected element
        // if (event.clientX > rect.left && event.clientX < rect.right && event.clientY > rect.top && event.clientY < rect.bottom) {
        //     console.log("inside");
        // } else {
        //     console.log("not inside");
        // }

        // if (event.clientX > rect.left && event.clientX < rect.right && event.clientY > rect.top && event.clientY < rect.bottom) {
        //     console.log("HERE!!");
        // } else {
        //     console.log("NOT HERE!!");
        // }



        // console.log(" rect.top: " + rectTop + " event.clientY: " + event.clientY);
        // console.log("event.clientX: " + event.clientX + "event.clientY: " + event.clientY);
        // console.log(" rect.left: " + rect.left + " rect.top: " + rect.top);
        // console.log("clientX: " + event.clientX + " clientY: " + event.clientY);


    });
    // add keydown event listener to

}


//
// Double Click and related functions
//

// Double Click: make element editable when double clicked
export function addDblClickEventListeners(elm) {

    elm.addEventListener("dblclick", function () {
        // add contenteditable attributes to a double clicked element
        if (elm.tagName !== "BODY") {
            elm.setAttribute("contenteditable", "true");
            elm.setAttribute("spellcheck", "true");
        }
    }, false);
}


//
// Drag and Drop and related functions
//


//use to set data to identify which element to swap when drop event is fired
let draggedElm = null;
//use in dragover event to identify when to insert element before or after, and, to prevent swapping with itself
let previousState = null;
// 
let draggedOverOutline = null;

export function addDragAndDropEventListeners(elm) {

    //Dragging: enable drag and drop element swapping
    elm.addEventListener('dragstart', (event) => {
        //set transparent image to prevent to show a default drag image
        const transparentImage = new Image();
        transparentImage.src =
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        event.dataTransfer.setDragImage(transparentImage, 0, 0);

        //set drag effect to move (to delete + icon while drag & drop)
        event.dataTransfer.effectAllowed = "move";

        //Set data to identify which element to swap when drop event is fired
        draggedElm = event.target;

        // const canvasWrapper = new CanvasWrapper();
        // console.log(canvasWrapper.isSelectedElement(draggedElm));

        //change state of draggedElm to selectedElm if draggedElm is not selectedElm
        const canvasWrapper = new CanvasWrapper();
        if (!canvasWrapper.isSelectedElement(draggedElm)) {
            // if (draggedElm.id !== "selectedElm") {
            // set id to selected element
            selectElm(event.target);

            // add caption to selected element
            addCaptionToSelectedElm(event.target);
        }
    });

    //Dragover: identify when to insert element before or after, and, to prevent swapping with itself
    elm.addEventListener('dragover', (event) => {
        event.preventDefault();
        // get canvas window and document
        const canvasWindow = event.target.ownerDocument.defaultView;
        const canvasDocument = event.target.ownerDocument;

        //get elementManager and check if draggedElm can be parent of event.target
        const element = elementManagerFactory(event.target.tagName);

        const canBeParentOf = element.canBeParentOf(draggedElm);
        // console.log("can be parent of:" + canBeParentOf);


        //
        if (event.target.getAttribute("data-uuid") === draggedElm.getAttribute("data-uuid")) {
            //console.log("same element");
            return;
        }

        //
        const rect = event.target.getBoundingClientRect();
        const offset = event.clientY - rect.top;

        //create outline div for element to show user where element will be inserted
        if (draggedOverOutline === null) {
            draggedOverOutline = document.createElement("div");
            draggedOverOutline.id = "draggedOverOutline";
            draggedOverOutline.classList = "draggedOverOutline";
            const absoluteRectTop = rect.top + canvasWindow.scrollY;
            const absoluteRectBottom = rect.bottom + canvasWindow.scrollY;
            const absoluteRectLeft = rect.left + canvasWindow.scrollX;
            const absoluteRectRight = rect.right + canvasWindow.scrollX;

            draggedOverOutline.style.left = absoluteRectLeft + "px";
            draggedOverOutline.style.top = absoluteRectTop + "px";
            draggedOverOutline.style.width = absoluteRectRight - absoluteRectLeft + "px";
            draggedOverOutline.style.height = absoluteRectBottom - absoluteRectTop + "px";

            //add outline div after document's last element
            canvasDocument.body.after(draggedOverOutline);
        }


        // console.log(canvasDocument.lastElementChild);


        //allow user to insert an element as a child
        if (canBeParentOf) {
            //add class to element to show user where element will be inserted
            //assign true to isInTo if offset is in top 1/3 of element
            const isAtTop = offset < rect.height / 3;
            //return true if offset is in bottom 1/3 of element
            const isAtBottom = offset > rect.height * 2 / 3;


            //console.log("top: " + isAtTop + " bottom: " + isAtBottom);


            //add class to element to show user where element will be inserted
            if (isAtTop) {
                //change class only if previous state is not isAtTop
                if (previousState !== "isAtTop") {
                    //remove previous class if other part of element is highlighted
                    if (previousState !== null) {
                        draggedOverOutline.classList.remove(previousState);
                    }
                    //set previous state to isAtTop
                    previousState = "isAtTop";
                    //add isAtTop class to element to highlight where element will be inserted
                    draggedOverOutline.classList.add("isAtTop");
                }
                // console.log("isAtTop");
            } else if (isAtBottom) {
                if (previousState !== "isAtBottom") {
                    if (previousState !== null) {
                        draggedOverOutline.classList.remove(previousState);
                    }
                    previousState = "isAtBottom";
                    draggedOverOutline.classList.add("isAtBottom");
                }
                // console.log("isAtBottom");
            } else if (!isAtTop && !isAtBottom) {
                if (previousState !== "middle") {
                    if (previousState !== null) {
                        draggedOverOutline.classList.remove(previousState);
                    }
                    previousState = "middle";
                    draggedOverOutline.classList.add("middle");
                }
                // console.log("middle");
            }



        }
        //only allow user to insert an element as a sibling
        else {
            //assign true to isInTo if offset is in top 1/3 of element
            const isAtTop = offset < rect.height / 2;

            //console.log("top: " + isAtTop + " bottom: " + isAtBottom);


            //add class to element to show user where element will be inserted
            if (isAtTop) {
                //change class only if previous state is not isAtTop
                if (previousState !== "isAtTop") {
                    //remove previous class if other part of element is highlighted
                    if (previousState !== null) {
                        draggedOverOutline.classList.remove(previousState);
                    }
                    //set previous state to isAtTop
                    previousState = "isAtTop";
                    //add isAtTop class to element to highlight where element will be inserted
                    draggedOverOutline.classList.add("isAtTop");
                }
                // console.log("isAtTop");
            } else {
                if (previousState !== "isAtBottom") {
                    if (previousState !== null) {
                        draggedOverOutline.classList.remove(previousState);
                    }
                    previousState = "isAtBottom";
                    draggedOverOutline.classList.add("isAtBottom");
                }
            }
        }

        //stop propagate to prevent dragover event from firing on parent element
        event.stopPropagation();
    });

    //Dragleave: remove class from element when dragleave event is fired
    elm.addEventListener('dragleave', (event) => {
        event.preventDefault();

        // console.log("previousState: " + previousState);

        if (previousState !== null) {
            // draggedOverOutline.classList.remove(previousState);
            draggedOverOutline.remove();
            previousState = null;
        }

        draggedOverOutline = null;
    });

    //Drop: swap element with element being dragged
    elm.addEventListener('drop', (event) => {
        event.preventDefault();

        //break if dragged element is same as element being dropped on
        //also break if previousState is null
        if (event.target.getAttribute("data-uuid") === draggedElm.getAttribute("data-uuid") || previousState === null) {
            //console.log("same element");
            return;
        }

        //remove dragged element from previous position
        draggedElm.parentNode.removeChild(draggedElm);

        //insert dragged element into new position
        if (event.target.tagName === "BODY") {
            if (previousState === "isAtTop") {
                event.target.prepend(draggedElm);
                // draggedOverOutline.classList.remove("isAtTop");
            } else {
                event.target.appendChild(draggedElm);
                // draggedOverOutline.classList.remove(previousState);
            }
        } else {
            //place dragged element before or after element being dropped on
            if (previousState === "isAtTop") {
                event.target.before(draggedElm);
                // draggedOverOutline.classList.remove("isAtTop");
            } else if (previousState === "isAtBottom") {
                event.target.after(draggedElm);
                // draggedOverOutline.classList.remove("isAtBottom");
            } else if (previousState === "middle") {
                //place dragged element as a child 
                event.target.appendChild(draggedElm);
                // draggedOverOutline.classList.remove("middle");
            }
        }

        //
        if (draggedOverOutline !== null) {
            draggedOverOutline.remove();
            draggedOverOutline = null;
            previousState = null;
        }

        //reset Caption to selected element
        addCaptionToSelectedElm(draggedElm);
    });

}

//
//




//



// function setCssValueToCssEditor(elm) {
//     //all css property items in css editor
//     const cssProperties = [
//         "width",
//         "height",
//         "min-width",
//         "min-height",
//         "max-width",
//         "max-height",
//         //add more css properties here
//     ]

//     // get css value from selected element
//     const cssValues = elm.ownerDocument.defaultView.getComputedStyle(elm);

//     //get disabled css property items
//     const elmManager = elementManagerFactory(elm);
//     const enabledCssProperties = elmManager.getEnabledCssProperties();

//     // console.log("cssValue: ", cssValue);
//     // console.log(enabledCssProperties[cssProperties[0]]);

//     cssProperties.forEach((cssProperty) => {
//         //get css editor
//         const targetProperty = document.getElementById(cssProperty);
//         const targetValue = targetProperty.querySelectorAll('[data-css-value-type="value"]')[0];
//         const targetUnit = targetProperty.querySelectorAll('[data-css-value-type="unit"]')[0];

//         let cssValue = cssValues[cssProperty];
//         cssValue = 
//         console.log(cssProperty + ": " + cssValues[cssProperty]);

//         if (enabledCssProperties[cssProperty] === true) {
//             if(targetUnit !== null){
//                 //
//             } else{
//                 //
//             }
//             console.log("targetValue: " + targetValue);
//             console.log("targetUnit: " + targetUnit);
//         } else {
//             //clear value and disable css editor

//         }


//         //set css value to css editor

//     });

//     // get 

//     // console.log("cssValue.length: ", cssValue.length);
//     // console.log("cssValue.length: ", cssValue[350]);

//     // // get css editor
//     // const cssEditor = elm.ownerDocument.getElementById("cssEditor");

//     // // set css value to css editor
//     // cssEditor.value = cssValue.cssText;

// }
