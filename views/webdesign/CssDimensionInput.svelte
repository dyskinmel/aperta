<script>
    import { onMount } from "svelte";
    import { blurWhenEnterPressed } from "./CssEditorUtils.js";
    import { applyStyleToSelectedElement } from "./CssEditorUtils.js";
    import { parseCssValue } from "./CssEditorUtils.js";
    import { convertCssUnits } from "./CssEditorUtils.js";
    import { CanvasWrapper } from "./utils.js";

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

    // const cssStyleReader = new CssStyleReader();

    onMount(() => {
        // getCssStyle();
        document.addEventListener("elementSelected", (event) => {
            // console.log(sizeProperty.id);
            event.detail.targetStyle.getAppliedRule(sizeProperty.id);
            // console.log("chatched elementSelected event@CSSDimensionInput");
            // getCssStyle();
        });
    });

    function getCssStyle() {
        // cssStyleReader.getAppliedRule();
    }

    const getUnitType = (value) => {
        const keywords = ["NONE", "AUTO", ""];
        return keywords.includes(value.toUpperCase()) ? "KEYWORD" : "DIMENSION";
    };

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

        const currentUnitType = getUnitType(currentUnit);
        const convertUnitType = getUnitType(convertUnit);

        const UnitConvert = currentUnitType + "-" + convertUnitType;

        const canvasWrapper = new CanvasWrapper();

        //stop this function if there is no selected element
        if (canvasWrapper.isSelectedElementNull()) {
            return;
        }

        // console.log(UnitConvert);

        switch (UnitConvert) {
            case "DIMENSION-DIMENSION":
                // convert units and apply edited style to selected element
                //
                event.target.classList.add("deleteArrow");
                isDisabled = false;

                const convertedStyle = convertCssUnits(
                    propertyName,
                    currentValue,
                    currentUnit,
                    convertUnit
                );
                // console.log(convertedStyle);

                sizeValue.value = convertedStyle["values"];
                sizeUnit.value = convertedStyle["unit"];

                cssValue = convertedStyle["values"] + convertedStyle["unit"];
                break;
            case "KEYWORD-DIMENSION":
                // delete arrow from select option
                // get current style value from selected element
                // convert units and apply edited style to selected element

                // delete arrow from select option
                event.target.classList.add("deleteArrow");
                isDisabled = false;

                //get current style value

                const selectedElm = canvasWrapper.getSelectedElement();
                // const canvas = document.getElementById("canvas");
                // const canvasWindow = canvas.contentWindow;
                // const canvasDocument = canvasWindow.document;
                // const selectedElm =
                //     canvasDocument.getElementById("selectedElm");

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

                    //add condiiton for when NaN value is returned
                    if (isNaN(currentStyleValue["value"])) {
                        sizeValue.value = "";
                        return;
                    }

                    //
                    // add convert unit feature
                    //

                    // set value to UI
                    sizeValue.value = currentStyleValue["value"];
                    sizeUnit.value = currentStyleValue["unit"].toUpperCase();

                    cssValue = `${sizeValue.value}${sizeUnit.value}`;
                }
                // cssValue = convertCssUnits(
                //     currentValue,
                //     currentUnit,
                //     convertUnit
                // );
                break;
            case "DIMENSION-KEYWORD":
                // add arrow to select option
                // set value to NONE or AUTO
                // disable editing on input form
                // set css value to apply it to selected element

                sizeValue.value = sizeUnit.value;
                sizeUnit.value = hidden;
                isDisabled = true;
                event.target.classList.remove("deleteArrow");

                //set css value to apply it to selected element
                cssValue = sizeValue.value;

                break;
            case "KEYWORD-KEYWORD":
                // add arrow to select option
                // set value to NONE or AUTO
                // disable editing on input form
                // set css value to apply it to selected element

                sizeValue.value = sizeUnit.value;
                sizeUnit.value = hidden;
                isDisabled = true;
                event.target.classList.remove("deleteArrow");

                //set css value to apply it to selected element
                cssValue = sizeValue.value;
                break;
            default:
                cssValue = convertCssUnits(
                    currentValue,
                    currentUnit,
                    convertUnit
                );
                break;
        }

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
            data-aperta-css-value-type="value"
            disabled={isDisabled}
            bind:this={sizeValue}
            on:keydown={blurWhenEnterPressed}
            on:blur={getSizeValueAndApply}
        />

        <select
            class="cssSizeMenuItemInputUnit deleteArrow"
            data-aperta-css-value-type="unit"
            bind:this={sizeUnit}
            on:focus={saveValues}
            on:change={handleUnitChange}
        >
            {#each item.options as option}
                <option>{option}</option>
            {/each}
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
