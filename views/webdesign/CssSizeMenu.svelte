<script>
    import CssDimensionInput from "./CssDimensionInput.svelte";
    // import CssSizeMenuItem from "./CssSizeMenuItem.svelte";

    // declare menu items which will be passed to CssDimensionInput to create the inputs
    const menuItems = [
        {
            label: "Width",
            value: "width",
            options: [
                "PX",
                "%",
                "EM",
                "REM",
                "CH",
                "VW",
                "VH",
                "DVW",
                "DVH",
                "AUTO",
            ],
        },
        {
            label: "Height",
            value: "height",
            options: [
                "PX",
                "%",
                "EM",
                "REM",
                "CH",
                "VW",
                "VH",
                "DVW",
                "DVH",
                "AUTO",
            ],
        },
        {
            label: "Min W",
            value: "min-width",
            options: [
                "PX",
                "%",
                "EM",
                "REM",
                "CH",
                "VW",
                "VH",
                "DVW",
                "DVH",
                "AUTO",
            ],
        },
        {
            label: "Min H",
            value: "min-height",
            options: [
                "PX",
                "%",
                "EM",
                "REM",
                "CH",
                "VW",
                "VH",
                "DVW",
                "DVH",
                "AUTO",
            ],
        },
        {
            label: "Max W",
            value: "max-width",
            options: [
                "PX",
                "%",
                "EM",
                "REM",
                "CH",
                "VW",
                "VH",
                "DVW",
                "DVH",
                "NONE",
            ],
        },
        {
            label: "Max H",
            value: "max-height",
            options: [
                "PX",
                "%",
                "EM",
                "REM",
                "CH",
                "VW",
                "VH",
                "DVW",
                "DVH",
                "NONE",
            ],
        },
    ];

    // declare isOpen and toggle function to toggle the menu
    let isOpen = true;
    const toggle = () => {
        isOpen = !isOpen;
    };

    //
</script>

<div class="cssSizeMenuFrame">
    <div class="cssSizeMenuHeader">
        <button
            on:click={toggle}
            aria-expanded={isOpen}
            class="cssSizeMenuLabel"
        >
            <svg
                style="tran"
                width="15"
                height="15"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
            >
            Size
        </button>
    </div>

    <div class="cssSizeMenu {isOpen ? '' : 'hidden'}">
        {#each menuItems as item}
            <CssDimensionInput {item} />
        {/each}
    </div>
</div>

<style>
    .cssSizeMenuLabel {
        border: none;
        background: none;
        width: 100%;
        padding: 10px;
        /* display: block; */
        /* color: inherit; */
        /* font-size: 36px; */
        cursor: pointer;
        margin: 0;
        /* padding-bottom: 0.5em;
        padding-top: 0.5em; */
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
        outline: 1px solid gray;
    }
    svg {
        transition: transform 0.2s ease-in;
    }
    [aria-expanded="true"] svg {
        transform: rotate(0.25turn);
    }
    .cssSizeMenu {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
    .hidden {
        display: none;
    }
</style>
