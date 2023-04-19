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