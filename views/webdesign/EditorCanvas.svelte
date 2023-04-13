<script>
    import { onMount } from "svelte";
    import { createElementManager } from "./Element.js";
    import { addKeydownEventListeners } from "./EventListenerHandler.js";

    let canvas;

    const onCanvasLoad = () => {
        const canvasWindow = canvas.contentWindow;
        addKeydownEventListeners(canvasWindow);
        const canvasDocument = canvasWindow.document;
        const elm = canvasDocument.getElementsByTagName("body")[0];

        const elm_manager = createElementManager(elm);
        elm_manager.addListenerToElement(elm);
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
