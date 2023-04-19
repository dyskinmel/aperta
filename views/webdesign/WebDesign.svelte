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
            <EditorCanvas />
        </div>
        <div class="rightSideMenu">
            <div class="metaEditorTab">
                <MetaEditor />
            </div>
        </div>
    </div>
    <div class="footer">footer</div>
</div>

<style>
    .wrapper {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        margin: 0px;
        outline: 1px solid gray;
        display: flex;
        flex-flow: column;
        overflow: hidden;
    }

    /* .wrapper {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
    } */
    .header {
        width: 100%;
        text-align: center;
        outline: 1px solid gray;
    }

    .workspace {
        /* height: 100%; */
        flex: 1;
        /* width: 100vw; */
        outline: 1px solid gray;
        display: flex;
    }

    .footer {
        width: 100%;
        text-align: center;
        outline: 1px solid gray;
    }

    /* Left Side Menu CSS */

    /* Editor CSS */

    .editor {
        /* height: 100%; */
        width: 100%;
        padding: 10px;
        outline: 1px solid gray;
        /* background-color: gray; */
    }

    /* Right side menu CSS */

    .rightSideMenu {
        height: 100%;
        /* width: 100%; */
        /* position: absolute;
    right: 0; */
        outline: 1px solid gray;
    }

    /*  */

    .metaEditorTab {
        /* height: 100%; */
        width: 225px;
    }
</style>
