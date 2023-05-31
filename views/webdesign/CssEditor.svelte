<script>
    import CssMarginPadding from "./CssMarginPadding.svelte";
    import CssSizeMenu from "./CssSizeMenu.svelte";
    import CssSelectorMenu from "./CssSelectorMenu.svelte";
    import { onMount } from "svelte";
    import {
        cssStyleManager,
        cssEditMode,
        selectorToEdit,
        selectorList,
        pseudoList,
    } from "./CssStore.js";

    onMount(() => {
        document.addEventListener("elementSelected", (event) => {
            //initialize store variables when new element is selected
            cssStyleManager.update((value) => event.detail.targetStyle);
            selectorList.update((value) => $cssStyleManager.getSelectorList());
            pseudoList.update((value) => $cssStyleManager.getPseudoList());
            cssEditMode.update((value) => false);
            selectorToEdit.update((value) => "");
        });
    });

    //
    //
</script>

<CssSelectorMenu />

<CssSizeMenu />

<!-- <CssMarginPadding /> -->
