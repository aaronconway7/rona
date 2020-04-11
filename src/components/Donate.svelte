<script>
    const buttons = [
        {
            label: `WHO`,
            class: `who`,
            link: `https://covid19responsefund.org/`,
        },
        {
            label: `Global Giving`,
            class: `global-giving`,
            link: `https://www.globalgiving.org/projects/coronavirus-relief-fund/`,
        },
        {
            label: `Unicef`,
            class: `unicef`,
            link: `https://www.unicef.org.uk/donate/coronavirus/`,
        },
    ];
</script>

<style>
    :root {
        --who: #018dc9;
        --global-giving: #df7c1d;
        --unicef: #02aeef;
    }

    a:hover {
        background-color: transparent;
    }

    .who {
        background-color: var(--who);
        border-color: var(--who);
    }
    .who:hover {
        color: var(--who);
    }
    .global-giving {
        background-color: var(--global-giving);
        border-color: var(--global-giving);
    }
    .global-giving:hover {
        color: var(--global-giving);
    }
    .unicef {
        background-color: var(--unicef);
        border-color: var(--unicef);
    }
    .unicef:hover {
        color: var(--unicef);
    }
</style>

<p>For the price of a pack of Corona 🍻, you could help some people.</p>
<div class={`grid gap-2 md:grid-cols-3`}>
    {#each buttons as button, i}
        <a
            href={button.link}
            class={`${button.class} w-full py-3 underline border`}
            target={`_blank`}
            key={button.class}>
            {button.label}
        </a>
    {/each}
</div>
