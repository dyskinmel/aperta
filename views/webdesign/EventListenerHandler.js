import { createElementManager } from "./Element";


// keydown event to delete selected eleemnt on canvas except for a body element
export function addKeydownEventListeners(elm) {
    elm.addEventListener('keydown', (event) => {
        //execute when delete or backspace key is pressed
        if (event.keyCode === 46 || event.keyCode === 8) {

            const canvas = document.getElementById("canvas");
            const canvasWindow = canvas.contentWindow;
            const canvasDocument = canvasWindow.document;
            const selectedElement = canvasDocument.getElementsByClassName("selected")[0];

            //delete selected element except for a body element

            if (selectedElement.tagName !== "BODY" && selectedElement.hasAttribute("contenteditable") === false) {
                selectedElement.remove();
            }
        }

    }, true);
}


//Hover activate: add hover class to hovered element to highlight
export function addHoverEventListeners(elm) {

    elm.addEventListener("mouseover", (event) => {
        event.preventDefault();

        // return if the target element is selected
        if (event.target.classList.contains("selected")) {
            return;
        }

        // add hover class to hovered element
        elm.classList.add('hover');

        // delete old hovered element before creating a new one
        const hoverLabel = event.target.ownerDocument.getElementById("hoverLabel");

        if (hoverLabel !== null) {
            hoverLabel.remove();
        }

        // get position of hovered element
        const rect = event.target.getBoundingClientRect();

        // create a label to show tagName
        let new_elm = document.createElement("div");
        new_elm.textContent = event.target.tagName;
        new_elm.id = "hoverLabel";
        new_elm.style.left = rect.left + 1 + "px";
        // new_elm.style.position = "absolute";
        // new_elm.style.color = "#1bbcf1";
        // new_elm.style.fontSize = "10px";
        // new_elm.style.fontWeight = "normal";

        // set position of hovered element
        if (event.target.tagName === "BODY") {
            new_elm.style.top = rect.top + 1 + "px";
        } else if (rect.top < 50) {
            new_elm.style.top = rect.bottom + 3 + "px";
        } else {
            new_elm.style.top = rect.top - 16 + "px";
        }

        event.target.before(new_elm);

        // const offset = event.clientY - rect.top;

        event.stopPropagation();
    }, false);

    //Hover deactivate: remove hover class to hovered element to highlight

    elm.addEventListener("mouseout", (event) => {
        event.preventDefault();

        // delete old hovered element before creating a new one
        const hoverLabel = event.target.ownerDocument.getElementById("hoverLabel");
        // console.log(hoveredElement);

        if (hoverLabel !== null) {
            hoverLabel.remove();
        }

        elm.classList.remove('hover');
        event.stopPropagation();
    }, false);
}


//Click: add select class to clicked element to target other events
export function addClickEventListeners(elm) {

    elm.addEventListener("click", (event) => {
        // delete contenteditable attribute from a current selected element
        const canvasDocument = elm.ownerDocument;

        let targetElements = canvasDocument.querySelector('[contenteditable="true"]');
        if (targetElements !== null) {
            if (elm.getAttribute('data-uuid') !== targetElements.getAttribute('data-uuid')) {
                targetElements.removeAttribute("contenteditable");
                targetElements.removeAttribute("spellcheck");
            }
        }

        /* Initialize: delete select class from a current selected element */
        targetElements = canvasDocument.getElementsByClassName("selected");

        if (typeof targetElements[0] !== "undefined") {
            targetElements[0].classList.remove("selected");
            // remove eventlistner from a current selected element
        }

        // add select class to clicked element
        elm.classList.add("selected");

        // delete old label and menu before creating a new one
        const selectLabel = event.target.ownerDocument.getElementById("selectLabel");

        if (selectLabel !== null) {
            selectLabel.remove();
        }

        // get position of hovered element
        const rect = event.target.getBoundingClientRect();

        // create a new label and menu element
        let new_elm = document.createElement("div");
        new_elm.textContent = event.target.tagName;
        new_elm.id = "selectLabel";
        new_elm.style.left = rect.left + 1 + "px";
        // new_elm.style.position = "absolute";
        // new_elm.style.color = "#1bbcf1";
        // new_elm.style.fontSize = "10px";
        // new_elm.style.fontWeight = "normal";

        // set position of hovered element
        if (event.target.tagName === "BODY") {
            new_elm.style.top = rect.top + 1 + "px";
        } else if (rect.top < 50) {
            new_elm.style.top = rect.bottom + 3 + "px";

        } else {
            new_elm.style.top = rect.top - 16 + "px";
        }

        event.target.before(new_elm);

        addListenersToChangeSizeMarginPadding(canvasDocument, rect);

        // console.log(elm);
        event.stopPropagation();
    }, false);
}

