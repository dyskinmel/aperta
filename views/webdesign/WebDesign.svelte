<script>
    import LeftSideMenu from "./ LeftSideMenu.svelte";
    import EditorCanvas from "./EditorCanvas.svelte";
    import MetaEditor from "./MetaEditor.svelte";

    let message = "Hello from Svelte!";
</script>

<div class="wrapper">
    <div class="header">Header</div>
    <div class="workspace">
        <div class="leftSideMenu">
            <LeftSideMenu />
        </div>
        <div class="editor">
            <!-- <div class="canvas" id="canvas">editor</div> -->
            <EditorCanvas />
        </div>
        <div class="rightSideMenu">
            <div class="metaEditorTab">
                <MetaEditor />
                <!-- <input
                    id="cssEditor"
                    type="radio"
                    name="tab_menu"
                    checked
                /><label class="tab_menu" for="cssEditor">cssEdi</label>
                <input
                    id="connectionEditor"
                    type="radio"
                    name="tab_menu"
                /><label class="tab_menu" for="connectionEditor">conEdi</label>

                <div class="tab_contents" id="cssEditor">コンテンツ内容１</div>
                <div class="tab_contents" id="connectionEditor">
                    コンテンツ内容2
                    <button id="getContentType" onclick="getContentType()"
                        >get content type</button
                    >
                    <br />
                    <select name="contentType" id="contentTypes" />
                    <button id="getContents" onclick="getContents()"
                        >get contents</button
                    >
                </div> -->
            </div>
        </div>
    </div>
    <div class="footer">footer</div>
</div>

<style>
    .wrapper {
        /* @include box-sizing(border-box); */
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        /* padding: 0px 0px 0px; */
        margin: 0;
        outline: 1px solid gray;
        display: flex;
        flex-flow: column;
    }

    .header {
        width: 100%;
        text-align: center;
        outline: 1px solid gray;
    }

    .workspace {
        height: 100%;
        outline: 1px solid gray;
        display: flex;
    }

    .footer {
        width: 100%;
        text-align: center;
        outline: 1px solid gray;
    }

    /* Left Side Menu CSS */

    /* .leftSideMenu {
        height: 100%;
        display: inline-flex;
        outline: 1px solid gray;
    }

    .leftNavigation {
        height: 100%;
        outline: 1px solid gray;
    }

    .leftNavigation > img {
        width: 30px;
        margin: 4px 2px;
        display: block;
    }

    .leftMenuPane {
        height: 100%;
        display: block;
        outline: 1px solid gray;
    } */

    /* .elementMenu {
        height: 100%;
        display: block;
        outline: 1px solid gray;
    }

    .menuTitle {
        white-space: nowrap;
    }

    .groupName {
        outline: 1px solid gray;
    } */

    /* .elementItem {
        font-size: 13px;
        text-align: center;
        vertical-align: middle;
        width: 70px;
        height: 70px;
        outline: 1px solid gray;
    } */

    /* Editor CSS */

    .editor {
        /* height: 100%; */
        width: 100%;
        padding: 10px;
        outline: 1px solid gray;
        /* background-color: gray; */
    }

    /* .canvasItem {
    outline: none;
} */

    /* .hover {
        box-sizing: border-box;
        outline: 1px solid rgb(48, 165, 249);
    }

    .selected {
        box-sizing: border-box;
        outline: 1px solid rgb(0, 120, 206);
    }

    .isAtTop {
        border-top: 2px solid rgb(0, 120, 206);
    }

    .middle {
        border: 2px solid rgb(0, 120, 206);
    }

    .isAtBottom {
        border-bottom: 2px solid rgb(0, 120, 206);
    } */

    /* Right side menu CSS */

    .rightSideMenu {
        height: 100%;
        /* position: absolute;
    right: 0; */
        outline: 1px solid gray;
    }

    /*  */

    .metaEditorTab {
        /* height: 100%; */
        width: 225px;
    }

    /* input[name="tab_menu"] {
        display: none;
    }

    .tab_contents {
        display: none;
        height: 100%;
        outline: 1px solid black;
    }

    #cssEditor:checked ~ #cssEditor,
    #connectionEditor:checked ~ #connectionEditor {
        display: block;
    }

    .metaEditorTab input:checked + .tab_menu {
        background-color: #1f71b5;
        color: #fff;
    } */
</style>
