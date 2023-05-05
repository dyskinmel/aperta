<script>
    import CssSelectorModal from "./CssSelectorModal.svelte";
    //
    let showModal = false;
    //
    let selectorTags = [];
    let pseudoTags = [];
    //
    let inputValue = "";

    function openModal(event, tagValue = "") {
        inputValue = tagValue;
        showModal = true;
    }

    function closeModal() {
        inputValue = "";
        showModal = false;
    }

    function updateSelector(event) {
        // console.log(event.detail.value);
        // const index = selectorTags.indexOf(event.detail.value);
        // console.log("inputValue: ", inputValue);
        if (inputValue !== "") {
            const index = selectorTags.indexOf(inputValue);
            if (index !== -1) {
                selectorTags[index] = event.detail.value;
            }
        } else {
            selectorTags = [...selectorTags, event.detail.value];
        }

        closeModal();
    }

    function addTag() {
        if (inputValue.trim()) {
            selectorTags = [...selectorTags, inputValue.trim()];
            inputValue = "";
        }
    }

    function removeTag(tag) {
        selectorTags = selectorTags.filter((t) => t !== tag);
    }

    //
    let ddOpen = false;

    function toggleDD() {
        ddOpen = !ddOpen;
    }
</script>

<!-- <input
    type="text"
    bind:value={inputValue}
    placeholder="Type a tag and press Enter"
    on:keydown={(e) => e.key === "Enter" && addTag()}
/> -->

<button on:click={openModal}>Add</button>

{#if showModal}
    <CssSelectorModal on:cancel={closeModal} on:add={updateSelector} />
    <!-- <CssSelectorModal on:cancel={closeModal}>
        <h2>Modal Title</h2>
        <p>Modal content</p>
    </CssSelectorModal> -->
{/if}

<div class="tags-container">
    {#each selectorTags as tag (tag)}
        <div class="tag">
            {tag}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span class="tag-ddmenu" on:click={() => removeTag(tag)}>∨</span>
        </div>
    {/each}
</div>

<style>
    .tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .tag {
        display: flex;
        align-items: center;
        background-color: #f1f1f1;
        border-radius: 4px;
        padding: 4px 8px;
    }

    .tag-ddmenu {
        margin-left: 4px;
        cursor: pointer;
    }
</style>
