<script>
    import './Tailwind.svelte';
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';

    dayjs.extend(relativeTime);

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
</script>

<header
    class="bg-gray-800 p-2 text-sm text-white flex justify-between items-center">
    <span class="font-bold">🦠 rona.live</span>
    <button class="border rounded p-1 font-bold text-xs">Refresh ♻️</button>
</header>
<main class="bg-gray-900 min-h-screen text-gray-100 p-8 text-center">
    <h1 class="font-bold text-2xl mb-8">
        Co
        <span class="text-red-500 -ml-1">rona</span>
        Dashboard
    </h1>

    {#await getAllData}
        <p>...loading</p>
    {:then data}
        <p class="opacity-25 text-xs mb-2">
            Last Updated: {dayjs(data.updated).fromNow()}
        </p>
        <div class="rounded-lg bg-gray-800 text-center shadow-lg">
            <h2 class="text-2xl font-bold p-8">🌎 Worldwide</h2>
            <div class="grid grid-flow-col text-xs border-t p-2">
                <span>Today</span>
                <div>
                    <span>{data.todayCases.toLocaleString()}</span>
                    <span class="opacity-50 italic font-extralight">cases</span>
                </div>
                <div>
                    <span>{data.todayDeaths.toLocaleString()}</span>
                    <span class="opacity-50 italic font-extralight">
                        deaths
                    </span>
                </div>
            </div>
            <div class="grid grid-flow-col text-xs border-t p-2">
                <span>All Time</span>
                <div>
                    <span>{data.cases.toLocaleString()}</span>
                    <span class="opacity-50 italic font-extralight">cases</span>
                </div>
                <div>
                    <span>{data.deaths.toLocaleString()}</span>
                    <span class="opacity-50 italic font-extralight">
                        deaths
                    </span>
                </div>
            </div>
        </div>

    {:catch error}
        <p>An error occurred!</p>
    {/await}
</main>
