<script>
    import './Tailwind.svelte';

    import { fade } from 'svelte/transition';
    import CountryCard from './components/CountryCard.svelte';
    import ScrollToTop from './components/ScrollToTop.svelte';
    import Header from './components/Header.svelte';
    import Footer from './components/Footer.svelte';
    import Filter from './components/Filter.svelte';

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

    let search, sortedBy, y, h;
</script>

<style>
    .data-grid {
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }
</style>

<svelte:window bind:scrollY={y} bind:innerHeight={h} />
<Header />
<main class="bg-gray-900 min-h-screen text-gray-100 p-8 text-center font-mono">
    <Filter bind:search bind:sortedBy />
    <div class="data-grid grid gap-4">
        {#await getAllData}
            <p>⏳ loading worldwide data...</p>
        {:then data}
            {#if `worldwide`.includes(search.toLowerCase())}
                <CountryCard {data} global={true} />
            {/if}
        {:catch error}
            <p>❌ An error occurred!</p>
        {/await}

        {#await getCountriesData}
            <p>⏳ loading countries...</p>
        {:then data}
            {#each data
                .filter(c =>
                    c.country.toLowerCase().includes(search.toLowerCase())
                )
                .sort((a, b) => a[sortedBy] < b[sortedBy]) as country}
                <CountryCard data={country} />
            {/each}
        {:catch error}
            <p>❌ An error occurred!</p>
        {/await}
    </div>
    {#if y > h / 2}
        <ScrollToTop />
    {/if}
</main>
<Footer />
