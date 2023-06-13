<script>
    import FolderMenu from "./FolderMenu.svelte";
    import ElementMenu from "./ElementMenu/ElementMenu.svelte";
    import IntegrationMenu from "./IntegrationMenu.svelte";
    import GitMenu from "./GitMenu.svelte";
    import SettingMenu from "./SettingMenu.svelte";

    let activeMenuValue = 0;

    const items = [
        {
            alt: "folder image",
            image: "../img/menuIcons/folder.png",
            value: 1,
            component: FolderMenu,
        },
        {
            alt: "add_box image",
            image: "../img/menuIcons/add_box.png",
            value: 2,
            component: ElementMenu,
        },
        {
            alt: "integration image",
            image: "../img/menuIcons/integration.png",
            value: 3,
            component: IntegrationMenu,
        },
        {
            alt: "git image",
            image: "../img/menuIcons/git.png",
            value: 4,
            component: GitMenu,
        },
        {
            alt: "setting image",
            image: "../img/menuIcons/settings.png",
            value: 5,
            component: SettingMenu,
        },
    ];

    const handleClick = (value) => () => {
        if (activeMenuValue === value) {
            activeMenuValue = 0;
        } else {
            activeMenuValue = value;
        }
    };

    function handleKeyDown(event) {
        if (event.key === "Enter" || event.key === " ") {
            handleClick(event.target.tabindex)();
        }
    }
</script>

<div class="leftSideMenu">
    <div class="leftNavigation">
        {#each items as item}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img
                class="leftNavigationIcon"
                src={item.image}
                alt={item.alt}
                on:click={handleClick(item.value)}
            />
        {/each}
    </div>
    <div class="leftMenuPane">
        {#each items as item}
            {#if activeMenuValue === item.value}
                <svelte:component this={item.component} />
            {/if}
        {/each}
    </div>
</div>

<style>
    .leftSideMenu {
        height: 100%;
        display: inline-flex;
        outline: 1px solid gray;
    }

    .leftNavigation {
        height: 100%;
        outline: 1px solid gray;
    }

    .leftNavigationIcon {
        width: 30px;
        margin: 4px 2px;
        display: block;
    }

    .leftMenuPane {
        height: 100%;
        display: block;
        outline: 1px solid gray;
    }
</style>
