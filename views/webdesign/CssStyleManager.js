//this js will read/write css style from/to css file and html file
import { CanvasWrapper } from "./utils.js";
import { calculate } from "specificity";
import { addCaptionToSelectedElm } from "./utils";


// export class CssStyleManager {
export class CssStyleManager {
    constructor() {
        //initialize

        //get canvas document and selected element
        this.canvasWrapper = new CanvasWrapper();

        this.canvasDocument = this.canvasWrapper.getCanvasDocument();
        this.selectedElm = this.canvasWrapper.getSelectedElement();

        //set element related variables
        this.elmStyle = this.selectedElm.style;
        this.elmId = this.selectedElm.id;
        this.elmClassList = this.selectedElm.classList;
        this.elmTagName = this.selectedElm.tagName;

        //initialize style sheets related variables
        this.styleSheets = null;

        this.cssFileName = "style.css"; //change this to get css file name from config in future
        this.styleSheet = null;
        this.rules = null;

        this.effectiveRules = null;
        // this.rulesWithPseudo = null;

        this.defaultCssFileName = "apertaDefault.css";
        this.defaultStyleSheet = null;
        this.defaultRules = null;
        this.effectiveDefaultRules = null;

        //
        this.selectorList = {};
        this.pseudoList = {};

        //get css style from style sheet
        //
        this.styleSheets = this.canvasDocument.styleSheets;
        // console.log(this.styleSheets);
        for (let i = 0; i < this.styleSheets.length; i++) {
            if (this.styleSheets[i].href.endsWith(this.defaultCssFileName)) {
                this.defaultStyleSheet = this.styleSheets[i];
                this.defaultRules = this.defaultStyleSheet.cssRules || this.defaultStyleSheet.rules;

                //get effective css rules from default css file
                this.effectiveDefaultRules = this.getEffectiveRules(this.defaultRules);

                // console.log(this.defaultStyleSheet);
            }
            if (this.styleSheets[i].href.endsWith(this.cssFileName)) {
                this.styleSheet = this.styleSheets[i];
                this.rules = this.styleSheet.cssRules || this.styleSheet.rules;

                //get effective css rules from user defined css file
                this.effectiveRules = this.getEffectiveRules(this.rules);

            }
        }
    }

