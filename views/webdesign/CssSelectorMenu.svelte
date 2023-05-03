<script>
    let tags = [];
    let inputValue = "";

    function addTag() {
        if (inputValue.trim()) {
            tags = [...tags, inputValue.trim()];
            inputValue = "";
        }
    }

    function removeTag(tag) {
        tags = tags.filter((t) => t !== tag);
    }
</script>

<input
    type="text"
    bind:value={inputValue}
    placeholder="Type a tag and press Enter"
    on:keydown={(e) => e.key === "Enter" && addTag()}
/>

<div class="tags-container">
    {#each tags as tag (tag)}
        <div class="tag">
            {tag}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span class="tag-remove" on:click={() => removeTag(tag)}>×</span>
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

    .tag-remove {
        margin-left: 4px;
        cursor: pointer;
    }
</style>
