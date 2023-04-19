import { createElementManager } from "./Element";
import { adjustBodyHeight } from "./CanvasManager";


// keydown event to delete selected eleemnt on canvas except for a body element
export function addKeydownEventListeners(elm) {
    elm.addEventListener('keydown', (event) => {
        const canvas = document.getElementById("canvas");
        const canvasWindow = canvas.contentWindow;
        const canvasDocument = canvasWindow.document;
        const selectedElement = canvasDocument.getElementById("selectedElm");
        //delete element when delete or backspace key is pressed
        if (event.keyCode === 46 || event.keyCode === 8) {
            //delete selected element except for a body element

            if (selectedElement.tagName !== "BODY" && selectedElement.hasAttribute("contenteditable") === false) {
                selectedElement.remove();
                adjustBodyHeight();
            }
        }

        //make contenteditable false when meta + enter key is pressed
        if (event.metaKey && event.key === "Enter") {
            //if contentedible is true, make it false

            if (selectedElement.tagName !== "BODY" && selectedElement.hasAttribute("contenteditable") === true) {
                selectedElement.removeAttribute("contenteditable");
                selectedElement.removeAttribute("spellcheck");
            }
        }

        if (event.key === "ArrowUp") {
            //change selected element to previous sibling element or parent element

            if (selectedElement.tagName === "BODY") return;

            if (selectedElement.previousElementSibling !== null) {
                selectElm(selectedElement.previousElementSibling);
                addCaptionToSelectedElm(selectedElement.previousElementSibling);
            } else if (selectedElement.parentElement !== null) {
                selectElm(selectedElement.parentElement);
                addCaptionToSelectedElm(selectedElement.parentElement);
            }
        }
        if (event.key === "ArrowDown") {
            //change selected element to next sibling element or first child element

            if (selectedElement.tagName == "BODY") {
                selectElm(selectedElement.firstElementChild);
                addCaptionToSelectedElm(selectedElement.firstElementChild);
                return;
            }

            if (selectedElement.nextElementSibling !== null) {
                selectElm(selectedElement.nextElementSibling);
                addCaptionToSelectedElm(selectedElement.nextElementSibling);
            } else if (selectedElement.firstElementChild !== null) {
                selectElm(selectedElement.firstElementChild);
            }
        }
        if (event.key === "ArrowLeft") {
        }


    }, true);
}




//Hover activate: add hover class to hovered element to highlight
export function addHoverEventListeners(elm) {

    elm.addEventListener("mouseover", (event) => {
        event.preventDefault();

        const ignoreId = ["marginLine", "paddingLine"];

        // return if the target element is selected
        if (event.target.id === ("selectedElm") || ignoreId.includes(event.target.id)) {
            return;
        }

        // add hover class to hovered element
        elm.classList.add('hover');

        // add caption to hovered element
        addCaptionToHoveredElm(event.target);

        // const offset = event.clientY - rect.top;

        event.stopPropagation();
    }, false);

    //Hover deactivate: remove hover class to hovered element to highlight

    elm.addEventListener("mouseout", (event) => {
        event.preventDefault();

        // delete old hovered element before creating a new one
        const hoverCaption = event.target.ownerDocument.getElementById("hoverCaption");
        delCaptionFromHoveredElm(hoverCaption);

        elm.classList.remove('hover');

        event.stopPropagation();
    }, false);
}


//Click: add select class to clicked element to target other events
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

        elm.classList.remove('hover');


        // set id to selected element
        selectElm(event.target);

        // add caption to selected element
        addCaptionToSelectedElm(event.target);

        // addListenersToChangeSizeMarginPadding(canvasDocument, rect);

        // console.log(elm);
        event.stopPropagation();
    }, false);
}

