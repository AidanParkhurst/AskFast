<script>
    import { signIn, signOut } from "@auth/sveltekit/client"
    import { page } from "$app/stores"
    import { goto } from "$app/navigation"
    import { onMount } from "svelte"
    import Button from "$lib/components/Button.svelte"

    onMount(() => {
        if ($page.data.session) {
            console.log($page.data.session)
            goto("/dashboard")
        }
    })
</script>

<div class="container">
    <h1>Make Surveys that Listen</h1>
    <h2>Then analyze natural, open ended responses, fast.</h2>
    {#if !$page.data.session}
    <Button on:click={() => {signIn("google")}}>
        Sign In with <b>Google</b>
    </Button>
    {/if}
</div>

<style>
    .container {
        position: absolute;
        top: 0;
        left: 0;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
        min-height: 100vh;
        height: fit-content;

        background-color: var(--color-light);
        color: var(--color-dark);
    }

    h1 {
        font-size: 4rem;
        font-weight: bold;
        margin: 0 0 0.5rem 0;
        color: var(--color-dark);
    }
    h2 {
        font-size: 2rem;
        margin: 0 0 1rem 0;
        color: var(--color-mid);
    }
</style>