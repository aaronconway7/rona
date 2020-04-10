<style>
    :global(body) {
        background-color: #101010;
    }
</style>

<main
    class={`min-h-screen font-mono text-gray-100 text-center
    leading-relaxed`}>
    <span class={`absolute right-0 top-0 mr-2 mt-2 text-xs`}>
        Made by
        <a
            class={`underline opacity-50 hover:opacity-75`}
            href={`https://aaronconway.co.uk`}
            target={`_blank`}>
            Aaron
        </a>
    </span>
    <div class={`max-w-2xl mx-auto py-24 px-12 grid gap-8 content-center`}>
        <slot />
    </div>
</main>
