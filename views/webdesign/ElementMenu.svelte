<script>
    import ElementMenuItem from "./ElementMenuItem.svelte";
    const elementLists = [
        {
            name: "Layout",
            elements: [
                {
                    name: "Div",
                    tag: "div",
                },
            ],
        },
        {
            name: "Typography",
            elements: [
                {
                    name: "Heading",
                    tag: "h1",
                },
                {
                    name: "Paragraph",
                    tag: "p",
                },
                {
                    name: "Text link",
                    tag: "a",
                },
                {
                    name: "Text",
                    tag: "span",
                },
            ],
        },
        {
            name: "Media",
            elements: [
                {
                    name: "Image",
                    tag: "img",
                },
            ],
        },
    ];
</script>

{#each elementLists as elementList}
    <ElementMenuItem {elementList} />
{/each}