function addListenersToChangeSizeMarginPadding() {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;

    const cursorIsOn = "notInArea";

    //track if the margin or padding has changed
    let marginChanged = true;
    let paddingChanged = true;

    canvasDocument.addEventListener("mousemove", function (event) {


        //get the selected element to get its position
        const selectedElm = canvasDocument.getElementById("selectedElm");
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

// Double Click: make element editable when double clicked
export function addDblClickEventListeners(elm) {

    elm.addEventListener("dblclick", function () {

        // delete contenteditable attribute from a current selected element
        // const canvasDocument = elm.ownerDocument;
        // const targetElements = canvasDocument.querySelector('[contenteditable="true"]');

        // if (targetElements !== null) {
        //     targetElements.removeAttribute("contenteditable");
        //     targetElements.removeAttribute("spellcheck");
        // }

        // console.log(elm.tagName);

        if (elm.tagName !== "BODY") {
            elm.setAttribute("contenteditable", "true");
            elm.setAttribute("spellcheck", "true");
        }



    }, false);
}

//use to set data to identify which element to swap when drop event is fired
let draggedElm = null;
//use in dragover event to identify when to insert element before or after, and, to prevent swapping with itself
let previousState = null;

export function addDragAndDropEventListeners(elm) {

    //Dragging: enable drag and drop element swapping
    elm.addEventListener('dragstart', (event) => {
        //set transparent image to prevent to show default drag image
        const transparentImage = new Image();
        transparentImage.src =
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        event.dataTransfer.setDragImage(transparentImage, 0, 0);

        //set drag effect to move (to delete + icon while drag & drop)
        event.dataTransfer.effectAllowed = "move";


        //Set data to identify which element to swap when drop event is fired
        draggedElm = event.target;

        //set selectedElm id to draggedElm if draggedElm is not selectedElm
        if (draggedElm.id !== "selectedElm") {
            // set id to selected element
            selectElm(event.target);

            // add caption to selected element
            addCaptionToSelectedElm(event.target);
        }
    });



    //Dragover: identify when to insert element before or after, and, to prevent swapping with itself
    elm.addEventListener('dragover', (event) => {
        event.preventDefault();

        const elementManager = createElementManager(event.target);
        console.log("can be parent of:" + elementManager.canBeParentOf(draggedElm));
        const canBeParentOf = elementManager.canBeParentOf(draggedElm);

        //
        const rect = event.target.getBoundingClientRect();
        const offset = event.clientY - rect.top;

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
                        elm.classList.remove(previousState);
                    }
                    //set previous state to isAtTop
                    previousState = "isAtTop";
                    //add isAtTop class to element to highlight where element will be inserted
                    elm.classList.add("isAtTop");
                }
                // console.log("isAtTop");
            } else if (isAtBottom) {
                if (previousState !== "isAtBottom") {
                    if (previousState !== null) {
                        elm.classList.remove(previousState);
                    }
                    previousState = "isAtBottom";
                    elm.classList.add("isAtBottom");
                }
                // console.log("isAtBottom");
            } else if (!isAtTop && !isAtBottom) {
                if (previousState !== "middle") {
                    if (previousState !== null) {
                        elm.classList.remove(previousState);
                    }
                    previousState = "middle";
                    elm.classList.add("middle");
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
                        elm.classList.remove(previousState);
                    }
                    //set previous state to isAtTop
                    previousState = "isAtTop";
                    //add isAtTop class to element to highlight where element will be inserted
                    elm.classList.add("isAtTop");
                }
                // console.log("isAtTop");
            } else {
                if (previousState !== "isAtBottom") {
                    if (previousState !== null) {
                        elm.classList.remove(previousState);
                    }
                    previousState = "isAtBottom";
                    elm.classList.add("isAtBottom");
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
            elm.classList.remove(previousState);
        }
        previousState = null;
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

        // const selectedElement = event.target.ownerDocument.getElementById("selectedElement");
        // if (selectedElement !== null) {
        //     selectedElement.remove();
        // }

        //get dragged element
        // const canvasDocument = elm.ownerDocument;
        // const draggedElm = canvasDocument.querySelector(`[data-uuid="${draggedElmUUID}"]`);

        //remove dragged element from previous position
        draggedElm.parentNode.removeChild(draggedElm);

        //insert dragged element into new position
        if (event.target.tagName === "BODY") {
            if (previousState === "isAtTop") {
                event.target.prepend(draggedElm);
                elm.classList.remove("isAtTop");
            } else {
                event.target.appendChild(draggedElm);
                elm.classList.remove(previousState);
            }

        } else {
            //place dragged element before or after element being dropped on
            if (previousState === "isAtTop") {
                event.target.before(draggedElm);
                elm.classList.remove("isAtTop");
            } else if (previousState === "isAtBottom") {
                event.target.after(draggedElm);
                elm.classList.remove("isAtBottom");
            } else if (previousState === "middle") {
                //place dragged element as a child 
                event.target.appendChild(draggedElm);
                elm.classList.remove("middle");
            }
        }

        //reset Caption to selected element
        addCaptionToSelectedElm(draggedElm);
    });

}

