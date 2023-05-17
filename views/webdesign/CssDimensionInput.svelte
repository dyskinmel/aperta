<script>
    // import { onMount } from "svelte";
    import { blurWhenEnterPressed } from "./CssEditorUtils.js";
    // import { applyStyleToSelectedElement } from "./CssEditorUtils.js";
    import { parseCssValue } from "./CssEditorUtils.js";
    import { convertCssUnits } from "./CssEditorUtils.js";
    import { CanvasWrapper } from "./utils.js";
    import { cssStyleReader, selectorToEdit } from "./CssStore.js";
    //// import { cssStyleManager } from "./CssStore.js";
    //// import { selectorToEdit} from "./CssStore.js";

    // export let property;
    export let item;

    let hidden = null;
    let isDisabled = false;

    let inputClass = "cssSizeMenuItemInputUnit deleteArrow";

    // let currentValue = null;
    let currentUnit = null;

    let sizeSelector = null;
    let sizeProperty = null;
    let sizeValue = null;
    let sizeUnit = null;
    let sizeColor = null;

    let storeCssStyleReader = null;
    let storeSelectorToEdit = null;

    cssStyleReader.subscribe((value) => {
        storeCssStyleReader = value;
    });
    selectorToEdit.subscribe((value) => {
        storeSelectorToEdit = value;
    });

    // reactive statement to update the input value when the selector editor's value is changed
    $: {
        if (storeCssStyleReader === null) {
            //do nothing if no element is selected
        } else {
            if (storeSelectorToEdit === "") {
                const appliedRule = storeCssStyleReader.getAppliedRule(
                    sizeProperty.id
                );
                // console.log(appliedRule["appliedPropertyValue"]);
                // console.log(appliedRule);

                if (appliedRule["appliedPropertyValue"] === null) {
                    //clear the value from the input
                    sizeValue.value = "";
                    sizeUnit.value = "PX";
                    isDisabled = false;
                    sizeUnit.classList.add("deleteArrow");
                } else {
                    const parsedCssValue = parseCssValue(
                        appliedRule["appliedPropertyValue"]
                    );
                    sizeSelector = appliedRule["appliedSelector"];
                    sizeColor = appliedRule["appliedColor"];
                    // console.log(parsedCssValue);

                    //add condiiton for when NaN value is returned
                    if (isNaN(parsedCssValue["value"])) {
                        sizeValue.value = parsedCssValue["value"].toUpperCase();
                        sizeUnit.value = hidden;
                        isDisabled = true;
                        sizeUnit.classList.remove("deleteArrow");

                        // return;
                    } else {
                        sizeValue.value = parsedCssValue["value"];
                        sizeUnit.value = parsedCssValue["unit"].toUpperCase();
                        isDisabled = false;
                        sizeUnit.classList.add("deleteArrow");
                    }
                    // console.log("appliedRuleMode");
                }
            } else {
                sizeSelector = storeSelectorToEdit;
                // if mode is to edit individual selector properties
                const selectorRule =
                    storeCssStyleReader.getRuleBySelectorAndPropertyName(
                        sizeSelector,
                        sizeProperty.id
                    );
                // console.log(selectorRule);
                if (selectorRule["propertyValue"] === "") {
                    //clear the value from the input
                    sizeValue.value = "";
                    sizeUnit.value = "PX";
                    isDisabled = false;
                    sizeUnit.classList.add("deleteArrow");
                } else {
                    const parsedCssValue = parseCssValue(
                        selectorRule["propertyValue"]
                    );
                    sizeSelector = selectorRule["selector"];
                    sizeColor = selectorRule["color"];
                    console.log(parsedCssValue);
                    if (isNaN(parsedCssValue["value"])) {
                        sizeValue.value = parsedCssValue["value"].toUpperCase();
                        sizeUnit.value = hidden;
                        isDisabled = true;
                        sizeUnit.classList.remove("deleteArrow");

                        // return;
                    } else {
                        sizeValue.value = parsedCssValue["value"];
                        sizeUnit.value = parsedCssValue["unit"].toUpperCase();
                        isDisabled = false;
                        sizeUnit.classList.add("deleteArrow");
                    }
                    // console.log("appliedRuleMode");
                }

                // console.log("show properties of " + storeSelectorToEdit);
            }
            // console.log("storeCssStyleReader is not null");
        }
    }

    // const cssStyleReader = new CssStyleReader();

    // onMount(() => {
    //     // getCssStyle();
    //     document.addEventListener("elementSelected", (event) => {
    //         // console.log(sizeProperty.id);
    //         // console.log(sizeProperty);

    //         // event.detail.targetSytle.getRulebySelector(
    //         //     selectorToEdit.value,
    //         //     sizeProperty.id
    //         // );

    //         const appliedRule = event.detail.targetStyle.getAppliedRule(
    //             sizeProperty.id
    //         );
    //         // console.log(appliedRule["appliedPropertyValue"]);
    //         // console.log(appliedRule);

    //         if (appliedRule["appliedPropertyValue"] === null) {
    //             return;
    //         }

    //         const parsedCssValue = parseCssValue(
    //             appliedRule["appliedPropertyValue"]
    //         );
    //         // console.log(parsedCssValue);

    //         //add condiiton for when NaN value is returned
    //         if (isNaN(parsedCssValue["value"])) {
    //             sizeValue.value = parsedCssValue["value"].toUpperCase();
    //             sizeUnit.value = hidden;
    //             isDisabled = true;
    //             sizeUnit.classList.remove("deleteArrow");

    //             // return;
    //         } else {
    //             sizeValue.value = parsedCssValue["value"];
    //             sizeUnit.value = parsedCssValue["unit"].toUpperCase();
    //             isDisabled = false;
    //             sizeUnit.classList.add("deleteArrow");
    //         }

    //         // console.log("chatched elementSelected event@CSSDimensionInput");
    //         // getCssStyle();
    //     });
    // });

    //
    //

    // function getTagColorAccordingToMode(){

    // }

    //
    //

    function getSizeValueAndApply(event) {
        let propertyName = sizeProperty.id;
        let value = sizeValue.value;
        let unit = sizeUnit.value;
        let cssValue = `${value}${unit}`;

        if (value !== "") {
            // something other than number is entered in the input, then add "" to the value and return
            if (isNaN(sizeValue.value)) {
                sizeValue.value = "";
                return;
            }
            $cssStyleReader.setRule(sizeSelector, propertyName, cssValue);
        }
        // console.log("selector: " + sizeSelector + " color: " + sizeColor);

        // if (value !== "") {
        //     if (isNaN(sizeValue.value)) {
        //         sizeValue.value = "";
        //         return;
        //     }
        //     $cssStyleReader.selectorRule();
        //     // applyStyleToSelectedElement(propertyName, cssValue);
        // }
        // console.log("selector: " + sizeSelector + " color: " + sizeColor);
    }

    // functions related to unit conversion ////////////////
    //

    const getUnitType = (value) => {
        const keywords = ["NONE", "AUTO", ""];
        return keywords.includes(value.toUpperCase()) ? "KEYWORD" : "DIMENSION";
    };

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

        // console.log(UnitConvert);

        //stop this function if there is no selected element
        if (canvasWrapper.isSelectedElementNull()) {
            return;
        }

        // console.log(UnitConvert);

        // convert units and apply edited style to selected element
        // DIMENSION-KEYWORD means convert unit from DIMENSION(ex. 10px, 10em) to KEYWORD(ex. auto, none)
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

                console.log(sizeValue.value + sizeUnit.value);

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
                const canvasWindow = canvasWrapper.getCanvasWindow();
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

                    //add condition for when NaN value is returned
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
                sizeUnit.classList.remove("deleteArrow");

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
        //
        // applyStyleToSelectedElement(propertyName, cssValue);
        $cssStyleReader.setRule(sizeSelector, propertyName, cssValue);

        // blur to make sure next time user clicks on input, focused event will be fired
        event.target.blur();
    }
</script>

<!-- {setPropertyValueAccordingToMode($cssEditMode)} -->
<!-- {getCurrentMode($cssEditMode)} -->
<!-- {isCssEditModeTrue($cssEditMode)} -->
<!-- {$cssEditMode} -->
<!-- {$selectorToEdit} -->
<div class="cssSizeMenuItem" bind:this={sizeProperty} id={item.value}>
    <!--  -->
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
