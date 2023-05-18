//working on migrating features from CMSConnector.js




class CmsClient {

}


export class ContentfulClient extends CmsClient {
    constructor() {
        super();
        this.BASE_URL = "https://cdn.contentful.com";

        // TODO: change following to use environment variables in the future
        this.SPACE_ID = "rvj0gs4gb6wz";
        this.ENVIRONMENT_ID = "master";
        this.ACCESS_TOKEN = "4jj76mhuV9M5drJOAwzDx6Lpuv1eN8TLE4DHc6hN4hw";

        this.contentTypes = null;
        this.contents = null;
        this.entries = null;
    }

    async getContentType() {
        const url = "https://cdn.contentful.com/spaces/" + this.SPACE_ID + "/environments/" + this.ENVIRONMENT_ID + "/content_types?access_token=" + this.ACCESS_TOKEN;
        const response = await fetch(url);
        const contentTypeJSON = await response.json();
        this.contentTypes = JSON.parse(JSON.stringify(contentTypeJSON));
        // console.log(this.contentTypes);

        return this.contentTypes;
    }

    async getContents(contentType) {
        const url = "https://cdn.contentful.com/spaces/" + this.SPACE_ID + "/environments/" + this.ENVIRONMENT_ID + "/entries?access_token=" + this.ACCESS_TOKEN + "&content_type=" + contentType;

        const response = await fetch(url);
        const entries = await response.json();
        this.contents = JSON.parse(JSON.stringify(entries));
        // console.log(this.content);

        return this.contents;


    }

    async getEntry(content) {
        const url = "https://cdn.contentful.com/spaces/" + this.SPACE_ID + "/environments/" + this.ENVIRONMENT_ID + "/entries/" + content + "?access_token=" + this.ACCESS_TOKEN;

        const response = await fetch(url);
        const entries = await response.json();
        this.entries = JSON.parse(JSON.stringify(entries));
        // console.log(this.entries);

        return this.entries;
    }
}