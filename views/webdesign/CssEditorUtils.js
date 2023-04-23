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
    // if the current unit is the same as the target unit, return the current value
    if (currentUnit === convertUnit) {
        return { values: currentValue, unit: currentUnit };
    }
    // add more conditions here



}

// px to a target unit
//

// to %
function pxToPercentage(propertyName, pxValue) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;
    const selectedElement = canvasDocument.getElementById("selectedElm");
    const parentElement = selectedElement.parentElement;
    let parentSize = null;

    const isHeightProperty = isHeightProperty(propertyName);

    if (isHeightProperty === true) {
        parentSize = parentElement.getBoundingClientRect().height;
    } else {
        parentSize = parentElement.getBoundingClientRect().width;
    }

    const percentageValue = pxValue / parentSize * 100;

    return percentageValue;
}

// to em
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

// to rem
function pxToRem(pxValue) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;
    const rootElement = canvasDocument.documentElement;
    const rootFontSize = parseFloat(getComputedStyle(rootElement).fontSize);

    const remValue = pxValue / rootFontSize;

    return remValue;
}

// to ch
function pxToCh(pxValue) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;
    const selectedElement = canvasDocument.getElementById("selectedElm");

    const computedStyle = canvaswindow.getComputedStyle(selectedElement);
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

// to vw
function pxToVw(pxValue) {

    const viewportWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    const vwValue = pxValue / viewportWidth * 100;

    return vwValue;
}

// to vh
function pxToVh(pxValue) {

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    const vhValue = pxValue / viewportHeight * 100;

    return vhValue;
}


// % to a target unit
// 

// to px
function percentToPx(propertyName, percentValue) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;
    const selectedElement = canvasDocument.getElementById("selectedElm");
    const parentElement = selectedElement.parentElement;
    let parentSize = null;

    const isHeightProperty = isHeightProperty(propertyName);

    if (isHeightProperty === true) {
        parentSize = parentElement.getBoundingClientRect().height;
    } else {
        parentSize = parentElement.getBoundingClientRect().width;
    }

    const pxValue = percentValue / 100 * parentSize;

    return pxValue;
}

//em to a target units
//


// to px
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

//rem to a target units
//

// to px
function remToPx(remValue) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;
    const rootElement = canvasDocument.documentElement;
    const rootFontSize = parseFloat(getComputedStyle(rootElement).fontSize);

    const pxValue = remValue * rootFontSize;

    return pxValue;
}

// util methods
//

// check if the property is a height property
function isHeightProperty(propertyName) {
    return propertyName.includes("height") || propertyName.includes("top") || propertyName.includes("bottom");
}