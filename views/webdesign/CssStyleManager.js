//this js will read/write css style from/to css file and html file



class CssStyleManager {
    //Singleton constructor
    constructor(elm) {
        if (CssStyleManager.instance == null) {

            this.styleSheets = null;

            this.cssFileName = "style.css"; //change this to get css file name from config in future
            this.cssStyleSheet = null;

            this.defaultCssFileName = "apartaDefaultStyle.css";
            this.defaultCssStyle = null;

            this.elmStyle = elm.style;
            this.elmId = elm.id;
            this.elmClassList = elm.classList;

            this.canvasDocument = elm.ownerDocument;

            //get css style sheet
            this.styleSheets = this.canvasDocument.styleSheets;
            for (let i = 0; i < styleSheet.length; i++) {
                if (styleSheet[i].href.endsWith(this.defaultCssFileName)) {
                    this.defaultStyleSheet = styleSheet[i];
                }
                if (styleSheet[i].href.endsWith(this.cssFileName)) {
                    this.cssStyleSheet = styleSheet[i];
                }
            }

            // save the singleton instance
            CssStyleManager.instance = this;

        }
        else {
            // update elm related info and return the singleton instance
            CssStyleManager.instance.style = elm.style;
            CssStyleManager.instance.elmId = elm.id;
            CssStyleManager.instance.elmClassList = elm.classList;
            return CssStyleManager.instance;
        }
    }

    insertRule(cssSelector, cssProperty, cssValue) {
        this.cssStyleSheet.insertRule(cssSelector + "{" + cssProperty + ":" + cssValue + "}", cssStyleSheet.cssRules.length);

    }

    updateCssStyleSheet() {
        //get css style sheet
        this.styleSheets = this.canvasDocument.styleSheets;
        for (let i = 0; i < styleSheet.length; i++) {
            // if (styleSheet[i].href.endsWith(this.defaultCssFileName)) {
            //     this.defaultStyleSheet = styleSheet[i];
            // }
            if (styleSheet[i].href.endsWith(this.cssFileName)) {
                this.cssStyleSheet = styleSheet[i];
            }
        }
    }
}





