<script>
    import CssDropdownMenu from "./CssDropdownMenu.svelte";
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
        // console.log(inputValue);
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

    // function addTag() {
    //     if (inputValue.trim()) {
    //         selectorTags = [...selectorTags, inputValue.trim()];
    //         inputValue = "";
    //     }
    // }

    function removeTag(tag) {
        selectorTags = selectorTags.filter((t) => t !== tag);
    }

    //
    const tagActions = [
        { label: "Edit selector", type: "edit" },
        { label: "Delete selector", type: "delete" },
    ];

    function handleTagAction(action, tag) {
        // console.log(action);
        if (action.type === "edit") {
            openModal(null, tag);
            // console.log(`Edit tag: ${tag}`);
            // Edit tag name logic here
        } else if (action.type === "delete") {
            removeTag(tag);
        }
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
    <CssSelectorModal
        {inputValue}
        on:cancel={closeModal}
        on:add={updateSelector}
    />
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
            <CssDropdownMenu
                actions={tagActions}
                onAction={(action) => handleTagAction(action, tag)}
            >
                <span>∨</span>
            </CssDropdownMenu>
            <!-- <span class="tag-ddmenu" on:click={() => removeTag(tag)}>∨</span> -->
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

    /* .tag-ddmenu {
        margin-left: 4px;
        cursor: pointer;
    } */
</style>
