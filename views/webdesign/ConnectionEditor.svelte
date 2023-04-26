<script>
    import { ContentfulConnector } from "./CMSConnector.js";
    import { CanvasWrapper } from "./utils.js";

    let contentTypes;
    let contents;
    let entries;
    let obj;

    // const getContentType = () => {
    //     const contentfulConnector = new ContentfulConnector();
    //     const data = contentfulConnector.getContentType();
    //     console.log(data);
    //     const contentTypes = document.getElementById("contentTypes");
    //     // data.items.forEach((item) => {
    //     //     const option = document.createElement("option");
    //     //     option.value = item.sys.id;
    //     //     option.text = item.name;
    //     //     contentTypes.appendChild(option);
    //     // });
    // };
</script>

<button
    id="getContentType"
    on:click={() => {
        const contentfulConnector = new ContentfulConnector();
        contentfulConnector.getContentType().then((obj) => {
            while (contentTypes.firstChild) {
                contentTypes.removeChild(contentTypes.firstChild);
            }
            for (let i = 0; i < obj.items.length; i++) {
                const option = document.createElement("option");
                option.value = obj.items[i].sys.id;
                option.text = obj.items[i].name;
                contentTypes.appendChild(option);
            }
        });
    }}>get content Type</button
>
<br />

<select bind:this={contentTypes} />
<br />
<button
    id="getContents"
    on:click={() => {
        // console.log(contentTypes.value);
        const contentfulConnector = new ContentfulConnector();
        contentfulConnector.getContents(contentTypes.value).then((obj) => {
            while (contents.firstChild) {
                contents.removeChild(contents.firstChild);
            }
            console.log(obj.items);
            for (let i = 0; i < obj.items.length; i++) {
                const option = document.createElement("option");
                option.value = obj.items[i].sys.id;
                option.text = obj.items[i].fields.title;
                contents.appendChild(option);
            }
        });
    }}>get contents</button
>

<br />
<select bind:this={contents} />
<br />

<button
    on:click={() => {
        // console.log(contents.value);
        const contentfulConnector = new ContentfulConnector();
        contentfulConnector.getEntry(contents.value).then((obj) => {
            while (entries.firstChild) {
                entries.removeChild(entries.firstChild);
            }
            console.log(Object.keys(obj.fields));
            const key = Object.keys(obj.fields);

            for (let i = 0; i < key.length; i++) {
                const option = document.createElement("option");
                option.value = obj.fields[key[i]];
                option.text = key[i];
                entries.appendChild(option);
            }

            // for (let i = 0; i < obj.fields.length; i++) {
            //     const option = document.createElement("option");
            //     option.value = obj.fields[i].name;
            //     option.text = obj.fields[i].title;
            //     entries.appendChild(option);
            // }
        });
    }}>get entries</button
>
<br />
<select bind:this={entries} />
<br />
<button
    on:click={() => {
        const canvasWrapper = new CanvasWrapper();
        const selectedElm = canvasWrapper.getSelectedElement();

        // const canvas = document.getElementById("canvas");
        // const canvasWindow = canvas.contentWindow;
        // const canvasDocument = canvasWindow.document;
        // const selectedElement = canvasDocument.getElementById("selectedElm");

        selectedElm.innerHTML = entries.value;
    }}>link contents</button
>
