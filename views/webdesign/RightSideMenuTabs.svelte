<script>
    import { onMount } from "svelte";
    // import { createEventDispatcher } from "svelte";
    import { CanvasWrapper } from "./utils";
    // export let metaMenus = [];
    export let rightSideMenuTabItems = [];
    export let activeTabValue = 1;

    // const dispatch = createEventDispatcher();

    let isElementSelected = false;

    onMount(() => {
        document.addEventListener("elementSelected", (event) => {
            showTabItemsIfElementSelected();
        });
    });

    export function showTabItemsIfElementSelected() {
        const canvasWrapper = new CanvasWrapper();
        isElementSelected = canvasWrapper.isElementSelected();
        // console.log("isElementSelected: " + isElementSelected);
    }

    const handleClick = (tabValue) => () => (activeTabValue = tabValue);
</script>

<ul>
    <!-- {#each metaMenus as metaMenu} -->
    {#each rightSideMenuTabItems as rightSideMenuTabItems}
        <!-- <li class={activeTabValue === metaMenu.value ? "active" : ""}> -->
        <li
            class={activeTabValue === rightSideMenuTabItems.value
                ? "active"
                : ""}
        >
            <!-- <span on:click={handleClick(metaMenu.value)}>{metaMenu.label}</span> -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span on:click={handleClick(rightSideMenuTabItems.value)}
                >{rightSideMenuTabItems.label}</span
            >
        </li>
    {/each}
</ul>

<!-- {#if isElementSelected}
    {#each rightSideMenuTabItems as rightSideMenuTabItem}
        {#if activeTabValue == rightSideMenuTabItem.value}
            <div class="box">
                <svelte:component this={rightSideMenuTabItem.component} />
            </div>
        {/if}
    {/each}
{:else}
    <div class="box">
        <p>Nothing selected</p>
    </div>
{/if} -->

{#each rightSideMenuTabItems as rightSideMenuTabItem}
    {#if activeTabValue == rightSideMenuTabItem.value}
        <div class="box">
            <svelte:component this={rightSideMenuTabItem.component} />
        </div>
    {/if}
{/each}

<style>
    .box {
        width: 100%;
        height: 100%;
        margin-bottom: 10px;
        /* padding: 10px; */
        border: 1px solid #dee2e6;
        border-radius: 0 0 0.5rem 0.5rem;
        border-top: 0;
    }
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
</style>
