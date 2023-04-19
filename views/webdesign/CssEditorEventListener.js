
export function blurWhenEnterPressed(event) {
    if (event.key === 'Enter' || event.keyCode == 13) {
        event.target.blur();
    }
}

export function applyStyleToSelectedElement(css) {
    console.log(css);


}