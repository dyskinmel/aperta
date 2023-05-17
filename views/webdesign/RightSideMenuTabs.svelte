<script>
    import { onMount } from "svelte";
    import { CanvasWrapper } from "./utils";
    import { cssStyleManager } from "./CssStore.js";
    export let rightSideMenuTabItems = [];
    export let activeTabValue = 1;

    const handleClick = (tabValue) => () => (activeTabValue = tabValue);
</script>

<ul>
    {#each rightSideMenuTabItems as rightSideMenuTabItems}
        <li
            class={activeTabValue === rightSideMenuTabItems.value
                ? "active"
                : ""}
        >
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span on:click={handleClick(rightSideMenuTabItems.value)}
                >{rightSideMenuTabItems.label}</span
            >
        </li>
    {/each}
</ul>

{#each rightSideMenuTabItems as rightSideMenuTabItem}
    <!-- {#if activeTabValue == rightSideMenuTabItem.value} -->
    <div
        class="box
        {$cssStyleManager !== null &&
        activeTabValue == rightSideMenuTabItem.value
            ? ''
            : 'hidden'}"
    >
        <svelte:component this={rightSideMenuTabItem.component} />
    </div>
    <!-- {/if} -->
{/each}

<style>
    ul {
        display: flex;
        flex-wrap: wrap;
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
        border-bottom: 1px solid #dee2e6;
    }
    li {
        margin-bottom: -1px;
    }

    span {
        border: 1px solid transparent;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        display: block;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }

    span:hover {
        border-color: #e9ecef #e9ecef #dee2e6;
    }

    li.active > span {
        color: #495057;
        background-color: #fff;
        border-color: #dee2e6 #dee2e6 #fff;
    }

    .hidden {
        display: none;
    }
    .box {
        width: 100%;
        height: 100%;
        margin-bottom: 10px;
        /* padding: 10px; */
        border: 1px solid #dee2e6;
        border-radius: 0 0 0.5rem 0.5rem;
        border-top: 0;
    }
</style>
