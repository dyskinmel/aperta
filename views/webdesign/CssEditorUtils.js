import { addCaptionToSelectedElm } from "./utils";

export function blurWhenEnterPressed(event) {
    if (event.key === 'Enter' || event.keyCode == 13) {
        event.target.blur();
    }
}

export function applyStyleToSelectedElement(property, cssValue) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;
    const selectedElement = canvasDocument.getElementById("selectedElm");

    if (selectedElement !== null) {
        selectedElement.style[property] = cssValue;
    }

    // refresh caption and outline to reflect the change
    addCaptionToSelectedElm(selectedElement);

}

export function parseCssValue(value) {
    const patterns = [
        {
            regex: /^(\d*\.?\d+)([a-z]+|%*)$/i,
            handler: (matches) => ({
                value: parseFloat(matches[1]),
                unit: matches[2],
            }),
        },
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

export function convertCssUnits(propertyName, currentValue, currentUnit, convertUnit) {
    console.log(propertyName + ": " + currentValue + " " + currentUnit + " → " + convertUnit);
    if (currentUnit === convertUnit) {
        return { values: currentValue, unit: currentUnit };
    }



}

//px to target unit
//

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

function pxToRem(pxValue) {
    const canvas = document.getElementById("canvas");
    const canvasWindow = canvas.contentWindow;
    const canvasDocument = canvasWindow.document;
    const rootElement = canvasDocument.documentElement;
    const rootFontSize = parseFloat(getComputedStyle(rootElement).fontSize);

    const remValue = pxValue / rootFontSize;

    return remValue;
}



//percentage to target unit
// 

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

//em to target units
//



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

//rem to target units
//

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

function isHeightProperty(propertyName) {
    return propertyName.includes("height") || propertyName.includes("top") || propertyName.includes("bottom");
}