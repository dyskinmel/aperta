function iniPage() {

}

function addElement(event) {

    const canvas = document.getElementById("canvas");

    const caller = event.target;

    const new_elm = document.createElement(caller.getAttribute("data-Htag"));
    new_elm.textContent = "Heading";
    new_elm.classList.add("canvasItem");

    addElementListener(new_elm);

    canvas.appendChild(new_elm);


}

function addElementListener(elm) {
    // Mouse Move
    elm.addEventListener("mouseenter", function () {
        this.classList.add('hover');
    }, false);
    elm.addEventListener("mouseleave", function () {
        this.classList.remove('hover');
    }, false);

    // Click
    elm.addEventListener("click", function () {
        const parent = elm.parentNode;

        for (let i = 0; i < parent.childElementCount; i++) {
            parent.children[i].classList.remove("selected");
        }

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

