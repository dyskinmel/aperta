// initialization process run on load
function iniPage() {
  //create addElementMenu pane
  addElementMenuItems();

  //onload add select on body's class on canvas HTML(iframe)
  const canvas = document.getElementById("canvas");

  const canvasWindow = canvas.contentWindow;
  const canvasDocument = canvasWindow.document;
  const selectedElement = canvasDocument.getElementsByTagName("body")[0];

  //console.log(selectedElement);

  //add event listener to body on campas

  addListenerToElement(selectedElement);

  // keydown event to delete selected eleemnt on canvas except for a body element
  canvasDocument.addEventListener(
    "keydown",
    function (event) {
      if (event.keyCode === 46 || event.keyCode === 8) {
        //execute when delete or backspace key is pressed
        const canvas = document.getElementById("canvas");

        const canvasWindow = canvas.contentWindow;
        const canvasDocument = canvasWindow.document;
        const selectedElement =
          canvasDocument.getElementsByClassName("selected")[0];

        //delete selected element except for a body element

        if (selectedElement.tagName !== "BODY") {
          selectedElement.remove();
        }
      }
    },
    true
  );
}

iniPage();

// add element menu items to right pane
function addElementMenuItems() {
  //load json file which include element list
  fetch("../assets/json/elementList.json")
    .then((response) => response.json())
    .then((data) => {
      let elm = document.getElementsByClassName("menuTitle")[0];

      // add group title and element items
      for (let elementGroup of data) {
        let new_elm = document.createElement("div");
        new_elm.classList.add("elementGroup");

        new_elm.textContent = elementGroup.name;

        elm.after(new_elm);

        //ovrewrite elm by new_elm to add element group in order
        elm = new_elm;

        new_elm = document.createElement("div");
        new_elm.classList.add(elementGroup.name + "Container");

        elm.appendChild(new_elm);

        let container = document.querySelector(
          "." + elementGroup.name + "Container"
        );
        container.style.display = "grid";
        container.style.gridTemplateColumns = "repeat(3, 1fr)";
        container.style.gridTemplateRows =
          "repeat(" + Math.ceil(elementGroup.elements.length / 3) + ", 1fr)";

        // console.log('repeat(' + (Math.ceil(elementGroup.elements.length / 3)) + ', 1fr)');

        //add element items
        for (let element of elementGroup.elements) {
          const menu_elm = document.createElement("div");
          menu_elm.classList.add("elementItem");
          menu_elm.setAttribute("data-Htag", element.tag);
          menu_elm.textContent = element.name;

          menu_elm.addEventListener(
            "click",
            function () {
              addElementToCanvas(event);
            },
            false
          );

          new_elm.appendChild(menu_elm);
        }
      }
      console.log(data);
    })
    .catch((error) => console.error(error));

  // const fileReader = new FileReader();

  // fileReader.onload = (event) => {
  //     const contents = event.target.result;
  //     const data = JSON.parse(contents);
  //     console.log(data);

  // };

  // fileReader.readAsText('../json/elementList.json');
}

// add selected element on element menu to canvas
function addElementToCanvas(event) {
  const canvas = document.getElementById("canvas");

  const canvasWindow = canvas.contentWindow;
  const canvasDocument = canvasWindow.document;
  const selectedElement = canvasDocument.getElementsByClassName("selected")[0];

  const caller = event.target;

  const new_elm = document.createElement(caller.getAttribute("data-Htag"));
  new_elm.textContent = caller.textContent;
  new_elm.classList.add("canvasItem");
  new_elm.setAttribute("draggable", "true");
  new_elm.setAttribute("data-uuid", crypto.randomUUID());

  // add event listener to new element
  addListenerToElement(new_elm);

  // console.log(new_elm.childElementCount);

  selectedElement.appendChild(new_elm);

  // console.log(new_elm);
}

