<script>
    import CssMarginPadding from "./CssMarginPadding.svelte";
    import CssSizeMenu from "./CssSizeMenu.svelte";
    import CssSelectorMenu from "./CssSelectorMenu.svelte";
    import { onMount } from "svelte";
    import {
        cssStyleReader,
        cssEditMode,
        selectorToEdit,
        selectorList,
        pseudoList,
    } from "./CssStore.js";

    // let cssStyleReader = null;

    onMount(() => {
        document.addEventListener("elementSelected", (event) => {
            //initialize store variables when new element is selected
            cssStyleReader.update((value) => event.detail.targetStyle);
            selectorList.update((value) => $cssStyleReader.getSelectorList());
            pseudoList.update((value) => $cssStyleReader.getPseudoList());
            cssEditMode.update((value) => false);
            selectorToEdit.update((value) => "");

            // cssStyleReader = event.detail.targetStyle;
            // console.log($cssStyleReader);
            // console.log($selectorList);

            // console.log($pseudoList);
            // $cssStyleReader.getSelectorList();
        });
    });

    //
    //
</script>

<CssSelectorMenu />

<CssSizeMenu />

<!-- <CssMarginPadding /> -->
