//this js will read/write css style from/to css file and html file
import { CanvasWrapper } from "./utils.js";
import { calculate } from "specificity";



export class CssStyleReader {
    constructor() {
        //initialize

        //get canvas document
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

        this.appliedDefaultRules = null;

        //get css style sheet
        this.styleSheets = this.canvasDocument.styleSheets;
        // console.log(this.styleSheets);
        for (let i = 0; i < this.styleSheets.length; i++) {
            if (this.styleSheets[i].href.endsWith(this.defaultCssFileName)) {
                this.defaultStyleSheet = this.styleSheets[i];
                this.defaultRules = this.defaultStyleSheet.cssRules || this.defaultStyleSheet.rules;

                // console.log(this.defaultStyleSheet);
            }
            if (this.styleSheets[i].href.endsWith(this.cssFileName)) {
                this.StyleSheet = this.styleSheets[i];
                this.rules = this.StyleSheet.cssRules || this.StyleSheet.rules;

                this.getEffectiveRules(this.rules);

            }
        }
    }

    getEffectiveRules(rules) {
        // console.log(this.defaultRules);
        // console.log(this.rules);
        // let includePseudo = null;
        let effectiveRule = {};
        let effectiveRules = {};

        for (let j = 0; j < rules.length; j++) {
            rules[j].selectorToMatch = this.removePseudo(rules[j].selectorText);
            // console.log(this.removePseudo(rules[j].selectorText));
            // console.log("before :  " + rules[j].selectorText);
            // console.log("after :  " + this.removePseudo(rules[j].selectorText));
            if (this.selectedElm.matches(rules[j].selectorToMatch)) {
                // add speficity to rules
                rules[j].specificity = this.getSpecificity(rules[j].selectorText);
                effectiveRules[rules[j].selectorText] = rules[j];
                // effectiveRule = { [rules[j].selectorText]: rules[j] };
                // console.log(effectiveRule);


                // effectiveRules 
            }
        }
        console.log(effectiveRules);
    }

    getSpecificity(selectorText) {
        const result = calculate(selectorText);
        console.log(result);
        const specificityArray = result[0].specificityArray;

        const specificityValue = specificityArray[0] * 1000 + specificityArray[1] * 100 + specificityArray[2] * 10 + specificityArray[3];

        // console.log(specificityValue);
        return specificityValue;
    }

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





