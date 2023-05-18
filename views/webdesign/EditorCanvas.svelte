<script>
    import { elementManagerFactory } from "./ElementManager.js";
    import { addKeydownEventListeners } from "./ElementEventListeners.js";

    let canvas;

    const onCanvasLoad = () => {
        const canvasWindow = canvas.contentWindow;
        addKeydownEventListeners(canvasWindow);
        const canvasBody = canvasWindow.document.body;

        // TODO: go through all the HTML elements on the page and add event listeners to them.
        const elm = elementManagerFactory(canvasBody);
        elm.addListenerToElement(canvasBody);
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
