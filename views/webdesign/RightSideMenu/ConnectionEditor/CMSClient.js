//working on migrating features from CMSConnector.js

class CmsClient {}

export class ContentfulClient extends CmsClient {
  constructor() {
    super();
    this.BASE_URL = "https://cdn.contentful.com";

    // TODO: change following to use environment variables in the future
    this.spaceId = "rvj0gs4gb6wz";
    this.environmentId = "master";
    this.accessToken = "";

    this.contentTypes = null;
    this.contents = null;
    this.entries = null;

    this.getApiKey();
  }

  async getApiKey() {
    const url = "http://localhost:9000/api/apiKey";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const apiKey = await response.text();
      return apiKey;
    } catch (error) {
      console.error("error:", error);
    }
  }

  async getContentType() {
    this.accessToken = await this.getApiKey();
    const url =
      "https://cdn.contentful.com/spaces/" +
      this.spaceId +
      "/environments/" +
      this.environmentId +
      "/content_types?access_token=" +
      this.accessToken;
    const response = await fetch(url);
    const contentTypeJSON = await response.json();
    this.contentTypes = JSON.parse(JSON.stringify(contentTypeJSON));
    // console.log(this.contentTypes);

    return this.contentTypes;
  }

  async getContents(contentType) {
    this.accessToken = await this.getApiKey();
    const url =
      "https://cdn.contentful.com/spaces/" +
      this.spaceId +
      "/environments/" +
      this.environmentId +
      "/entries?access_token=" +
      this.accessToken +
      "&content_type=" +
      contentType;

    const response = await fetch(url);
    const entries = await response.json();
    this.contents = JSON.parse(JSON.stringify(entries));
    // console.log(this.content);

    return this.contents;
  }

  async getEntry(content) {
    this.accessToken = await this.getApiKey();
    const url =
      "https://cdn.contentful.com/spaces/" +
      this.spaceId +
      "/environments/" +
      this.environmentId +
      "/entries/" +
      content +
      "?access_token=" +
      this.accessToken;

    const response = await fetch(url);
    const entries = await response.json();
    this.entries = JSON.parse(JSON.stringify(entries));
    // console.log(this.entries);

    return this.entries;
  }
}
