<script>
    import { blurWhenEnterPressed } from "./CssEditorUtils.js";
    import { applyStyleToSelectedElement } from "./CssEditorUtils.js";
    import { parseCssValue } from "./CssEditorUtils.js";
    import { convertCssUnits } from "./CssEditorUtils.js";

    // export let property;
    export let item;

    let hidden = null;
    let isDisabled = false;

    let inputClass = "cssSizeMenuItemInputUnit deleteArrow";

    // let currentValue = null;
    let currentUnit = null;

    let sizeProperty = null;
    let sizeValue = null;
    let sizeUnit = null;

    function getSizeValueAndApply(event) {
        let propertyName = sizeProperty.id;
        let value = sizeValue.value;
        let unit = sizeUnit.value;
        let cssValue = `${value}${unit}`;
        if (value !== "") {
            if (isNaN(sizeValue.value)) {
                sizeValue.value = "";
                return;
            }
            applyStyleToSelectedElement(propertyName, cssValue);
        }
    }

    function saveValues(event) {
        // currentValue = sizeValue.value;
        currentUnit = sizeUnit.value;
        // console.log(previousValue + " " + previousUnit);
    }

    function handleUnitChange(event) {
        let propertyName = sizeProperty.id;
        let currentValue = sizeValue.value;
        let convertUnit = sizeUnit.value;
        let cssValue = `${currentValue}${convertUnit}`;

        // apply edited style to selected element
        // if (value !== "") {
        //     applyStyleToSelectedElement(property, cssValue);
        // }

        if (sizeUnit.value === "None" || sizeUnit.value === "Auto") {
            // console.log("None or Auto");
            sizeValue.value = sizeUnit.value;
            sizeUnit.value = hidden;
            isDisabled = true;
            inputClass = "cssSizeMenuItemInputUnit";

            //set css value to apply it to selected element
            cssValue = sizeValue.value;
        } else {
            inputClass = "cssSizeMenuItemInputUnit deleteArrow";
            isDisabled = false;

            // if previous state is None or Auto, set empty string to value
            if (sizeValue.value === "None" || sizeValue.value === "Auto") {
                //get current style value
                const canvas = document.getElementById("canvas");
                const canvasWindow = canvas.contentWindow;
                const canvasDocument = canvasWindow.document;
                const selectedElm =
                    canvasDocument.getElementById("selectedElm");

                // if no element is selected, set value to empty string
                if (selectedElm === null) {
                    sizeValue.value = "";
                    return;
                } else {
                    // get selected element's current style value and set it to sizeValue
                    //
                    let currentStyleValue =
                        canvasWindow.getComputedStyle(selectedElm)[
                            propertyName
                        ];

                    currentStyleValue = parseCssValue(currentStyleValue);

                    //
                    // add convert unit feature
                    //

                    // set valut to UI
                    sizeValue.value = currentStyleValue["value"];
                    sizeUnit.value = currentStyleValue["unit"].toUpperCase();

                    cssValue = `${sizeValue.value}${sizeUnit.value}`;
                }
            } else {
                // convert current css unit value to target unit value
                const convertedStyle = convertCssUnits(
                    propertyName,
                    currentValue,
                    currentUnit,
                    convertUnit
                );
                console.log(convertedStyle);

                sizeValue.value = convertedStyle["values"];
                sizeUnit.value = convertedStyle["unit"];

                cssValue = convertedStyle["values"] + convertedStyle["unit"];
            }
        }

        console.log(cssValue);
        // apply edited style to selected element
        applyStyleToSelectedElement(propertyName, cssValue);

        // blur to make sure next time user clicks on input, focused event will be fired
        event.target.blur();
    }
</script>

<div class="cssSizeMenuItem" bind:this={sizeProperty} id={item.value}>
    <span class="cssSizeMenuItemLabel">{item.label}</span>
    <div class="cssSizeMenuItemInputGroup">
        <input
            type="text"
            class="cssSizeMenuItemInput"
            data-css-value-type="value"
            disabled={isDisabled}
            bind:this={sizeValue}
            on:keydown={blurWhenEnterPressed}
            on:blur={getSizeValueAndApply}
        />
        <!-- {#if isAuto === true}
            auto is true;
        {:else}
            auto is false
        {/if} -->

        <select
            class={inputClass}
            data-css-value-type="unit"
            bind:this={sizeUnit}
            on:focus={saveValues}
            on:change={handleUnitChange}
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
            <option bind:this={hidden} hidden />
        </select>
    </div>
</div>

<style>
    .deleteArrow {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
    }
    option {
        width: 100%;
    }
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
        width: 25px;
    }
</style>
