import { addCaptionToSelectedElm } from "./utils";
import { elementManagerFactory } from "./ElementManager";

//
// functions be directly called by events from CssEditor
//

// blur a text input field when the enter key is pressed. 
export function blurWhenEnterPressed(event) {
    if (event.key === 'Enter' || event.keyCode == 13) {
        event.target.blur();
    }
}

// apply edited css value on CssEditor to the selected element
export function applyStyleToSelectedElement(property, cssValue) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;
    const selectedElement = canvasDocument.getElementById("selectedElm");

    if (selectedElement !== null) {
        selectedElement.style[property] = cssValue;
    }

    // refresh caption and outline to reflect a style change
    addCaptionToSelectedElm(selectedElement);
}

//
// functions related to data formatting
//

// parse css value to separate the value and unit
// e.g. "10px" -> { value: 10, unit: "px" }

export function parseCssValue(value) {
    const patterns = [
        // e.g. "10px"
        {
            regex: /^(\d*\.?\d+)([a-z]+|%*)$/i,
            handler: (matches) => ({
                value: parseFloat(matches[1]),
                unit: matches[2],
            }),
        },
        // e.g. "10px 20px 30px 40px"
        {
            regex: /^(\d*\.?\d+)\s+(\d*\.?\d+)\s+(\d*\.?\d+)\s+(\d*\.?\d+)([a-z]+|%*)$/i,
            handler: (matches) => ({
                values: [parseFloat(matches[1]), parseFloat(matches[2]), parseFloat(matches[3]), parseFloat(matches[4])],
                unit: matches[5],
            }),
        },
        // add more patterns here
    ];

    for (const pattern of patterns) {
        const matches = value.match(pattern.regex);
        if (matches) {
            return pattern.handler(matches);
        }
    }

    return { value }; // if no pattern matches, return the value as is
}

//
// functions related to convert units
//

// convert css value to target unit 
//