    // return applied css style of propety, selector and if !important is set
    getAppliedRule(propertyName) {
        let objectKeys = null;

        let isAppliedImportant = false;
        let appliedSpecificity = 0;
        let appliedPropertyValue = null;
        let appliedSelector = null;
        let appliedColor = null;
        let appliedRule = null;


        // check element inline style and set value if it has property value
        // 
        const propertyValue = this.selectedElm.style[propertyName];
        if (propertyValue !== "") {
            const isImportant = this.isImportant(this.selectedElm.style, propertyName);

            appliedSelector = "inline";
            appliedColor = "#0000FF";
            appliedPropertyValue = propertyValue;
            isAppliedImportant = isImportant;
            appliedRule = this.selectedElm.style;
        }
        // console.log("Selector:  " + appliedSelector + "  propertyName:  " + propertyName + ":  propertyValue:  " + appliedPropertyValue + "  isAppliedImportant:  " + isAppliedImportant);
        // console.log(this.selectedElm.style);


        // check css style and get property with highest priority (considering specificity and !important)
        //

        // consider to change this part of code to support multiple css files in the future
        objectKeys = Object.keys(this.effectiveRules);
        if (appliedPropertyValue === null) {
            // for (let i = objectKeys.length / 2 - 1; i >= 0; i--) {
            for (let i = 0; i < objectKeys.length / 2; i++) {
                const stringKey = this.effectiveRules[i];
                const selectorText = this.effectiveRules[stringKey].selectorText;
                const selectorToMatch = this.effectiveRules[stringKey].selectorToMatch;

                //ignore if ObjectKeys and selectorToMatch are not the same (ignore selector with pseudo elements and classes)
                if (selectorText === selectorToMatch) {
                    // console.log(this.effectiveRules[objectKeys[i]]);
                    const propertyValue = this.effectiveRules[stringKey].style[propertyName];


                    // if propertyValue is not empty, check if !important is set
                    if (propertyValue !== "") {
                        const propertySpecificity = this.effectiveRules[stringKey].specificity;
                        const isImportant = this.isImportant(this.effectiveRules[stringKey].style, propertyName);
                        const selectorColor = this.effectiveRules[stringKey].color;

                        // when both rules have !important, check which rule has higher specificity
                        if (isImportant && isAppliedImportant) {
                            if (appliedSpecificity <= propertySpecificity) {
                                appliedSelector = selectorText;
                                appliedColor = selectorColor;
                                appliedPropertyValue = propertyValue;
                                isAppliedImportant = isImportant;
                                appliedSpecificity = propertySpecificity;
                                appliedRule = this.effectiveRules[stringKey];
                            }
                        }
                        //if previous rule does not have !important, and current rule has !important, set the current rule as applied rule
                        else if (isImportant && !isAppliedImportant) {
                            appliedSelector = selectorText;
                            appliedColor = selectorColor;
                            appliedPropertyValue = propertyValue;
                            isAppliedImportant = isImportant;
                            appliedSpecificity = propertySpecificity;
                            appliedRule = this.effectiveRules[stringKey];
                        }
                        // if both rules do not have !important, check which rule has higher specificity
                        else if (!isImportant && !isAppliedImportant) {
                            if (appliedSpecificity <= propertySpecificity) {
                                appliedSelector = selectorText;
                                appliedColor = selectorColor;
                                appliedPropertyValue = propertyValue;
                                isAppliedImportant = isImportant;
                                appliedSpecificity = propertySpecificity;
                                appliedRule = this.effectiveRules[stringKey];
                            }
                        }
                        // if previous rule has !important, ignore the new rule

                    }
                }
            }
        }
        // console.log("Selector:  " + appliedSelector + "  propertyName:  " + propertyName + ":  propertyValue:  " + appliedPropertyValue + "  isAppliedImportant:  " + isAppliedImportant);


        // check default css rule if no element style and css rule to apply
        //

        if (appliedPropertyValue === null) {
            objectKeys = Object.keys(this.effectiveDefaultRules);
            // console.log(objectKeys);
            // for (let i = objectKeys.length / 2 - 1; i >= 0; i--) {
            for (let i = 0; i < objectKeys.length / 2; i++) {
                const stringKey = this.effectiveDefaultRules[i];
                const selectorText = this.effectiveDefaultRules[stringKey].selectorText;
                const propertyValue = this.effectiveDefaultRules[stringKey].style[propertyName];
                if (propertyValue !== "") {
                    const propertySpecificity = this.effectiveDefaultRules[stringKey].specificity;
                    const isImportant = this.isImportant(this.effectiveDefaultRules[stringKey].style, propertyName);
                    // console.log(objectKeys[i] + ":  " + propertyName + ":  " + propertyValue + " isImportant: " + isImportant);
                    if (appliedSpecificity <= propertySpecificity) {
                        appliedSelector = selectorText;
                        appliedPropertyValue = propertyValue;
                        isAppliedImportant = isImportant;
                        appliedSpecificity = propertySpecificity;
                        appliedRule = this.effectiveDefaultRules[stringKey];
                    }
                }
                // const propertyValue = this.effectiveDefaultRules[propertyName];
                // console.log(this.effectiveDefaultRules);

            }
        }

        //
        // TODO: Add feature to check if the property is inherited in the future
        //
        //


        return { appliedSelector, appliedPropertyValue, isAppliedImportant, appliedColor };
    }

    getRuleBySelectorAndPropertyName(selector, propertyName) {
        let isImportant = false;
        let propertyValue = null;
        // let selector = null;
        let color = null;
        // let Rule = null;

        if (selector === "inline") {
            // console.log("inline");
            propertyValue = this.selectedElm.style[propertyName];
            if (propertyValue !== "") {
                isImportant = this.isImportant(this.selectedElm.style, propertyName);

                // selector = "inline";
                color = "#0000FF";
                // propertyValue = propertyValue;
                // isImportant = isImportant;
                // Rule = this.selectedElm.style;
            }
        } else {
            propertyValue = this.effectiveRules[selector].style[propertyName];
            if (propertyValue !== "") {
                color = this.effectiveRules[selector].color;
                // selector = this.effectiveRules[selector].selectorText;
                isImportant = this.isImportant(this.effectiveRules[selector].style, propertyName);

                // console.log(this.effectiveRules[selector]);
            }
        }

        // console.log("Selector: " + selector + "  propertyName: " + propertyName + "  PropertyValue: " + propertyValue + "  isImportant: " + isImportant);
        return { propertyName, propertyValue, isImportant, color };
    }


