<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let selectorInput = "";

    function cancel() {
        dispatch("cancel");
    }
    function add() {
        // console.log(selectorInput.value);
        dispatch("add", { value: selectorInput.value });
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="modal" on:click={cancel}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="modal-content" on:click|stopPropagation>
        <input
            bind:this={selectorInput}
            type="text"
            placeholder="Type selector and press Enter"
        />
        <button on:click={cancel}>Cancel</button>
        <button on:click={add}>Add</button>
    </div>
</div>

<style>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background-color: white;
        padding: 1rem;
        border-radius: 4px;
    }

    button {
        margin-top: 1rem;
    }
</style>
