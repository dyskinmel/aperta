//this js will read/write css style from/to css file and html file
import { CanvasWrapper } from "./utils.js";



export class CssStyleReader {
    constructor() {
        //initialize

        //
        this.idSelectorPattern = /^#[-\w]+$/;
        this.classSelectorPattern = /^\.-\w+$/;
        this.attributeSelectorPattern = /^\[.+\]$/;
        this.tagSelectorPattern = /^[-\w]+$/;
        this.pseudoClassPattern = /^[-\w]+:[-\w]+$/;
        this.pseudoElementPattern = /^[-\w]+::[-\w]+$/;


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
        this.idRules = null;
        this.classRules = null;
        this.tagNameRules = null;


        this.defaultCssFileName = "apertaDefault.css";
        this.defaultStyleSheet = null;
        this.defaultRules = null;

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
            }
        }
    }

    getAppliedRule() {
        // console.log(this.defaultRules);
        console.log(this.rules["0"].selectorText);

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