    getEffectiveRules(rules) {
        // console.log(this.defaultRules);
        // console.log(this.rules);
        // let includePseudo = null;
        let effectiveRules = {};
        let numberOfRules = 0;

        this.selectorList = {
            0: "inline",
            "inline": {
                color: "#0000FF",
            },
        };
        this.pseudoList = {};
        let selectorIndex = 1;
        let pseudoIndex = 0;

        for (let j = 0; j < rules.length; j++) {
            // set selectorText without pseudo element and class
            rules[j].selectorToMatch = this.removePseudo(rules[j].selectorText);

            if (this.selectedElm.matches(rules[j].selectorToMatch)) {
                // add speficity to rules to find property with the highest priority
                rules[j].specificity = this.getSpecificity(rules[j].selectorText);

                // add color to rules to use in the cssEditor
                rules[j].color = this.getTagColor(numberOfRules);


                if (rules[j].selectorText === rules[j].selectorToMatch) {
                    this.selectorList[selectorIndex] = rules[j].selectorText;
                    this.selectorList[rules[j].selectorText] = { color: rules[j].color };
                    selectorIndex++;
                } else {
                    this.pseudoList[pseudoIndex] = rules[j].selectorText;
                    this.pseudoList[rules[j].selectorText] = { color: rules[j].color };
                    pseudoIndex++;
                }

                effectiveRules[numberOfRules] = rules[j].selectorText;
                effectiveRules[rules[j].selectorText] = rules[j];
                numberOfRules++;
            }
        }
        return effectiveRules;
    }

    getSelectorList() {
        return this.selectorList;
    }

    getPseudoList() {
        return this.pseudoList;
    }

    getTagColor(i) {
        const tagColors = ["#FFA500", "#FF0000", "#008000", "#FFFF00", "#800080", "#00FFFF", "#FF00FF"];

        if (i < tagColors.length) {
            return tagColors[i];
        } else {
            return generateRandomColor();
        }
    }

    // get specificity of a selector
    getSpecificity(selectorText) {
        const result = calculate(selectorText);
        // console.log(result);
        const specificityArray = result[0].specificityArray;
        const specificityValue = specificityArray[0] * 1000 + specificityArray[1] * 100 + specificityArray[2] * 10 + specificityArray[3];

        return specificityValue;
    }

    // setter
    // 

    setRule(selector, propertyName, cssValue) {
        if (selector === "inline") {
            this.selectedElm.style[propertyName] = cssValue;
        } else {
            for (let i = 0; i < this.rules.length; i++) {
                const rule = this.rules[i];
                if (rule.selectorText === selector) {
                    rule.style[propertyName] = cssValue;
                    this.styleSheet.deleteRule(i);
                    this.styleSheet.insertRule(rule.cssText, i);
                }
            }
        }
        // update caption of selected element to apply the change
        addCaptionToSelectedElm(this.selectedElm);
        // update effectiveRules
        this.effectiveRules = this.getEffectiveRules(this.rules);
    }


    // bool functions 
    //

    isImportant(cssStyle, propertyName) {
        const priority = cssStyle.getPropertyPriority(propertyName);
        return priority === 'important';
    }

    // utility functions
    //

    removePseudo(selectorText) {
        const pseudoElementRegex = /::(before|after|first-letter|first-line|selection|backdrop|placeholder|marker|spelling-error|grammar-error)/i;
        const pseudoClassRegex = /:(?:(?:active|hover|focus|visited|link|enabled|disabled|checked|indeterminate|valid|invalid|required|optional|read-only|read-write|first-child|last-child|nth-child|nth-last-child|first-of-type|last-of-type|nth-of-type|nth-last-of-type|only-child|only-of-type|target|root|empty|not|lang|dir|is|where|has|scope|fullscreen|current|past|future)(?:\(.*?\))?)/gi;
        // const pseudoClassRegex = /:(active|hover|focus|visited|link|enabled|disabled|checked|indeterminate|valid|invalid|required|optional|read-only|read-write|first-child|last-child|nth-child|nth-last-child|first-of-type|last-of-type|nth-of-type|nth-last-of-type|only-child|only-of-type|target|root|empty|not|lang|dir|is|where|has|scope|fullscreen|current|past|future)/i;

        const cleanedSelector = selectorText
            .replace(pseudoElementRegex, '')
            .replace(pseudoClassRegex, '');

        return cleanedSelector.trim();
    }

    hslToRgb(h, s, l) {
        let r, g, b;

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    generateRandomColor() {
        // hue (0-360)
        const hue = Math.random();

        // saturation (30-100)
        const saturation = Math.random() * (100 - 30 + 1) + 30;

        // lightness (30-70)
        const lightness = Math.random() * (70 - 30 + 1) + 30;

        const [r, g, b] = hslToRgb(hue, saturation / 100, lightness / 100);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
}
