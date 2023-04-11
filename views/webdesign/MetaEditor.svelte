<script>
    import CssEditor from "./CssEditor.svelte";
    import ConnectionEditor from "./ConnectionEditor.svelte";
    import MetaEditorTabs from "./MetaEditorTabs.svelte";
    let metaMenus = [
        { label: "css", value: 1, component: CssEditor },
        { label: "connection", value: 2, component: ConnectionEditor },
    ];
</script>

<MetaEditorTabs {metaMenus} />
