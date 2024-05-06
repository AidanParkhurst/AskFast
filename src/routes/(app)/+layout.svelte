<script>
    import { signOut } from "@auth/sveltekit/client"
    import { page } from "$app/stores"
    import { goto } from "$app/navigation"
    import { onMount } from "svelte"

    import Button from "$lib/components/Button.svelte";

    onMount(() => {
        if (!$page.data.session) {
            goto("/")
        }
    })
</script>

<div class="toolbar">
    <Button class="icon green" on:click={() => {goto('/create')}}>
        <!--svg of a create icon-->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2" fill="currentColor">
            <path d="M12 2v20m-10-10h20"/>
        </svg> <br>
        Create
    </Button>
    <Button class="icon blue" on:click={() => {goto('/dashboard')}}>
        <!--svg of a dashboard icon-->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            stroke="currentColor" fill="currentColor">
            <path d="M3 13h-3v-10h3v10zm0 8h-3v-6h3v6zm5-8h-3v-14h3v14zm0 8h-3v-6h3v6zm5-8h-3v-10h3v10zm0 8h-3v-6h3v6zm5-8h-3v-14h3v14zm0 8h-3v-6h3v6zm5-8h-3v-10h3v10zm0 8h-3v-6h3v6z"/>
        </svg>
        Dashboard
    </Button>
    <Button class="icon" on:click={() => {goto('/account')}}>
        <!--svg of a profile icon-->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            stroke="currentColor" fill="currentColor">
            <path d="M12 14c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6zm0 2c4.687 0 8 2.687 8 4v2h-16v-2c0-1.313 3.313-4 8-4z"/>
        </svg> <br>
        Account 
    </Button>
</div>
<div class="contents">
    <slot></slot>
</div>

<!-- Sign out icon
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    stroke="currentColor" fill="currentColor">
    <path d="M17 16l4-4-4-4m-6 8h-14v-16h14m-7-12v6m0 0v6m0-6h6"/>
</svg> <br>
-->
<style>
    :root {
        --toolwidth: 10vw;
    }
    .toolbar {
        height: 100vh;
        max-height: 100vh;
        width: var(--toolwidth);
        max-width: 10vw;

        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    
        background-color: var(--color-light);
        color: var(--color-dark);

        border-right: 2px solid var(--color-border);
        box-shadow: 0px 0px 20px var(--color-border);
    }

    .contents {
        height: 100vh;
        width: calc(100vw - var(--toolwidth));

        position: absolute;
        top: 0;
        left: var(--toolwidth);
    }
</style>