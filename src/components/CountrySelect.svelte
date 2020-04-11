<script>
    import Select from 'svelte-select';
    import axios from 'axios';
    import { flag } from 'country-emoji';
    import { get } from 'svelte/store';
    import { country } from '../store.js';

    export let data = [];

    let options = [{ value: null, label: `🌎 World` }];
    let selectedValue = options[0];

    const populateSelect = (async () => {
        await data.forEach(country => {
            options.push({
                value: country.code,
                label: `${flag(country.code) || ''} ${country.name}`,
            });
        });
        return data;
    })();

    const handleSelect = async selectedVal => {
        country.set(selectedVal.detail.value);
    };

    country.subscribe(newValue => {
        selectedValue = options.find(option => option.value === newValue);
    });
</script>

<style>
    .select-container {
        --background: transparent;
        --border: 1px solid rgba(255, 255, 255, 0.25);
        --borderRadius: 0px;
        --borderFocusColor: white;
        --listBackground: #282828;
        --itemHoverBG: #5e5e5e;
        --itemIsActiveBG: #d82239;
        --indicatorTop: 0.5em;
        text-align: left;
        max-width: 350px;
        margin: 0 auto;
        width: 100%;
    }
</style>

{#await populateSelect}
    <p>...populating</p>
{:then data}
    <div class="select-container">
        <Select
            items={options}
            showChevron={true}
            listAutoWidth={false}
            isClearable={false}
            on:select={handleSelect}
            bind:selectedValue />
    </div>
{:catch error}
    <p>An error occurred!</p>
{/await}