function addListenersToChangeSizeMarginPadding() {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;

    const cursorIsOn = "notInArea";

    canvasDocument.addEventListener("mousemove", function (event) {

        //get the selected element to get its position
        const selectedElm = canvasDocument.getElementsByClassName("selected")[0];
        const rect = selectedElm.getBoundingClientRect();
        // const rectTop = Math.round(rect.top);
        // const rectBottom = Math.round(rect.bottom);
        // const rectLeft = Math.round(rect.left);
        // const rectRight = Math.round(rect.right);
        const rectTop = rect.top;
        const rectBottom = rect.bottom;
        const rectLeft = rect.left;
        const rectRight = rect.right;




        // console.log("margin: " + marginTop + " " + marginRight + " " + marginBottom + " " + marginLeft);
        // console.log("padding: " + paddingTop + " " + paddingRight + " " + paddingBottom + " " + paddingLeft);

        //check if the cursor is on the top left edge of the selected element
        if (event.clientX === rectLeft && event.clientY === rectTop) {
            console.log("top left");
        } else if (event.clientX === rectRight && event.clientY === rectTop) {
            console.log("top right");
        } else if (event.clientX === rectLeft && event.clientY === rectBottom) {
            console.log("bottom left");
        } else if (event.clientX === rectRight && event.clientY === rectBottom) {
            console.log("bottom right");
        } else if (event.clientX > rectLeft && event.clientX < rectRight && event.clientY === rectTop) {
            console.log("top");
        } else if (event.clientX > rectLeft && event.clientX < rectRight && event.clientY === rectBottom) {
            console.log("bottom");
        } else if (event.clientX === rectLeft && event.clientY > rectTop && event.clientY < rectBottom) {
            console.log("left");
        } else if (event.clientX === rectRight && event.clientY > rectTop && event.clientY < rectBottom) {
            console.log("right");
        } else {
            console.log("notInArea");
        }



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


        //Set data to identify which element to swap when drop event is fired
        draggedElm = event.target;

        // event.dataTransfer.setData('text/plain', event.target.getAttribute('data-uuid'));
        //console.log("dragstart:draggedElm: " + event.target);

        //set transparent image to prevent to show default drag image
        const transparentImage = new Image();
        transparentImage.src =
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        event.dataTransfer.setDragImage(transparentImage, 0, 0);

        //set drag effect to move (to delete + icon while drag & drop)
        event.dataTransfer.effectAllowed = "move";

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

        //get data from dataTransfer to identify which element to swap when drop event is fired
        // const draggedElmUUID = event.dataTransfer.getData('text/plain');
        // console.log("draggedElmUUID: " + draggedElmUUID);

        //break if dragged element is same as element being dropped on
        //also break if previousState is null
        if (event.target.getAttribute("data-uuid") === draggedElm.getAttribute("data-uuid") || previousState === null) {
            //console.log("same element");
            return;
        }

        const selectedElement = event.target.ownerDocument.getElementById("selectedElement");

        if (selectedElement !== null) {
            selectedElement.remove();
        }

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
    });

}


