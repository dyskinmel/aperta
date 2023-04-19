export function adjustBodyHeight() {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasWindowHeight = canvasWindow.innerHeight;
    const canvasBody = canvasWindow.document.body;
    const lastElmInBody = canvasBody.lastElementChild;
    const lastElmY = lastElmInBody.getBoundingClientRect().bottom;

    // console.log("lastElmY: ", lastElmY);


    if (lastElmY < canvasWindowHeight) {
        canvasBody.style.height = `${canvasWindowHeight}px`;
    } else {
        canvasBody.style.height = 'auto';
    }
}