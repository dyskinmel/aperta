<script>
    let isOpen = true;
    const toggle = () => {
        isOpen = !isOpen;
    };
</script>

<div class="marginPadding">
    <button
        on:click={toggle}
        aria-expanded={isOpen}
        class="marginPaddingHeader"
    >
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
        Margin & Padding
    </button>
    {#if isOpen}
        <div class="marginPaddingBody">
            <div class="marginPaddingItem">
                <div class="marginPaddingItemHeader">Margin</div>
                <div class="marginPaddingItemBody">
                    <div class="marginPaddingItemBodyItem">
                        <div class="marginPaddingItemBodyItemHeader">Top</div>
                        <div class="marginPaddingItemBodyItemBody">
                            <input type="text" />
                        </div>
                    </div>
                    <div class="marginPaddingItemBodyItem">
                        <div class="marginPaddingItemBodyItemHeader">Right</div>
                        <div class="marginPaddingItemBodyItemBody">
                            <input type="text" />
                        </div>
                    </div>
                    <div class="marginPaddingItemBodyItem">
                        <div class="marginPaddingItemBodyItemHeader">
                            Bottom
                        </div>
                        <div class="marginPaddingItemBodyItemBody">
                            <input type="text" />
                        </div>
                    </div>
                    <div class="marginPaddingItemBodyItem">
                        <div class="marginPaddingItemBodyItemHeader">Left</div>
                        <div class="marginPaddingItemBodyItemBody">
                            <input type="text" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="marginPaddingItem">
                <div class="marginPaddingItemHeader">Padding</div>
                <div class="marginPaddingItemBody">
                    <div class="marginPaddingItemBodyItem">
                        <div class="marginPaddingItemBodyItemHeader">Top</div>
                        <div class="marginPaddingItemBodyItemBody">
                            <input type="text" />
                        </div>
                    </div>
                    <div class="marginPaddingItemBodyItem">
                        <div class="marginPaddingItemBodyItemHeader">Right</div>
                        <div class="marginPaddingItemBodyItemBody">
                            <input type="text" />
                        </div>
                    </div>
                    <div class="marginPaddingItemBodyItem">
                        <div class="marginPaddingItemBodyItemHeader">
                            Bottom
                        </div>
                        <div class="marginPaddingItemBodyItemBody">
                            <input type="text" />
                        </div>
                    </div>
                    <div class="marginPaddingItemBodyItem">
                        <div class="marginPaddingItemBodyItemHeader">Left</div>
                        <div class="marginPaddingItemBodyItemBody">
                            <input type="text" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    .marginPaddingHeader {
        border: none;
        background: none;
        width: 100%;
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

    .marginPadding {
        width: 100%;
    }
    /* .elementMenu {
        width: 210px;
    } */
    /* .elementMenuHeader {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 40px;
        outline: 1px solid gray;
    } */
    /* .elementMenuBody {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: var(--grid-row);
        grid-gap: 0px;
    } */

    /* .elementMenuItem {
        font-size: 13px;
        text-align: center;
        vertical-align: middle;
        width: 70px;
        height: 70px;
        outline: 1px solid gray;
    } */
</style>
