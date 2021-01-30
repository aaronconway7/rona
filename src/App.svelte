<script>
    import './Tailwind.svelte';
    import 'typeface-roboto-mono';
    import CountryCard from './components/CountryCard.svelte';

    const getAllData = (async () => {
        const res = await fetch(
            `https://disease.sh/v3/covid-19/all?yesterday=true&twoDaysAgo=true&allowNull=true`
        );
        return await res.json();
    })();

    const getCountriesData = (async () => {
        const res = await fetch(
            `https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=true&sort=cases&allowNull=true`
        );
        return await res.json();
    })();

    let search = ``;
</script>

<style>
    .data-grid {
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }
</style>

<header
    class="bg-gray-800 p-2 text-sm text-white flex justify-between items-center
    font-mono">
    <span class="font-bold">🦠 rona.live</span>
    <span class="text-xs">
        made by
        <a class="underline" href="https://aaronconway.co.uk" target="_blank">
            aaron
        </a>
    </span>
    <!-- <button class="border rounded p-1 font-bold text-xs">Refresh</button> -->
</header>
<main class="bg-gray-900 min-h-screen text-gray-100 p-8 text-center font-mono">
    <input
        type="search"
        class="w-full rounded bg-gray-700 py-2 px-4 mb-8 outline-none
        focus:bg-gray-600"
        placeholder="search..."
        bind:value={search} />

    <div class="data-grid grid gap-4">
        {#await getAllData}
            <p>loading worldwide data...</p>
        {:then data}
            {#if `worldwide`.includes(search.toLowerCase())}
                <CountryCard {data} global={true} />
            {/if}
        {:catch error}
            <p>An error occurred!</p>
        {/await}

        {#await getCountriesData}
            <p>loading countries...</p>
        {:then data}
            {#each data.filter(c =>
                c.country.toLowerCase().includes(search.toLowerCase())
            ) as country}
                <CountryCard data={country} />
            {/each}
        {:catch error}
            <p>An error occurred!</p>
        {/await}
    </div>

</main>
<footer class="bg-gray-900 p-8 text-sm text-white font-mono text-center">
    <span>api by</span>
    <a class="border p-2" href="https://disease.sh/" target="_blank">
        disease.sh
    </a>
</footer>
