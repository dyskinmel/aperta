<script>
    import CssEditor from "./CssEditor.svelte";
    import ConnectionEditor from "./ConnectionEditor.svelte";
    import RightSideMenuTabs from "./RightSideMenuTabs.svelte";

    let rightSideMenuTabItems = [
        // add new tab here
        { label: "css", value: 1, component: CssEditor },
        { label: "cms", value: 2, component: ConnectionEditor },
    ];
</script>

<RightSideMenuTabs {rightSideMenuTabItems} />
