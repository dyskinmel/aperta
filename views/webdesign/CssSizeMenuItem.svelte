<script>
    import { blurWhenEnterPressed } from "./CssEditorEventListener.js";
    import { applyStyleToSelectedElement } from "./CssEditorEventListener.js";
    export let item;

    let sizeProperty = null;
    let sizeValue = null;
    let sizeUnit = null;
    function getSizeValueAndApply(event) {
        let property = sizeProperty.id;
        let value = sizeValue.value;
        let unit = sizeUnit.value;
        let css = `${property}: ${value}${unit};`;
        if (value !== "") {
            applyStyleToSelectedElement(css);
        }
    }
</script>

<div class="cssSizeMenuItem" bind:this={sizeProperty} id={item.value}>
    <span class="cssSizeMenuItemLabel">{item.label}</span>
    <div class="cssSizeMenuItemInputGroup">
        <input
            type="text"
            class="cssSizeMenuItemInput"
            data-css-value-type="value"
            bind:this={sizeValue}
            on:keydown={blurWhenEnterPressed}
            on:blur={getSizeValueAndApply}
        />
        <select
            class="cssSizeMenuItemInputUnit"
            data-css-value-type="unit"
            bind:this={sizeUnit}
            on:change={getSizeValueAndApply}
        >
            <option>PX</option>
            <option>%</option>
            <option>EM</option>
            <option>REM</option>
            <option>CH</option>
            <option>VW</option>
            <option>VH</option>
            <option>DVW</option>
            <option>DVH</option>
            {#if item.value == "max-height" || item.value == "max-width"}
                <option>None</option>
            {:else}
                <option>Auto</option>
            {/if}
        </select>
    </div>
</div>

<style>
    .cssSizeMenuItem {
        padding-top: 2px;
        padding-bottom: 2px;
        display: flex;
        justify-content: space-between;
    }
    .cssSizeMenuItemLabel {
        padding-left: 1px;
        font-size: 12px;
        white-space: nowrap;
    }
    .cssSizeMenuItemInputGroup {
        /* width: 100%; */
        display: flex;
        justify-content: space-between;
    }
    .cssSizeMenuItemInput {
        width: 20px;
    }
    .cssSizeMenuItemInputUnit {
        width: 40px;
    }
</style>