export function convertCssUnits(propertyName, currentValue, currentUnit, convertUnit) {
    console.log(propertyName + ": " + currentValue + " " + currentUnit + " → " + convertUnit);

    // css units based on viewport
    const vwUnits = ["VW", "SVW", "LVW", "DVW"];
    const vhUnits = ["VH", "SVH", "LVH", "DVH"];

    // convert current unit and target unit to uppercase
    let thisCurrentUnit = currentUnit.toUpperCase();
    let thisConvertUnit = convertUnit.toUpperCase();

    // convert viewport width based units and viewport height units to VW and VH
    thisCurrentUnit = vwUnits.some(unit => unit === thisCurrentUnit) ? "VW" : thisCurrentUnit;
    thisCurrentUnit = vhUnits.some(unit => unit === thisCurrentUnit) ? "VH" : thisCurrentUnit;
    thisConvertUnit = vwUnits.some(unit => unit === thisConvertUnit) ? "VW" : thisConvertUnit;
    thisConvertUnit = vhUnits.some(unit => unit === thisConvertUnit) ? "VH" : thisConvertUnit;


    // check if both current unit and target unit are vw units or vh units
    const isBothVwUnits = (currentUnit === "VW" && convertUnit === "VW");
    const isBothVhUnits = (currentUnit === "VH" && convertUnit === "VH");


    // if the current value is blank, return the current value
    if (currentValue === "") {
        return { values: currentValue, unit: convertUnit };
    }
    // if the current unit is the same as the target unit, return the current value
    if (currentUnit === convertUnit) {
        return { values: currentValue, unit: currentUnit };
    }
    // if both current unit and target unit are viewport width units, return the current value
    if (isBothVwUnits) {

        return { values: currentValue, unit: convertUnit };
    }
    // if both current unit and target unit are viewport height units, return the current value
    if (isBothVhUnits) {
        return { values: currentValue, unit: convertUnit };
    }

    // convert current unit value to convert unit value
    //
    const caseValue = thisCurrentUnit + "-" + thisConvertUnit;
    console.log("caseValue: " + caseValue);

    let returnValue = null;

    switch (caseValue) {
        // px to %
        case "PX-%":
            // round returned value here to keep precision while converting
            returnValue = Math.round(pxToPercentage(propertyName, currentValue));
            return { values: returnValue, unit: convertUnit };
        // px to em
        case "PX-EM":
            returnValue = Math.round(pxToEm(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // px to rem
        case "PX-REM":
            returnValue = Math.round(pxToRem(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // px to ch
        case "PX-CH":
            returnValue = Math.round(pxToCh(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // px to vw
        case "PX-VW":
            returnValue = Math.round(pxToVw(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // px to vh
        case "PX-VH":
            returnValue = Math.round(pxToVh(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // % to px
        case "%-PX":
            returnValue = Math.round(percentageToPx(propertyName, currentValue));
            return { values: returnValue, unit: convertUnit };
        // % to em
        case "%-EM":
            returnValue = Math.round(percentageToEm(propertyName, currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // % to rem
        case "%-REM":
            returnValue = Math.round(percentageToRem(propertyName, currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // % to ch
        case "%-CH":
            returnValue = Math.round(percentageToCh(propertyName, currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // % to vw
        case "%-VW":
            returnValue = Math.round(percentageToVw(propertyName, currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // % to vh
        case "%-VH":
            returnValue = Math.round(percentageToVh(propertyName, currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // em to px
        case "EM-PX":
            returnValue = Math.round(emToPx(currentValue));
            return { values: returnValue, unit: convertUnit };
        // em to %
        case "EM-%":
            returnValue = Math.round(emToPercentage(propertyName, currentValue));
            return { values: returnValue, unit: convertUnit };
        // em to rem
        case "EM-REM":
            returnValue = Math.round(emToRem(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // em to ch
        case "EM-CH":
            returnValue = Math.round(emToCh(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // em to vw
        case "EM-VW":
            returnValue = Math.round(emToVw(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // em to vh
        case "EM-VH":
            returnValue = Math.round(emToVh(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // rem to px
        case "REM-PX":
            returnValue = Math.round(remToPx(currentValue));
            return { values: returnValue, unit: convertUnit };
        // rem to %
        case "REM-%":
            returnValue = Math.round(remToPercentage(propertyName, currentValue));
            return { values: returnValue, unit: convertUnit };
        // rem to em
        case "REM-EM":
            returnValue = Math.round(remToEm(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // rem to ch
        case "REM-CH":
            returnValue = Math.round(remToCh(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // rem to vw
        case "REM-VW":
            returnValue = Math.round(remToVw(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // rem to vh
        case "REM-VH":
            returnValue = Math.round(remToVh(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // ch to px
        case "CH-PX":
            returnValue = Math.round(chToPx(currentValue));
            return { values: returnValue, unit: convertUnit };
        // ch to %
        case "CH-%":
            returnValue = Math.round(chToPercentage(propertyName, currentValue));
            return { values: returnValue, unit: convertUnit };
        // ch to em
        case "CH-EM":
            returnValue = Math.round(chToEm(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // ch to rem
        case "CH-REM":
            returnValue = Math.round(chToRem(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // ch to vw
        case "CH-VW":
            returnValue = Math.round(chToVw(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // ch to vh
        case "CH-VH":
            returnValue = Math.round(chToVh(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // vw to px
        case "VW-PX":
            returnValue = Math.round(vwToPx(currentValue));
            return { values: returnValue, unit: convertUnit };
        // vw to %
        case "VW-%":
            returnValue = Math.round(vwToPercentage(propertyName, currentValue));
            return { values: returnValue, unit: convertUnit };
        // vw to em
        case "VW-EM":
            returnValue = Math.round(vwToEm(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // vw to rem
        case "VW-REM":
            returnValue = Math.round(vwToRem(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // vw to ch
        case "VW-CH":
            returnValue = Math.round(vwToCh(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // vw to vh
        case "VW-VH":
            returnValue = Math.round(vwToVh(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // vh to px
        case "VH-PX":
            returnValue = Math.round(vhToPx(currentValue));
            return { values: returnValue, unit: convertUnit };
        // vh to %
        case "VH-%":
            returnValue = Math.round(vhToPercentage(propertyName, currentValue));
            return { values: returnValue, unit: convertUnit };
        // vh to em
        case "VH-EM":
            returnValue = Math.round(vhToEm(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // vh to rem
        case "VH-REM":
            returnValue = Math.round(vhToRem(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // vh to ch
        case "VH-CH":
            returnValue = Math.round(vhToCh(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        // vh to vw
        case "VH-VW":
            returnValue = Math.round(vhToVw(currentValue) * 100) / 100;
            return { values: returnValue, unit: convertUnit };
        default:
            return { values: currentValue, unit: currentUnit };
        // add more conditions here
    }
}

// px to a target unit
//

// px to %
function pxToPercentage(propertyName, pxValue) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;
    const selectedElement = canvasDocument.getElementById("selectedElm");
    const parentElement = selectedElement.parentElement;
    let parentSize = null;

    const isHeightProperty = ifHeightProperty(propertyName);

    if (isHeightProperty === true) {
        parentSize = parentElement.getBoundingClientRect().height;
    } else {
        parentSize = parentElement.getBoundingClientRect().width;
    }

    const percentageValue = pxValue / parentSize * 100;

    return percentageValue;
}

// px to em
function pxToEm(pxValue) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;
    const selectedElement = canvasDocument.getElementById("selectedElm");
    const parentElement = selectedElement.parentElement;
    const parentFontSize = parseFloat(getComputedStyle(parentElement).fontSize);
    console.log("parentFontSize: " + parentFontSize + "px");

    const emValue = pxValue / parentFontSize;

    return emValue;
}

// px to rem
function pxToRem(pxValue) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;
    const rootElement = canvasDocument.documentElement;
    const rootFontSize = parseFloat(getComputedStyle(rootElement).fontSize);

    const remValue = pxValue / rootFontSize;

    return remValue;
}

// px to ch
function pxToCh(pxValue) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;
    const selectedElement = canvasDocument.getElementById("selectedElm");

    const computedStyle = canvasWindow.getComputedStyle(selectedElement);
    const fontSize = parseFloat(computedStyle.fontSize);
    const fontFamily = computedStyle.fontFamily;

    const canvasTomMeasure = document.createElement("canvas");
    const ctx = canvasTomMeasure.getContext("2d");
    ctx.font = fontSize + "px " + fontFamily;

    const sampleText = "0";
    const fontWidth = ctx.measureText(sampleText).width;

    const chValue = pxValue / fontWidth;

    return chValue;
}

// px to vw, lvw, svw, dvw
function pxToVw(pxValue) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;

    const viewportWidth = canvasWindow.innerWidth || canvasDocument.documentElement.clientWidth || canvasDocument.body.clientWidth;

    const vwValue = pxValue / viewportWidth * 100;

    return vwValue;
}

// px to vh, lvh, svh, dvh
function pxToVh(pxValue) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;

    const viewportHeight = canvasWindow.innerHeight || canvasDocument.documentElement.clientHeight || canvasDocument.body.clientHeight;

    const vhValue = pxValue / viewportHeight * 100;

    return vhValue;
}


// % to a target unit
// 

// % to px
function percentageToPx(propertyName, percentValue) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;
    const selectedElement = canvasDocument.getElementById("selectedElm");
    const parentElement = selectedElement.parentElement;
    let parentSize = null;

    const isHeightProperty = ifHeightProperty(propertyName);

    if (isHeightProperty === true) {
        parentSize = parentElement.getBoundingClientRect().height;
    } else {
        parentSize = parentElement.getBoundingClientRect().width;
    }

    const pxValue = percentValue * parentSize / 100;

    return pxValue;
}


// % to em
function percentageToEm(propertyName, percentValue) {
    const pxValue = percentageToPx(propertyName, percentValue);
    const emValue = pxToEm(pxValue);

    return emValue;
}

// % to rem
function percentToRem(propertyName, percentValue) {
    const pxValue = percentageToPx(propertyName, percentValue);
    const remValue = pxToRem(pxValue);

    return remValue;
}

// % to ch
function percentageToCh(propertyName, percentValue) {
    const pxValue = percentageToPx(propertyName, percentValue);
    const chValue = pxToCh(pxValue);

    return chValue;
}
// % to vw, lvw, svw, dvw
function percentageToVw(propertyName, percentValue) {
    const pxValue = percentageToPx(propertyName, percentValue);
    const vwValue = pxToVw(pxValue);

    return vwValue;
}
// % to vh, lvh, svh, dvh
function percentageToVh(propertyName, percentValue) {
    const pxValue = percentageToPx(propertyName, percentValue);
    const vhValue = pxToVh(pxValue);

    return vhValue;
}

// em to a target unit
//

// em to px
function emToPx(emValue) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;
    const selectedElement = canvasDocument.getElementById("selectedElm");
    const parentElement = selectedElement.parentElement;
    const parentFontSize = parseFloat(getComputedStyle(parentElement).fontSize);

    const pxValue = emValue * parentFontSize;

    return pxValue;
}

// em to %
function emToPercentage(propertyName, emValue) {
    const pxValue = emToPx(emValue);
    const percentValue = pxToPercent(propertyName, pxValue);

    return percentValue;
}

// em to rem
function emToRem(emValue) {
    const pxValue = emToPx(emValue);
    const remValue = pxToRem(pxValue);

    return remValue;
}

// em to ch
function emToCh(emValue) {
    const pxValue = emToPx(emValue);

    const chValue = pxToCh(pxValue);

    return chValue;
}

// em to vw, lvw, svw, dvw
function emToVw(emValue) {
    const pxValue = emToPx(emValue);
    const vwValue = pxToVw(pxValue);

    return vwValue;
}

// em to vh, lvh, svh, dvh
function emToVh(emValue) {
    const pxValue = emToPx(emValue);
    const vhValue = pxToVh(pxValue);

    return vhValue;
}

//rem to a target units
//

// rem to px
function remToPx(remValue) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;
    const rootElement = canvasDocument.documentElement;
    const rootFontSize = parseFloat(getComputedStyle(rootElement).fontSize);

    const pxValue = remValue * rootFontSize;

    return pxValue;
}

// rem to %
function remToPercentage(propertyName, remValue) {
    const pxValue = remToPx(remValue);
    const percentValue = pxToPercent(propertyName, pxValue);

    return percentValue;
}

// rem to em
function remToEm(remValue) {
    const pxValue = remToPx(remValue);
    const emValue = pxToEm(pxValue);

    return emValue;
}

// rem to ch
function remToCh(remValue) {
    const pxValue = remToPx(remValue);
    const chValue = pxToCh(pxValue);

    return chValue;
}

// rem to vw, lvw, svw, dvw
function remToVw(remValue) {
    const pxValue = remToPx(remValue);
    const vwValue = pxToVw(pxValue);

    return vwValue;
}

// rem to vh, lvh, svh, dvh
function remToVh(remValue) {
    const pxValue = remToPx(remValue);
    const vhValue = pxToVh(pxValue);

    return vhValue;
}


//ch to a target units
//

// ch to px
function chToPx(chValue) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;
    const selectedElement = canvasDocument.getElementById("selectedElm");

    const computedStyle = canvasWindow.getComputedStyle(selectedElement);
    const fontSize = parseFloat(computedStyle.fontSize);
    const fontFamily = computedStyle.fontFamily;

    const canvasTomMeasure = document.createElement("canvas");
    const ctx = canvasTomMeasure.getContext("2d");
    ctx.font = fontSize + "px " + fontFamily;

    const sampleText = "0";
    const fontWidth = ctx.measureText(sampleText).width;

    const pxValue = chValue * fontWidth;

    return pxValue;
}

// ch to %
function chToPercentage(propertyName, chValue) {
    const pxValue = chToPx(chValue);
    const percentValue = pxToPercent(propertyName, pxValue);

    return percentValue;
}
// ch to em
function chToEm(chValue) {
    const pxValue = chToPx(chValue);
    const emValue = pxToEm(pxValue);

    return emValue;
}
// ch to rem
function chToRem(chValue) {
    const pxValue = chToPx(chValue);
    const remValue = pxToRem(pxValue);

    return remValue;
}
// ch to vw, lvw, svw, dvw
function chToVw(chValue) {
    const pxValue = chToPx(chValue);
    const vwValue = pxToVw(pxValue);

    return vwValue;
}
// ch to vh, lvh, svh, dvh
function chToVh(chValue) {
    const pxValue = chToPx(chValue);
    const vhValue = pxToVh(pxValue);

    return vhValue;
}


//(vw, lvw, svw, dvw) to a target units
//

// (vw, lvw, svw, dvw) to px
function vwToPx(vwValue) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;

    const viewportWidth = canvasWindow.innerWidth || canvasDocument.documentElement.clientWidth || canvasDocument.body.clientWidth;

    const pxValue = vwValue * viewportWidth / 100;

    return pxValue;
}

// (vw, lvw, svw, dvw) to %
function vwToPercentage(propertyName, vwValue) {
    const pxValue = vwToPx(vwValue);
    const percentValue = pxToPercent(propertyName, pxValue);

    return percentValue;
}
// (vw, lvw, svw, dvw) to em
function vwToEm(vwValue) {
    const pxValue = vwToPx(vwValue);
    const emValue = pxToEm(pxValue);

    return emValue;
}
// (vw, lvw, svw, dvw) to rem
function vwToRem(vwValue) {
    const pxValue = vwToPx(vwValue);
    const remValue = pxToRem(pxValue);

    return remValue;
}
// (vw, lvw, svw, dvw) to ch
function vwToCh(vwValue) {
    const pxValue = vwToPx(vwValue);
    const chValue = pxToCh(pxValue);

    return chValue;
}
// (vw, lvw, svw, dvw) to vh, lvh, svh, dvh
function vwToVh(vwValue) {
    const pxValue = vwToPx(vwValue);
    const vhValue = pxToVh(pxValue);

    return vhValue;
}

// (vh, lvh, svh, dvh) to a target units
//

// (vh, lvh, svh, dvh) to px
function vhToPx(vhValue) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;

    const viewportHeight = canvasWindow.innerHeight || canvasDocument.documentElement.clientHeight || canvasDocument.body.clientHeight;

    const pxValue = vhValue * viewportHeight / 100;

    return pxValue;
}

// (vh, lvh, svh, dvh) to %
function vhToPercentage(propertyName, vhValue) {
    const pxValue = vhToPx(vhValue);
    const percentValue = pxToPercent(propertyName, pxValue);

    return percentValue;
}

// (vh, lvh, svh, dvh) to em
function vhToEm(vhValue) {
    const pxValue = vhToPx(vhValue);
    const emValue = pxToEm(pxValue);

    return emValue;
}

// (vh, lvh, svh, dvh) to rem
function vhToRem(vhValue) {
    const pxValue = vhToPx(vhValue);
    const remValue = pxToRem(pxValue);

    return remValue;
}

// (vh, lvh, svh, dvh) to vw, lvw, svw, dvw
function vhToVw(vhValue) {
    const pxValue = vhToPx(vhValue);
    const vwValue = pxToVw(pxValue);

    return vwValue;
}
// (vh, lvh, svh, dvh) to ch
function vhToCh(vhValue) {
    const pxValue = vhToPx(vhValue);
    const chValue = pxToCh(pxValue);

    return chValue;
}


// util methods
//

// check if the property is a height property
function ifHeightProperty(propertyName) {
    const heightProperties = [
        "height",
        "min-height",
        "max-height",
        "margin-top",
        "margin-bottom",
        "padding-top",
        "padding-bottom",
        "VH",
    ];

    const isHeightProperty = heightProperties.some(unit => unit.includes(propertyName));
    return isHeightProperty;

    // return propertyName.includes("height") || propertyName.includes("top") || propertyName.includes("bottom") || propertyName.includes("VH");
}


//
//
//

// set css value to css editor when a element is selected

export function setCssValueToCssEditor(elm) {
    //all css property items in css editor
    const cssProperties = [
        "width",
        "height",
        "min-width",
        "min-height",
        "max-width",
        "max-height",
        //add more css properties here
    ]

    // get css value from selected element
    const cssValues = elm.ownerDocument.defaultView.getComputedStyle(elm);

    //get disabled css property list
    const elmManager = elementManagerFactory(elm);
    const enabledCssProperties = elmManager.getEnabledCssProperties();

    // console.log("cssValue: ", cssValue);
    // console.log(enabledCssProperties[cssProperties[0]]);

    cssProperties.forEach((cssProperty) => {
        //get css editor
        const targetProperty = document.getElementById(cssProperty);
        const targetValue = targetProperty.querySelectorAll('[data-css-value-type="value"]')[0];
        const targetUnit = targetProperty.querySelectorAll('[data-css-value-type="unit"]')[0];

        //fire focus event on target unit to set value to currentUnit on CssDimensionInput.svelte
        const event = new Event('focus');
        targetUnit.dispatchEvent(event);

        //
        let cssValue = cssValues[cssProperty];
        cssValue = parseCssValue(cssValue);
        console.log(cssValue);
        console.log(cssProperty + ": " + cssValue.value + cssValue.unit);

        switch (enabledCssProperties[cssProperty]) {
            case true:
                // enable input field (add later)

                //set css value to css editor
                if (cssValue.unit !== undefined) {
                    // add both css value and unit if unit value is defined
                    targetValue.value = cssValue.value;
                    targetUnit.value = cssValue.unit.toUpperCase();
                    // const event = new Event('change');
                    // targetUnit.dispatchEvent(event);


                } else {
                    // add only css value if unit value is undefined (value would be KEYWORD value such as "AUTO" and "NONE")
                    targetUnit.value = cssValue.value.toUpperCase();
                    // dispatch change event on CssDimensionInput.svelte select element to change UI 
                    const event = new Event('change');
                    targetUnit.dispatchEvent(event);
                }

                break;

            //if css property is disabled
            case false:
                // clear value and disable input field (add later)


                break;
        }


        //set css value to css editor

    });

    // get 

    // console.log("cssValue.length: ", cssValue.length);
    // console.log("cssValue.length: ", cssValue[350]);

    // // get css editor
    // const cssEditor = elm.ownerDocument.getElementById("cssEditor");

    // // set css value to css editor
    // cssEditor.value = cssValue.cssText;

}
