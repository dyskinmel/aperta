<script>
    import { elementManagerFactory } from "./ElementManager.js";
    import { addKeydownEventListeners } from "./ElementEventListeners.js";

    let canvas;

    const onCanvasLoad = () => {
        const canvasWindow = canvas.contentWindow;
        addKeydownEventListeners(canvasWindow);
        const canvasBody = canvasWindow.document.body;
        const allElementsIncludingBody = [canvasBody].concat(
            Array.from(canvasBody.getElementsByTagName("*"))
        );

        console.log(allElementsIncludingBody);

        // go through all the HTML elements on the page and add event listeners to them.
        for (let i = 0; i < allElementsIncludingBody.length; i++) {
            const elm = allElementsIncludingBody[i];
            const elmManager = elementManagerFactory(elm);
            elmManager.addListenerToElement(elm);
        }
        // const elmManager = elementManagerFactory(canvasBody);
        // elmManager.addListenerToElement(canvasBody);
    };
</script>

<iframe
    bind:this={canvas}
    on:load={onCanvasLoad}
    src="./pageDesign/index.html"
    class="canvas"
    id="canvas"
    title="canvas"
/>

<style>
    .canvas {
        border: none;
        height: 100%;
        width: 100%;
        /* outline: 1px solid gray; */
        /* background-color: white; */
    }
</style>
