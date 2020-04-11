<script>
    import { onMount } from 'svelte';
    import { country } from '../store.js';

    export let label;
    export let value;
</script>

<style>
    .stat {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
    }
</style>

<div class={`stat border p-4`}>
    <h2 class={`font-bold`}>{label}</h2>
    <span class={`text-4xl opacity-50`} id={`${label}-counter`}>{value.toLocaleString()}</span>
</div>
