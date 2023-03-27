function iniPage() {

    addElementMenuItems();

}

iniPage();

function addElementMenuItems() {
    console.log("addElementMenuItems is here");

    fetch('../assets/json/elementList.json')
        .then(response => response.json())
        .then(data => {
            let elm = document.getElementsByClassName("menuTitle")[0];

            for (let elementGroup of data) {

                const new_elm = document.createElement("div");
                new_elm.textContent = elementGroup.name;
                new_elm.classList.add("groupName");

                elm.after(new_elm);
                elm = new_elm;

                new_elm = document.createElement("div");
                new_elm.classList.add(elementGroup.name + "Container");

                const container = document.querySelector('.' + elementGroup.name + "Container");
                container.style.display = 'grid';



                console.log(elementGroup.name);

                for (let element of elementGroup.elements) {

                    console.log("  " + element.name);

                }
            }
            console.log(data);
        })
        .catch(error => console.error(error));



    // const fileReader = new FileReader();

    // fileReader.onload = (event) => {
    //     const contents = event.target.result;
    //     const data = JSON.parse(contents);
    //     console.log(data);

    // };

    // fileReader.readAsText('../json/elementList.json');

}


// 

function addElement(event) {

    const canvas = document.getElementById("canvas");

    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;
    const canvasElement = canvasDocument.getElementsByClassName("selected")[0];

    const caller = event.target;

    const new_elm = document.createElement(caller.getAttribute("data-Htag"));
    new_elm.textContent = "Heading";
    new_elm.classList.add("canvasItem");
    new_elm.setAttribute("draggable", "true");

    addListenerToElement(new_elm);

    canvasElement.appendChild(new_elm);

    console.log(canvasElement);


}

function addListenerToElement(elm) {
    // Mouse Move
    elm.addEventListener("mouseenter", function () {
        this.classList.add('hover');
    }, false);
    elm.addEventListener("mouseleave", function () {
        this.classList.remove('hover');
    }, false);

    // Click
    elm.addEventListener("click", function () {
        const document = elm.ownerDocument;
        const targetElements = document.getElementsByClassName("selected");
        targetElements[0].classList.remove("selected");

        // for (let i = 0; i < parent.childElementCount; i++) {
        //     parent.children[i].classList.remove("selected");
        // }

        this.classList.add("selected");
        // console.log("Clicked!");

    }, false);

    // Double Click
    elm.addEventListener("dblclick", function () {


        this.setAttribute("contenteditable", "true");
        this.setAttribute("spellcheck", "true");


        this.addEventListener("blur", function () {
            this.removeAttribute("contenteditable");
            this.removeAttribute("spellcheck");
        });
        this.addEventListener("keydown", function (event) {
            if (event.key == "Enter") {
                this.removeAttribute("contenteditable");
                this.removeAttribute("spellcheck");
            }
        });

        this.focus();
    }, false);

    //drag

}



// Contentful

function getContentType() {
    const url = "https://cdn.contentful.com/spaces/rvj0gs4gb6wz/environments/master/content_types?access_token=4jj76mhuV9M5drJOAwzDx6Lpuv1eN8TLE4DHc6hN4hw";
    fetch(url)
        .then(response => response.json())
        .then(contentType => {
            const obj = JSON.parse(JSON.stringify(contentType));
            let pulldownMenu = document.createElement("select");
            const ContentTypeButton = document.getElementById("getContentType");

            for (i = 0; i < obj.items.length; i++) {
                const item = obj.items[i];

                let pulldownOption = document.createElement("option");
                pulldownOption.textContent = item.name;

                pulldownMenu.appendChild(pulldownOption);

                console.log(item.name);

            }

            ContentTypeButton.after(pulldownMenu);



        });
}

