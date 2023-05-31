// Migrating to CMSClients.js
//




class CmsConnector {

}

export class ContentfulConnector extends CmsConnector {
    // Contentful

    async getContentType() {
        const url = "https://cdn.contentful.com/spaces/rvj0gs4gb6wz/environments/master/content_types?access_token=4jj76mhuV9M5drJOAwzDx6Lpuv1eN8TLE4DHc6hN4hw";
        const response = await fetch(url);
        const contentType = await response.json();
        const obj = JSON.parse(JSON.stringify(contentType));
        // console.log(obj);
        return obj;
        // fetch(url).then(response => response.json()).then(contentType => {
        //     const obj = JSON.parse(JSON.stringify(contentType));
        //     //console.log(obj);
        //     return obj;
        // });
        // .then(response => response.json())
        // .then(contentType => {
        //     const obj = JSON.parse(JSON.stringify(contentType));
        //     //console.log(obj);
        //     return obj;
        //     // let pulldownMenu = document.getElementById("contentTypes");
        //     // const ContentTypeButton = document.getElementById("getContentType");

        //     // for (i = 0; i < obj.items.length; i++) {
        //     //     const item = obj.items[i];

        //     //     let pulldownOption = document.createElement("option");
        //     //     pulldownOption.textContent = item.name;
        //     //     pulldownOption.setAttribute("id", item.sys.id);

        //     //     pulldownMenu.appendChild(pulldownOption);

        //     //     console.log(item.name);

        //     // }

        //     // ContentTypeButton.after(pulldownMenu);
        // })
    }

    async getContents(value) {

        const url = "https://cdn.contentful.com/spaces/rvj0gs4gb6wz/environments/master/entries?access_token=4jj76mhuV9M5drJOAwzDx6Lpuv1eN8TLE4DHc6hN4hw&content_type=" + value;

        const response = await fetch(url);
        const entries = await response.json();
        const obj = JSON.parse(JSON.stringify(entries));
        // console.log(obj);
        return obj;

        // fetch(url)
        //     .then(response => response.json())
        //     .then(entries => {
        //         console.log(entries);

        //     })
    }

    async getEntry(value) {
        const url = "https://cdn.contentful.com/spaces/rvj0gs4gb6wz/environments/master/entries/" + value + "?access_token=4jj76mhuV9M5drJOAwzDx6Lpuv1eN8TLE4DHc6hN4hw";
        // console.log(url);
        const response = await fetch(url);
        const entries = await response.json();
        const obj = JSON.parse(JSON.stringify(entries));
        // console.log(obj);
        return obj;
    }
}