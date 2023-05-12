<script>
    export let actions = [];
    export let onAction;

    function handleAction(action) {
        // console.log(action);
        onAction(action);
    }
</script>

<div class="dropdown-menu">
    <slot />
    <div class="dropdown-content">
        {#each actions as action}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={() => handleAction(action)}>{action.label}</div>
        {/each}
    </div>
</div>

<style>
    .dropdown-menu {
        display: inline-block;
        position: relative;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: white;
        color: black;
        min-width: 160px;
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        padding: 12px 16px;
        z-index: 1;
    }

    .dropdown-menu:hover .dropdown-content {
        display: block;
    }
</style>
