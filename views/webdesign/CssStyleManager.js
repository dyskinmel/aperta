//this js will read/write css style from/to css file and html file
import { CanvasWrapper } from "./utils.js";
import { calculate } from "specificity";



export class CssStyleReader {
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
        this.StyleSheet = null;
        this.rules = null;

        this.effectiveRules = null;
        // this.rulesWithPseudo = null;

        this.defaultCssFileName = "apertaDefault.css";
        this.defaultStyleSheet = null;
        this.defaultRules = null;
        this.effectiveDefaultRules = null;

        // console.log(this.selectedElm.style.length);
        // this.getAppliedRule("height");


        //get css style from style sheet
        //
        this.styleSheets = this.canvasDocument.styleSheets;
        // console.log(this.styleSheets);
        for (let i = 0; i < this.styleSheets.length; i++) {
            if (this.styleSheets[i].href.endsWith(this.defaultCssFileName)) {
                this.defaultStyleSheet = this.styleSheets[i];
                this.defaultRules = this.defaultStyleSheet.cssRules || this.defaultStyleSheet.rules;

                this.effectiveDefaultRules = this.getEffectiveRules(this.defaultRules);

                // console.log(this.defaultStyleSheet);
            }
            if (this.styleSheets[i].href.endsWith(this.cssFileName)) {
                this.StyleSheet = this.styleSheets[i];
                this.rules = this.StyleSheet.cssRules || this.StyleSheet.rules;

                this.effectiveRules = this.getEffectiveRules(this.rules);

            }
        }
    }

    // return applied css style of propety, selector and if !important is set
    getAppliedRule(propertyName) {
        // console.log(propertyName);
        // console.log(this.effectiveRules);
        // console.log(Object.keys(this.effectiveRules));
        let objectKeys = null;

        let isAppliedImportant = false;
        let appliedSpecificity = 0;
        let appliedPropertyValue = null;
        let appliedSelector = null;
        let appliedRule = null;




        // check css style and get property with highest priority (considering specificity and !important)
        //
        objectKeys = Object.keys(this.effectiveRules);
        for (let i = 0; i < objectKeys.length; i++) {

            //ignore if ObjectKeys and selectorToMatch are not the same (ignore selector with pseudo elements and classes)
            if (objectKeys[i] === this.effectiveRules[objectKeys[i]].selectorToMatch) {
                // console.log(this.effectiveRules[objectKeys[i]]);
                const propertyValue = this.effectiveRules[objectKeys[i]].style[propertyName];

                // if propertyValue is not empty, check if !important is set
                if (propertyValue !== "") {
                    const propertySpecificity = this.effectiveRules[objectKeys[i]].specificity;
                    const isImportant = this.isImportant(this.effectiveRules[objectKeys[i]].style, propertyName);
                    // console.log(objectKeys[i] + ":  " + propertyName + ":  " + propertyValue + " isImportant: " + isImportant);


                    // when both rules have !important, check which rule has higher specificity
                    if (isImportant && isAppliedImportant) {
                        if (appliedSpecificity <= propertySpecificity) {
                            appliedSelector = objectKeys[i];
                            appliedPropertyValue = propertyValue;
                            isAppliedImportant = isImportant;
                            appliedSpecificity = propertySpecificity;
                            appliedRule = this.effectiveRules[objectKeys[i]];
                        }
                    }
                    //if previous rule does not have !important, and current rule has !important, set the current rule as applied rule
                    else if (isImportant && !isAppliedImportant) {
                        appliedSelector = objectKeys[i];
                        appliedPropertyValue = propertyValue;
                        isAppliedImportant = isImportant;
                        appliedSpecificity = propertySpecificity;
                        appliedRule = this.effectiveRules[objectKeys[i]];
                    }
                    // if both rules do not have !important, check which rule has higher specificity
                    else if (!isImportant && !isAppliedImportant) {
                        if (appliedSpecificity <= propertySpecificity) {
                            appliedSelector = objectKeys[i];
                            appliedPropertyValue = propertyValue;
                            isAppliedImportant = isImportant;
                            appliedSpecificity = propertySpecificity;
                            appliedRule = this.effectiveRules[objectKeys[i]];
                        }
                    }
                    // if previous rule has !important, ignore the new rule

                }
            }
        }
        // console.log("Selector:  " + appliedSelector + "  propertyName:  " + propertyName + ":  propertyValue:  " + appliedPropertyValue + "  isAppliedImportant:  " + isAppliedImportant);


        // check element inline style and get property with highest priority (considering !important)
        // (consider to bring this to top of the function to avoid checking inline style if css style has !important)
        const propertyValue = this.selectedElm.style[propertyName];
        if (propertyValue !== "") {
            const isImportant = this.isImportant(this.selectedElm.style, propertyName);

            //if rule from css style sheet has !important and inline style does not have !important, keep the rule from css style sheet
            if (isAppliedImportant && !isImportant) {
                //do nothing
            }
            // else set inline style as applied style
            else {
                appliedSelector = "inlineStyle";
                appliedPropertyValue = propertyValue;
                isAppliedImportant = isImportant;
                appliedRule = this.selectedElm.style;
            }
            //
        }
        // console.log("Selector:  " + appliedSelector + "  propertyName:  " + propertyName + ":  propertyValue:  " + appliedPropertyValue + "  isAppliedImportant:  " + isAppliedImportant);
        // console.log(this.selectedElm.style);


        // check default css rule if no element style and css rule to apply
        //
        if (appliedPropertyValue === null) {
            objectKeys = Object.keys(this.effectiveDefaultRules);
            for (let i = 0; i < objectKeys.length; i++) {
                const propertyValue = this.effectiveDefaultRules[objectKeys[i]].style[propertyName];
                if (propertyValue !== "") {
                    const propertySpecificity = this.effectiveDefaultRules[objectKeys[i]].specificity;
                    const isImportant = this.isImportant(this.effectiveDefaultRules[objectKeys[i]].style, propertyName);
                    // console.log(objectKeys[i] + ":  " + propertyName + ":  " + propertyValue + " isImportant: " + isImportant);
                    if (appliedSpecificity <= propertySpecificity) {
                        appliedSelector = objectKeys[i];
                        appliedPropertyValue = propertyValue;
                        isAppliedImportant = isImportant;
                        appliedSpecificity = propertySpecificity;
                        appliedRule = this.effectiveDefaultRules[objectKeys[i]];
                    }
                }
                // const propertyValue = this.effectiveDefaultRules[propertyName];
                // console.log(this.effectiveDefaultRules);

            }
        }
        console.log("Selector:  " + appliedSelector + "  propertyName:  " + propertyName + ":  propertyValue:  " + appliedPropertyValue + "  isAppliedImportant:  " + isAppliedImportant);






    }

    // bool 
    isImportant(cssStyle, propertyName) {
        const priority = cssStyle.getPropertyPriority(propertyName);
        return priority === 'important';
        // return {
        //     value: propertyValue,
        //     important: priority === 'important',
        // };
    }

    getEffectiveRules(rules) {
        // console.log(this.defaultRules);
        // console.log(this.rules);
        // let includePseudo = null;
        let effectiveRules = {};

        for (let j = 0; j < rules.length; j++) {
            // set selectorText without pseudo element and class
            rules[j].selectorToMatch = this.removePseudo(rules[j].selectorText);

            if (this.selectedElm.matches(rules[j].selectorToMatch)) {
                // add speficity to rules
                rules[j].specificity = this.getSpecificity(rules[j].selectorText);
                effectiveRules[rules[j].selectorText] = rules[j];
                // effectiveRule = { [rules[j].selectorText]: rules[j] };
                // console.log(effectiveRule);


                // effectiveRules 
            }
        }
        // console.log(effectiveRules);
        // console.log(Object.keys(effectiveRules));
        return effectiveRules;
    }

    getSpecificity(selectorText) {
        const result = calculate(selectorText);
        // console.log(result);
        const specificityArray = result[0].specificityArray;
        const specificityValue = specificityArray[0] * 1000 + specificityArray[1] * 100 + specificityArray[2] * 10 + specificityArray[3];

        return specificityValue;
    }



    // isInlineStyleImportant() {
    //     const importantFlag = "!important";
    //     if (propertyValue.includes(importantFlag)) {
    //         console.log(propertyValue);
    //         importantRule = propertyValue.replace(importantFlag, "").trim();
    //     }

    // }


    removePseudo(selectorText) {
        const pseudoElementRegex = /::(before|after|first-letter|first-line|selection|backdrop|placeholder|marker|spelling-error|grammar-error)/i;
        const pseudoClassRegex = /:(active|hover|focus|visited|link|enabled|disabled|checked|indeterminate|valid|invalid|required|optional|read-only|read-write|first-child|last-child|nth-child|nth-last-child|first-of-type|last-of-type|nth-of-type|nth-last-of-type|only-child|only-of-type|target|root|empty|not|lang|dir|is|where|has|scope|fullscreen|current|past|future)/i;

        const cleanedSelector = selectorText
            .replace(pseudoElementRegex, '')
            .replace(pseudoClassRegex, '');

        return cleanedSelector.trim();
        // const includePseudo = selectorText != cleanedSelector;
        // return cleanedSelector.trim(), includePseudo;
    }
}



