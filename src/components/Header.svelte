<script>
    export let refreshData;
</script>

<header
    id="top"
    class="bg-gray-800 p-2 text-sm text-white flex justify-between items-center
    font-mono">
    <span class="font-bold">🦠 rona.live</span>
    <span class="text-xs text-gray-600">
        made by
        <a
            class="underline hover:text-gray-300"
            href="https://aaronconway.co.uk"
            target="_blank">
            aaron
        </a>
    </span>
    <button
        class="border border-gray-500 text-gray-300 rounded p-1 font-bold
        text-xs hover:bg-gray-700 hover:text-gray-100"
        on:click={refreshData}>
        refresh
    </button>
</header>
