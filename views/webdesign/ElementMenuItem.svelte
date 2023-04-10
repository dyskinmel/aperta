<script>
    import { slide } from "svelte/transition";
    export let elementList;
    let isOpen = true;
    const girdRow = elementList.elements.length / 3;
    const toggle = () => (isOpen = !isOpen);
</script>

<div class="elementMenu">
    <button on:click={toggle} aria-expanded={isOpen} class="elementMenuHeader">
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
        {elementList.name}
    </button>
    {#if isOpen}
        <div class="elementMenuBody">
            {#each elementList.elements as element}
                <div class="elementMenuItem" data-Htag={element.tag}>
                    {element.name}
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    :root {
        --grid-row: "repeat(" + girdRow + ", 1fr)";
    }
    .elementMenuHeader {
        border: none;
        background: none;
        /* display: block; */
        /* color: inherit; */
        /* font-size: 36px; */
        cursor: pointer;
        margin: 0;
        /* padding-bottom: 0.5em;
        padding-top: 0.5em; */
    }
    svg {
        transition: transform 0.2s ease-in;
    }

    [aria-expanded="true"] svg {
        transform: rotate(0.25turn);
    }
    .elementMenu {
        width: 210px;
    }
    .elementMenuHeader {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 40px;
        outline: 1px solid gray;
    }
    .elementMenuBody {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: var(--grid-row);
        grid-gap: 0px;
    }

    .elementMenuItem {
        font-size: 13px;
        text-align: center;
        vertical-align: middle;
        width: 70px;
        height: 70px;
        outline: 1px solid gray;
    }
</style>
