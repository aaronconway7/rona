<script>
    import moment from 'moment';

    import Stat from './Stat.svelte';

    export let data;

    const stats = [
        {
            label: `Confirmed 😷`,
            value: `confirmed`,
            newValue: `new_confirmed`,
        },
        {
            label: `Recovered ✌️`,
            value: `recovered`,
            newValue: `new_recovered`,
        },
        {
            label: `Deaths 🙏`,
            value: `deaths`,
            newValue: `new_deaths`,
        },
    ];
</script>

<p class={`opacity-50`}>Last updated: {moment(data.updated_at).fromNow()}</p>
<div class={`grid gap-4`}>
    {#each stats as { label, value }, i}
        <Stat {label} value={data[value] || data.latest_data[value]} />
    {/each}
</div>
