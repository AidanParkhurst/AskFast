<script>
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
        </svg> <br>
        Dashboard
    </Button>
    <Button class="icon" on:click={() => {goto('/account')}}>
        <!-- Hamburger Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            stroke="currentColor" fill="currentColor">
            <path d="M3 6h18m-18 6h18m-18 6h18"/>
        </svg> <br>
        Account 
    </Button>
</div>
<div class="contents">
    <slot></slot>
</div>

<!--<path d="M12 2c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 2c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm0 2a3 3 0 100 6 3 3 0 000-6z"/>-->
<style>
    :root {
        --toolwidth: 10vw; /* Desktop toolbar is on the left */
        --toolheight: 10vh; /* Mobile toolbar is across the bottom */
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

        overflow-y: scroll;
        overflow-x: hidden;
    }

    @media (max-width: 700px) {
        .toolbar {
            top: auto;
            bottom: 0;
            left: 0;

            flex-direction: row;

            height: var(--toolheight);
            max-height: var(--toolheight);
            width: 100vw;
            max-width: 100vw;
            
            border-right: none;
            border-top: 2px solid var(--color-border);

        }
        .contents {
            height: calc(100vh - var(--toolheight));
            width: 100vw;
            top: 0;
            left: 0;
        }

    }
</style>