// function to add listener to element
function addListenerToElement(elm) {
  //Hover activate: add hover class to hovered element to highlight
  elm.addEventListener(
    "mouseover",
    (event) => {
      event.preventDefault();

      elm.classList.add("hover");
      event.stopPropagation();
    },
    false
  );

  //Hover deactivate: remove hover class to hovered element to highlight
  elm.addEventListener(
    "mouseout",
    function () {
      elm.classList.remove("hover");
    },
    false
  );

  //Click: add select class to clicked element to target other events
  elm.addEventListener(
    "click",
    (event) => {
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
    },
    false
  );

  // Double Click: make element editable when double clicked
  elm.addEventListener(
    "dblclick",
    function () {
      const canvasDocument = elm.ownerDocument;
      const targetElements = canvasDocument.querySelector(
        '[contenteditable="true"]'
      );

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
    },
    false
  );

  //Dragging: enable drag and drop element swapping

  elm.addEventListener("dragstart", (event) => {
    //event.preventDefault();
    //elm.classList.add('dragging');

    //Set data to dataTransfer to identify which element to swap when drop event is fired
    event.dataTransfer.setData(
      "text/plain",
      event.target.getAttribute("data-uuid")
    );
    //console.log("dragstart:draggedElm: " + event.target);
  });

  //use in dragover event to identify when to insert element before or after, and, to prevent swapping with itself
  let previousState = null;

  //Dragover: identify when to insert element before or after, and, to prevent swapping with itself
  elm.addEventListener("dragover", (event) => {
    event.preventDefault();

    //
    const rect = event.target.getBoundingClientRect();
    const offset = event.clientY - rect.top;

    //assign true to isInTo if offset is in top 1/3 of element
    const isAtTop = offset < rect.height / 3;
    //return true if offset is in bottom 1/3 of element
    const isAtBottom = offset > (rect.height * 2) / 3;

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
  elm.addEventListener("dragleave", (event) => {
    event.preventDefault();

    console.log("previousState: " + previousState);

    if (previousState !== null) {
      elm.classList.remove(previousState);
    }
    previousState = null;
  });

  //Drop: swap element with element being dragged
  elm.addEventListener("drop", (event) => {
    event.preventDefault();

    //get data from dataTransfer to identify which element to swap when drop event is fired
    const draggedElmUUID = event.dataTransfer.getData("text/plain");

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
    const draggedElm = canvasDocument.querySelector(
      `[data-uuid="${draggedElmUUID}"]`
    );

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

// Contentful

function getContentType() {
  const url =
    "https://cdn.contentful.com/spaces/rvj0gs4gb6wz/environments/master/content_types?access_token=4jj76mhuV9M5drJOAwzDx6Lpuv1eN8TLE4DHc6hN4hw";
  fetch(url)
    .then((response) => response.json())
    .then((contentType) => {
      const obj = JSON.parse(JSON.stringify(contentType));
      let pulldownMenu = document.getElementById("contentTypes");
      const ContentTypeButton = document.getElementById("getContentType");

      for (i = 0; i < obj.items.length; i++) {
        const item = obj.items[i];

        let pulldownOption = document.createElement("option");
        pulldownOption.textContent = item.name;
        pulldownOption.setAttribute("id", item.sys.id);

        pulldownMenu.appendChild(pulldownOption);

        console.log(item.name);
      }

      ContentTypeButton.after(pulldownMenu);
    });
}

function getContents() {
  const selectedElement = document.getElementById("contentTypes");
  const selectedOptionId =
    selectedElement.options[selectedElement.selectedIndex].id;

  const url =
    "https://cdn.contentful.com/spaces/rvj0gs4gb6wz/environments/master/entries?access_token=4jj76mhuV9M5drJOAwzDx6Lpuv1eN8TLE4DHc6hN4hw&content_type=" +
    selectedOptionId;
  fetch(url)
    .then((response) => response.json())
    .then((entries) => {
      console.log(entries);
    });
}
