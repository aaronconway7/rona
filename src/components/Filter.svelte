<script>
    export let search = ``;
    export let sortedBy = `cases`;

    const filters = [
        {
            label: `😷 cases`,
            value: `cases`
        },
        {
            label: `☠️ deaths`,
            value: `deaths`
        },
        {
            label: `🧑‍🤝‍🧑 population`,
            value: `population`
        }
    ];
</script>

<input
    type="search"
    class="w-full rounded bg-gray-700 py-2 px-4 mb-2 outline-none
    focus:bg-gray-600"
    placeholder="search..."
    bind:value={search} />
<div class="flex flex-wrap gap-2 mb-4 md:justify-end items-center text-xs">
    <span>sort by:</span>
    <div class="flex flex-wrap gap-2 md:justify-end">
        {#each filters as filter}
            <button
                class={`border border-gray-700 p-1 rounded bg-gray-100
                    bg-opacity-10 ${sortedBy === filter.value && `bg-blue-600 bg-opacity-100`}`}
                on:click={() => (sortedBy = filter.value)}>
                {filter.label}
            </button>
        {/each}
    </div>
</div>
