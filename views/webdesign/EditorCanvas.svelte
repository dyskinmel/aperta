<script>
    import { onMount } from "svelte";
    import { createElementManager } from "./Element.js";
    import { addKeydownEventListeners } from "./ElementEventListeners.js";

    let canvas;

    const onCanvasLoad = () => {
        const canvasWindow = canvas.contentWindow;
        addKeydownEventListeners(canvasWindow);
        const canvasBody = canvasWindow.document.body;

        const elm_manager = createElementManager(canvasBody);
        elm_manager.addListenerToElement(canvasBody);
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
