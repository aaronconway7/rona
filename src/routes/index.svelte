<script>
    import { setContext, getContext } from 'svelte';
    import Select from 'svelte-select';
    import axios from 'axios';
    import { flag } from 'country-emoji';
    import { get } from 'svelte/store'
    import { country } from '../store.js';

    import Stats from '../components/Stats.svelte';
    import CountrySelect from '../components/CountrySelect.svelte';
    import Map from '../components/Map.svelte'
    import Donate from '../components/Donate.svelte';

    let selectedCountry = get(country);

    const getTodayWorldData = async () => {
        const res = await axios.get(`https://corona-api.com/timeline`);
        const { data } = await res.data;
        // just getting todays data
        return data[0];
    };

    const getTodayCountryData = async () => {
        const res = await axios.get(`https://corona-api.com/countries`);
        const { data } = await res.data;
        return data;
    };

    const getAllData = (async () => {
        const [world, countries] = await Promise.all([
            getTodayWorldData(),
            getTodayCountryData(),
        ]);

        return {
            world,
            countries,
        };
    })();

    country.subscribe(newValue => {
        selectedCountry = newValue;
    });
</script>

<svelte:head>
    <title>Sapper project template</title>
</svelte:head>

<h1 class={`text-2xl font-bold`}>
    Co
    <span class={`text-red-700`}>rona</span>
    virus (COVID-19) Count {selectedCountry ? flag(selectedCountry) : `🌍`}
</h1>

{#await getAllData}
    <p>...loading</p>
{:then data}
    <Stats
        data={selectedCountry ? data.countries.find(country => country.code === selectedCountry) : data.world} />
    <CountrySelect data={data.countries} />
{:catch error}
    <p>An error occurred!</p>
{/await}

<Map />

<Donate />

<a
    class={`opacity-50 hover:opacity-75 underline`}
    href={`https://www.nhs.uk/conditions/coronavirus-covid-19/`}
    target={`_blank`}>
    Feeling unwell?
</a>
