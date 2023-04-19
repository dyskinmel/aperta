
export function blurWhenEnterPressed(event) {
    if (event.key === 'Enter' || event.keyCode == 13) {
        event.target.blur();
    }
}

export function applyStyleToSelectedElement(css) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;
    const selectedElement = canvasDocument.getElementById("selectedElm");

    if (selectedElement !== null) {
        selectedElement.setAttribute('style', css);
    }

    //add feature to set value to css style sheet
    // const styleSheet = canvasDocument.styleSheets[0];
    // styleSheet.insertRule(`#${selectedElement.id} { ${css} }`, 0);


    console.log(css);


}