//
//

function addCaptionToHoveredElm(elm) {
    // delete old hovered element before creating a new one
    let hoverCaption = elm.ownerDocument.getElementById("hoverCaption");

    // if (hoverCaption !== null) {
    //     hoverCaption.remove();
    // }
    delCaptionFromHoveredElm(hoverCaption);

    // get position of hovered element
    const rect = elm.getBoundingClientRect();

    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const absoluteRectTop = rect.top + canvasWindow.scrollY;
    const absoluteRectBottom = rect.bottom + canvasWindow.scrollY;
    const absoluteRectLeft = rect.left + canvasWindow.scrollX;

    // create a label to show tagName
    hoverCaption = document.createElement("div");
    hoverCaption.textContent = elm.tagName;
    hoverCaption.id = "hoverCaption";
    hoverCaption.style.left = absoluteRectLeft + 1 + "px";
    // new_elm.style.position = "absolute";
    // new_elm.style.color = "#1bbcf1";
    // new_elm.style.fontSize = "10px";
    // new_elm.style.fontWeight = "normal";

    // set position of hovered element
    if (elm.tagName === "BODY") {
        hoverCaption.style.top = absoluteRectTop + 1 + "px";
    } else if (rect.top < 50) {
        hoverCaption.style.top = absoluteRectBottom + 3 + "px";
    } else {
        hoverCaption.style.top = absoluteRectTop - 16 + "px";
    }

    elm.ownerDocument.body.after(hoverCaption);

}

function delCaptionFromHoveredElm(hoverCaption) {
    // let hoverCaption = elm.ownerDocument.getElementById("hoverCaption");

    if (hoverCaption !== null) {
        hoverCaption.remove();
    }
}


//

function selectElm(elm) {
    const selectedElement = elm.ownerDocument.getElementById("selectedElm");

    if (selectedElement !== null) {
        //remove selectedElement id from previously selected element
        selectedElement.removeAttribute("id");
    }

    elm.id = "selectedElm";
}

function addCaptionToSelectedElm(elm) {
    // delete old label and menu before creating a new one
    let selectCaption = elm.ownerDocument.getElementById("selectCaption");

    if (selectCaption !== null) {
        selectCaption.remove();
    }

    // get position of hovered element
    const rect = elm.getBoundingClientRect();

    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const absoluteRectTop = rect.top + canvasWindow.scrollY;
    const absoluteRectBottom = rect.bottom + canvasWindow.scrollY;
    const absoluteRectLeft = rect.left + canvasWindow.scrollX;



    // create a new label and menu element
    selectCaption = document.createElement("div");
    selectCaption.textContent = elm.tagName;
    selectCaption.id = "selectCaption";
    selectCaption.style.left = absoluteRectLeft + 1 + "px";
    // new_elm.style.position = "absolute";
    // new_elm.style.color = "#1bbcf1";
    // new_elm.style.fontSize = "10px";
    // new_elm.style.fontWeight = "normal";

    // set position of hovered element
    if (elm.tagName === "BODY") {
        selectCaption.style.top = absoluteRectTop + 1 + "px";
    } else if (rect.top < 50) {
        selectCaption.style.top = absoluteRectBottom + 3 + "px";

    } else {
        selectCaption.style.top = absoluteRectTop - 16 + "px";
    }

    elm.ownerDocument.body.after(selectCaption);

}

