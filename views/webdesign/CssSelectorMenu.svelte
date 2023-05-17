<script>
    import CssDropdownMenu from "./CssDropdownMenu.svelte";
    import CssSelectorModal from "./CssSelectorModal.svelte";
    import { derived } from "svelte/store";
    import {
        cssStyleManager,
        cssEditMode,
        selectorToEdit,
        selectorList,
        pseudoList,
    } from "./CssStore.js";
    //
    let showModal = false;
    //
    // let selectorTags = [];
    let selectorTags = derived(selectorList, ($selectorList) => {
        // console.log($selectorList);
        let array = [];
        const objectKeys = Object.keys($selectorList);
        for (let i = 0; i < objectKeys.length / 2; i++) {
            array.push($selectorList[i]);
        }
        return array;
    });
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

    function updateTag(event) {
        let i = 0;
        // console.log($selectorList);

        if (inputValue !== "") {
            selectorList.update((obj) => {
                let newObj = obj;
                const newKey = event.detail.value;

                // console.log(newObj);
                while (newObj[i]) {
                    if (newObj[i] === inputValue) {
                        newObj[i] = newKey;
                        // console.log(newObj[i]);
                    }
                    i++;
                }
                newObj[newKey] = newObj[inputValue];
                delete newObj[inputValue];

                // console.log(newObj);
                // return obj;
                return newObj;
            });

            // const index = selectorTags.indexOf(inputValue);
            // if (index !== -1) {
            //     // selectorTags[index] = event.detail.value;
            // }
        } else {
            // console.log($selectorList);
            selectorList.update((obj) => {
                let newObj = obj;
                const newKey = event.detail.value;
                const length = Object.keys(newObj).length / 2;
                newObj[length] = newKey;
                newObj[newKey] = {};
                newObj[newKey].color = $cssStyleManager.getTagColor(length);
                return newObj;
            });
            // // selectorTags = [...selectorTags, event.detail.value];
        }
        closeModal();
    }

    function removeTag(tag) {
        selectorTags = selectorTags.filter((t) => t !== tag);
    }

    function changeCssEditMode(event) {
        cssEditMode.update((value) => event.target.checked);
        selectorToEdit.update((value) => ($cssEditMode ? "inline" : ""));
    }

    function selectTag(tag) {
        // if cssEditorMode(mode to edit individual selector props) is on, then update the selectorToEdit
        if ($cssEditMode) {
            selectorToEdit.update((value) => tag);
            // console.log(event);
        }
        console.log("selectorToEdit: " + $selectorToEdit);
    }

    //
    const tagActions = [
        { label: "Edit selector", type: "edit" },
        { label: "Delete selector", type: "delete" },
    ];

    //
    function handleTagAction(action, tag) {
        if (action.type === "edit") {
            openModal(null, tag);
            // console.log(`Edit tag: ${tag}`);
            // Edit tag name logic here
        } else if (action.type === "delete") {
            removeTag(tag);
        }
    }
</script>

<!-- add on/off switch here to change modes -->
<label>
    <input
        type="checkbox"
        on:change={changeCssEditMode}
        bind:checked={$cssEditMode}
    />
    <!-- <input type="checkbox" bind:checked={cssEditMode} /> -->
    individual mode
</label>

<button on:click={openModal}>Add</button>

{#if showModal}
    <CssSelectorModal {inputValue} on:cancel={closeModal} on:add={updateTag} />
{/if}

<div class="tags-container">
    {#each $selectorTags as tag (tag)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="tag"
            on:click={selectTag(tag)}
            style="background-color:{$selectorList[tag].color}"
        >
            {tag}

            <!-- svelte-ignore a11y-click-events-have-key-events -->
            {#if tag !== "inline"}
                <CssDropdownMenu
                    actions={tagActions}
                    onAction={(action) => handleTagAction(action, tag)}
                >
                    <span>∨</span>
                </CssDropdownMenu>
                <!-- <span class="tag-ddmenu" on:click={() => removeTag(tag)}>∨</span> -->
            {/if}
        </div>
    {/each}
</div>

<!-- add tags container for pseudo lists -->

<style>
    .tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .tag {
        display: flex;
        align-items: center;
        /* background-color: #f1f1f1; */
        color: #fefcfc;
        border-radius: 4px;
        padding: 4px 8px;
    }

    /* .tag-ddmenu {
        margin-left: 4px;
        cursor: pointer;
    } */
</style>