// export class CssStyleManager {
//     //Singleton constructor
//     constructor() {
//         if (CssStyleManager.instance == null) {
//             //initialize

//             //get canvas document
//             this.canvasWrapper = new CanvasWrapper();
//             console.log(this.canvasWrapper);
//             this.canvasDocument = this.canvasWrapper.getCanvasDocument();
//             this.selectedElm = this.canvasWrapper.getSelectedElement();

//             //set element related variables
//             this.elmStyle = this.selectedElm.style;
//             this.elmId = this.selectedElm.id;
//             this.elmClassList = this.selectedElm.classList;

//             //initialize style sheets related variables
//             this.styleSheets = null;

//             this.cssFileName = "style.css"; //change this to get css file name from config in future
//             this.cssStyleSheet = null;

//             this.defaultCssFileName = "apertaDefaultStyle.css";
//             this.defaultCssStyle = null;

//             //get css style sheet
//             this.styleSheets = this.canvasDocument.styleSheets;
//             for (let i = 0; i < this.styleSheets.length; i++) {
//                 if (this.styleSheets[i].href.endsWith(this.defaultCssFileName)) {
//                     this.defaultStyleSheet = this.styleSheets[i];
//                 }
//                 if (this.styleSheets[i].href.endsWith(this.cssFileName)) {
//                     this.cssStyleSheet = this.styleSheets[i];
//                 }
//             }

