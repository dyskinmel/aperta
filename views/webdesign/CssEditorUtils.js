import { addCaptionToSelectedElm } from "./utils";

//
// functions called by events from CssEditor
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

    switch (caseValue) {
        // px to %
        case "PX-%":
            return { values: pxToPercentage(propertyName, currentValue), unit: convertUnit };
        // px to em
        case "PX-EM":
            return { values: pxToEm(currentValue), unit: convertUnit };
        // px to rem
        case "PX-REM":
            return { values: pxToRem(currentValue), unit: convertUnit };
        // px to ch
        case "PX-CH":
            return { values: pxToCh(currentValue), unit: convertUnit };
        // px to vw
        case "PX-VW":
            return { values: pxToVw(currentValue), unit: convertUnit };
        // px to vh
        case "PX-VH":
            return { values: pxToVh(currentValue), unit: convertUnit };
        // % to px
        case "%-PX":
            return { values: percentageToPx(propertyName, currentValue), unit: convertUnit };
        // % to em
        case "%-EM":
            return { values: percentageToEm(propertyName, currentValue), unit: convertUnit };
        // % to rem
        case "%-REM":
            return { values: percentageToRem(propertyName, currentValue), unit: convertUnit };
        // % to ch
        case "%-CH":
            return { values: percentageToCh(propertyName, currentValue), unit: convertUnit };
        // % to vw
        case "%-VW":
            return { values: percentageToVw(propertyName, currentValue), unit: convertUnit };
        // % to vh
        case "%-VH":
            return { values: percentageToVh(propertyName, currentValue), unit: convertUnit };
        // em to px
        case "EM-PX":
            return { values: emToPx(currentValue), unit: convertUnit };
        // em to %
        case "EM-%":
            return { values: emToPercentage(propertyName, currentValue), unit: convertUnit };
        // em to rem
        case "EM-REM":
            return { values: emToRem(currentValue), unit: convertUnit };
        // em to ch
        case "EM-CH":
            return { values: emToCh(currentValue), unit: convertUnit };
        // em to vw
        case "EM-VW":
            return { values: emToVw(currentValue), unit: convertUnit };
        // em to vh
        case "EM-VH":
            return { values: emToVh(currentValue), unit: convertUnit };
        // rem to px
        case "REM-PX":
            return { values: remToPx(currentValue), unit: convertUnit };
        // rem to %
        case "REM-%":
            return { values: remToPercentage(propertyName, currentValue), unit: convertUnit };
        // rem to em
        case "REM-EM":
            return { values: remToEm(currentValue), unit: convertUnit };
        // rem to ch
        case "REM-CH":
            return { values: remToCh(currentValue), unit: convertUnit };
        // rem to vw
        case "REM-VW":
            return { values: remToVw(currentValue), unit: convertUnit };
        // rem to vh
        case "REM-VH":
            return { values: remToVh(currentValue), unit: convertUnit };
        // ch to px
        case "CH-PX":
            return { values: chToPx(currentValue), unit: convertUnit };
        // ch to %
        case "CH-%":
            return { values: chToPercentage(propertyName, currentValue), unit: convertUnit };
        // ch to em
        case "CH-EM":
            return { values: chToEm(currentValue), unit: convertUnit };
        // ch to rem
        case "CH-REM":
            return { values: chToRem(currentValue), unit: convertUnit };
        // ch to vw
        case "CH-VW":
            return { values: chToVw(currentValue), unit: convertUnit };
        // ch to vh
        case "CH-VH":
            return { values: chToVh(currentValue), unit: convertUnit };
        // vw to px
        case "VW-PX":
            return { values: vwToPx(currentValue), unit: convertUnit };
        // vw to %
        case "VW-%":
            return { values: vwToPercentage(propertyName, currentValue), unit: convertUnit };
        // vw to em
        case "VW-EM":
            return { values: vwToEm(currentValue), unit: convertUnit };
        // vw to rem
        case "VW-REM":
            return { values: vwToRem(currentValue), unit: convertUnit };
        // vw to ch
        case "VW-CH":
            return { values: vwToCh(currentValue), unit: convertUnit };
        // vw to vh
        case "VW-VH":
            return { values: vwToVh(currentValue), unit: convertUnit };
        // vh to px
        case "VH-PX":
            return { values: vhToPx(currentValue), unit: convertUnit };
        // vh to %
        case "VH-%":
            return { values: vhToPercentage(propertyName, currentValue), unit: convertUnit };
        // vh to em
        case "VH-EM":
            return { values: vhToEm(currentValue), unit: convertUnit };
        // vh to rem
        case "VH-REM":
            return { values: vhToRem(currentValue), unit: convertUnit };
        // vh to ch
        case "VH-CH":
            return { values: vhToCh(currentValue), unit: convertUnit };
        // vh to vw
        case "VH-VW":
            return { values: vhToVw(currentValue), unit: convertUnit };
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
    const pxValue = percentToPx(propertyName, percentValue);
    const emValue = pxToEm(pxValue);

    return emValue;
}

// % to rem
function percentToRem(propertyName, percentValue) {
    const pxValue = percentToPx(propertyName, percentValue);
    const remValue = pxToRem(pxValue);

    return remValue;
}

// % to ch
function percentageToCh(propertyName, percentValue) {
    const pxValue = percentToPx(propertyName, percentValue);
    const chValue = pxToCh(pxValue);

    return chValue;
}
// % to vw, lvw, svw, dvw
function percentageToVw(propertyName, percentValue) {
    const pxValue = percentToPx(propertyName, percentValue);
    const vwValue = pxToVw(pxValue);

    return vwValue;
}
// % to vh, lvh, svh, dvh
function percentageToVh(propertyName, percentValue) {
    const pxValue = percentToPx(propertyName, percentValue);
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
    return propertyName.includes("height") || propertyName.includes("top") || propertyName.includes("bottom") || propertyName.includes("VH");
}