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
            deaths: `deaths`
        }
    }
</script>

<div class="rounded-lg bg-gray-800 text-center shadow-lg">
    <h2 class="text-2xl font-bold p-8">
        {#if global}
            🌎 Worldwide
        {:else}
            {flag(data.countryInfo.iso2) || `🏳️`} {data.country}
        {/if}
    </h2>
    <p class="opacity-25 text-xs mb-2">
        Last Updated: {dayjs(data.updated).fromNow()}
    </p>
    {#each [`today`, `allTime`] as timePeriod}
        <div class="time-period grid text-xs border-t border-gray-600 p-2 text-right">
            <span class="font-bold">{lookup[timePeriod].label}</span>
            {#each [`cases`, `deaths`] as stat}
                <div>
                    <span class="{!data[lookup[timePeriod][stat]] && `opacity-25`}">{data[lookup[timePeriod][stat]]?.toLocaleString() || `unknown`}</span>
                    <span class="opacity-50 italic font-extralight">{stat}</span>
                </div>
            {/each}
        </div>    
    {/each}
</div>

<style>
    .time-period {
        grid-template-columns: 75px 1fr 1fr;
    }
</style>