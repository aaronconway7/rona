<script>
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    import { flag } from 'country-emoji';

    dayjs.extend(relativeTime);

    export let data;
    export let global = false;

    const lookup = {
        today: {
            label: `Today`,
            cases: `todayCases`,
            deaths: `todayDeaths`
        },
        allTime: {
            label: `All Time`,
            cases: `cases`,
            deaths: `deaths`,
            vaccinated: `vaccinated`
        }
    };

    const stats = [
        {
            label: `cases 😷`,
            total: `cases`,
            today: `todayCases`
        },
        {
            label: `deaths 💀`,
            total: `deaths`,
            today: `todayDeaths`
        },
        {
            label: `vaccinated 💉`,
            total: `vaccinated`,
            today: `todayVaccinated`
        }
    ];

    const timePeriods = [`today`, `total`];
</script>

<style>
    .stat-row {
        grid-template-columns: 100px 1fr 1fr;
    }
</style>

<div class="rounded-lg bg-gray-800 text-center shadow-lg grid auto-rows-max content-between">
    {#if data.population}
        <span class="text-xs border border-blue-300 rounded p-1 bg-blue-500 bg-opacity-25 text-blue-300 justify-self-end mt-2 mr-2">🧑‍🤝‍🧑 {data.population?.toLocaleString()}</span>
    {/if}
    <h2 class="text-2xl font-bold p-8">
        {#if global}
            🌎 Worldwide
        {:else}{flag(data.countryInfo.iso2) || `🏳️`} {data.country}{/if}
    </h2>
    <div class="stat-row grid text-xs p-2 text-right">
        <span />
        {#each timePeriods as timePeriod}
            <span class="font-bold opacity-50">{timePeriod}</span>
        {/each}
    </div>
    {#each stats as stat}
        <div
            class="stat-row grid text-xs border-t border-gray-600 p-2 text-right">
            <span class="font-bold">{stat.label}</span>
            {#each timePeriods as timePeriod}
                <span class="{data[stat[timePeriod]] ?? `opacity-25`}">{data[stat[timePeriod]]?.toLocaleString() || `unknown`}</span>
            {/each}
        </div>
    {/each}
</div>
