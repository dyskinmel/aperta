<script>
    import ElementMenuItem from "./ElementMenuItem.svelte";
    const elementLists = [
        {
            name: "Layout",
            elements: [
                {
                    name: "Div",
                    tag: "DIV",
                },
            ],
        },
        {
            name: "Typography",
            elements: [
                {
                    name: "Heading",
                    tag: "H1",
                },
                {
                    name: "Paragraph",
                    tag: "P",
                },
                {
                    name: "Text link",
                    tag: "A",
                },
                {
                    name: "Text",
                    tag: "SPAN",
                },
            ],
        },
        {
            name: "Media",
            elements: [
                {
                    name: "Image",
                    tag: "IMG",
                },
            ],
        },
    ];
</script>

{#each elementLists as elementList}
    <ElementMenuItem {elementList} />
{/each}