//             // save the singleton instance
//             CssStyleManager.instance = this;

//         }
//         else {
//             // update elm related info and return the singleton instance

//             console.log(this.canvasWrapper);
//             // if (this.CanvasWrapper.isSelectedElement(this.selectedElm) == false) {
//             //     this.CanvasWrapper = new CanvasWrapper();
//             //     this.selectedElm = this.CanvasWrapper.getSelectedElement();
//             //     CssStyleManager.instance.style = this.selectedElm.style;
//             //     CssStyleManager.instance.elmId = this.selectedElm.id;
//             //     CssStyleManager.instance.elmClassList = this.selectedElm.classList;
//             // }
//             return CssStyleManager.instance;
//         }
//     }

//     insertRule(cssSelector, cssProperty, cssValue) {
//         this.cssStyleSheet.insertRule(cssSelector + "{" + cssProperty + ":" + cssValue + "}", cssStyleSheet.cssRules.length);

//     }

//     getAppliedRule() {
//         console.log(this.defaultCssStyle);

//     }




//     // updateCssStyleSheet() {
//     //     //get css style sheet
//     //     this.styleSheets = this.canvasDocument.styleSheets;
//     //     for (let i = 0; i < styleSheet.length; i++) {
//     //         // if (styleSheet[i].href.endsWith(this.defaultCssFileName)) {
//     //         //     this.defaultStyleSheet = styleSheet[i];
//     //         // }
//     //         if (styleSheet[i].href.endsWith(this.cssFileName)) {
//     //             this.cssStyleSheet = styleSheet[i];
//     //         }
//     //     }
//     // }
// }





