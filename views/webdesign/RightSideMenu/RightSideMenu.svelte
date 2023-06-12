<script>
    import CssEditor from "./CssEditor/CssEditor.svelte";
    import ConnectionEditor from "./ConnectionEditor/ConnectionEditor.svelte";
    import RightSideMenuTabs from "./RightSideMenuTabs.svelte";

    const rightSideMenuTabItems = [
        // add new tab here if needed
        { label: "css", value: 1, component: CssEditor },
        { label: "cms", value: 2, component: ConnectionEditor },
    ];
</script>

<RightSideMenuTabs {rightSideMenuTabItems} />
