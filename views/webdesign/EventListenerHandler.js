


// keydown event to delete selected eleemnt on canvas except for a body element
export function addKeydownEventListeners(elm) {
    elm.addEventListener('keydown', (event) => {
        if (event.keyCode === 46 || event.keyCode === 8) {

            //execute when delete or backspace key is pressed
            const canvas = document.getElementById("canvas");

            const canvasWindow = canvas.contentWindow;
            const canvasDocument = canvasWindow.document;
            const selectedElement = canvasDocument.getElementsByClassName("selected")[0];

            //delete selected element except for a body element

            if (selectedElement.tagName !== "BODY") {
                selectedElement.remove();
            }
        }

    }, true);
}


//Hover activate: add hover class to hovered element to highlight
export function addHoverEventListeners(elm) {

    elm.addEventListener("mouseover", (event) => {
        event.preventDefault();

        elm.classList.add('hover');
        event.stopPropagation();
    }, false);

    //Hover deactivate: remove hover class to hovered element to highlight

    elm.addEventListener("mouseout", (event) => {
        event.preventDefault();

        elm.classList.remove('hover');
        event.stopPropagation();
    }, false);
}


//Click: add select class to clicked element to target other events
export function addClickEventListeners(elm) {

    elm.addEventListener("click", (event) => {

        const canvasDocument = elm.ownerDocument;
        let targetElements = canvasDocument.getElementsByClassName("selected");

        /* Initialize: delete select class from a current selected element */
        if (typeof targetElements[0] !== "undefined") {
            targetElements[0].classList.remove("selected");
        }

        // add select class to clicked element
        elm.classList.add("selected");

        // console.log(elm);
        event.stopPropagation();
    }, false);
}

// Double Click: make element editable when double clicked
export function addDblClickEventListeners(elm) {

    elm.addEventListener("dblclick", function () {


        const canvasDocument = elm.ownerDocument;
        const targetElements = canvasDocument.querySelector('[contenteditable="true"]');

        //console.log(targetElements);
        // console.log(elm);

        if (targetElements !== null) {
            targetElements.removeAttribute("contenteditable");
            targetElements.removeAttribute("spellcheck");
        }

        // console.log(elm.tagName);

        if (elm.tagName !== "BODY") {
            elm.setAttribute("contenteditable", "true");
            elm.setAttribute("spellcheck", "true");
        }



    }, false);
}


export function addDragAndDropEventListeners(elm) {
    //Dragging: enable drag and drop element swapping

    elm.addEventListener('dragstart', (event) => {
        //Set data to dataTransfer to identify which element to swap when drop event is fired
        event.dataTransfer.setData('text/plain', event.target.getAttribute('data-uuid'));
        //console.log("dragstart:draggedElm: " + event.target);
    });


    //use in dragover event to identify when to insert element before or after, and, to prevent swapping with itself
    let previousState = null;

    //Dragover: identify when to insert element before or after, and, to prevent swapping with itself
    elm.addEventListener('dragover', (event) => {
        event.preventDefault();

        //
        const rect = event.target.getBoundingClientRect();
        const offset = event.clientY - rect.top;

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
        } else {
            if (previousState !== "middle") {
                if (previousState !== null) {
                    elm.classList.remove(previousState);
                }
                previousState = "middle";
                elm.classList.add("middle");
            }
            // console.log("middle");
        }

        //stop propagate to prevent dragover event from firing on parent element
        event.stopPropagation();
    });

    //Dragleave: remove class from element when dragleave event is fired
    elm.addEventListener('dragleave', (event) => {
        event.preventDefault();

        console.log("previousState: " + previousState);

        if (previousState !== null) {
            elm.classList.remove(previousState);
        }
        previousState = null;
    });

    //Drop: swap element with element being dragged
    elm.addEventListener('drop', (event) => {
        event.preventDefault();

        //get data from dataTransfer to identify which element to swap when drop event is fired
        const draggedElmUUID = event.dataTransfer.getData('text/plain');

        //console.log(event.target.getAttribute("data-uuid"));
        // console.log("draggedElmUUID: " + draggedElmUUID);
        // console.log("data-uuid: " + event.target.getAttribute("data-uuid"));


        //break if dragged element is same as element being dropped on
        if (event.target.getAttribute("data-uuid") === draggedElmUUID) {
            //console.log("same element");
            return;
        }

        //get dragged element
        const canvasDocument = elm.ownerDocument;
        const draggedElm = canvasDocument.querySelector(`[data-uuid="${draggedElmUUID}"]`);



        // console.log("dragend:UUID " + draggedElmUUID);
        // console.log("dragend:Elm " + draggedElm);
        // console.log("dragend:event.target: " + event.target);
        //        console.log("parent: " + draggedElm.parentNode);


        //remove dragged element from previous position
        draggedElm.parentNode.removeChild(draggedElm);

        //insert dragged element into new position
        if (event.target.tagName === "BODY") {
            event.target.appendChild(draggedElm);
        } else {
            //place dragged element before or after element being dropped on
            if (previousState === "isAtTop") {
                event.target.before(draggedElm);
                elm.classList.remove("isAtTop");
            } else if (previousState === "isAtBottom") {
                event.target.after(draggedElm);
                elm.classList.remove("isAtBottom");
            } else {
                //place dragged element as a child 
                event.target.appendChild(draggedElm);
                elm.classList.remove("middle");
            }
        }

        // console.log(previousState);



        //elm.classList.remove('dragging');
    });

}



