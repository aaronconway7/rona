<script>
    import { flip } from 'svelte/animate';
    import query from './helpers/query';

    import EmptyMessage from './components/EmptyMessage.svelte';
    import CountryCard from './components/CountryCard.svelte';
    import ScrollToTop from './components/ScrollToTop.svelte';
    import Header from './components/Header.svelte';
    import Footer from './components/Footer.svelte';
    import Filter from './components/Filter.svelte';

    import './Tailwind.svelte';

    let search, sortedBy, y, h;
    let count = 11;

    const getAllData = async () => {
        const [allData, vaccineData] = await Promise.all([
            query(
                `https://disease.sh/v3/covid-19/all?yesterday=true&twoDaysAgo=true&allowNull=true`
            ),
            query(
                `https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=all`
            )
        ]);

        const today =
            vaccineData[
                Object.keys(vaccineData)[Object.keys(vaccineData).length - 1]
            ];
        const yesterday =
            vaccineData[
                Object.keys(vaccineData)[Object.keys(vaccineData).length - 2]
            ];

        const vaccinated = today;
        const todayVaccinated = today - yesterday;

        allData.vaccinated = vaccinated;
        allData.todayVaccinated = todayVaccinated;

        return allData;
    };

    const getCountriesData = async () => {
        const [countriesData, vaccineData] = await Promise.all([
            query(
                `https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=true&sort=cases&allowNull=true`
            ),
            query(
                `https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=all`
            )
        ]);

        await vaccineData.forEach(v => {
            const today =
                v.timeline[
                    Object.keys(v.timeline)[Object.keys(v.timeline).length - 1]
                ];
            const yesterday =
                v.timeline[
                    Object.keys(v.timeline)[Object.keys(v.timeline).length - 2]
                ];

            const vaccinated = today;
            const todayVaccinated = today - yesterday;

            countriesData.find(
                c => c.country === v.country
            ).vaccinated = vaccinated;
            countriesData.find(
                c => c.country === v.country
            ).todayVaccinated = todayVaccinated;
        });

        return countriesData;
    };

    let allData = getAllData();
    let countryData = getCountriesData();

    const refreshData = () => {
        allData = getAllData();
        countryData = getCountriesData();
    };
</script>

<style>
    .data-grid {
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }
</style>

<svelte:window bind:scrollY={y} bind:innerHeight={h} />
<Header {refreshData} />
<main class="bg-gray-900 text-gray-100 p-8 text-center font-mono flex-1">
    <Filter bind:search bind:sortedBy />
    <div class="data-grid grid gap-4">
        {#await allData}
            <EmptyMessage>⏳ loading worldwide data...</EmptyMessage>
        {:then data}
            {#if `worldwide`.includes(search.toLowerCase())}
                <CountryCard {data} global={true} />
            {/if}
        {:catch error}
            <EmptyMessage>❌ An error occurred!</EmptyMessage>
        {/await}

        {#await countryData}
            <p class="text-gray-500 pt-6">⏳ loading countries...</p>
        {:then data}
            {#each data
                .filter(c =>
                    c.country.toLowerCase().includes(search.toLowerCase())
                )
                .sort((a, b) => b[sortedBy] - a[sortedBy])
                .slice(0, count) as country (country.country)}
                <div animate:flip={{ duration: 500 }}>
                    <CountryCard data={country} />
                </div>
            {/each}
            {#if data
                .filter(c =>
                    c.country.toLowerCase().includes(search.toLowerCase())
                )
                .sort((a, b) => b[sortedBy] - a[sortedBy])
                .slice(0, count).length === 0}
                <EmptyMessage>😬 No country found!</EmptyMessage>
            {/if}
        {:catch error}
            <EmptyMessage>❌ An error occurred!</EmptyMessage>
        {/await}
    </div>
    {#if y > h / 2}
        <ScrollToTop />
    {/if}
</main>
<Footer />
