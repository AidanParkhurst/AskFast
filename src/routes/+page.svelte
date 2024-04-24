<script>
    import { signIn, signOut } from "@auth/sveltekit/client"
    import { page } from "$app/stores"
    import { goto } from "$app/navigation"
    import { onMount } from "svelte"
    import Button from "$lib/components/Button.svelte"

    onMount(() => {
        if ($page.data.session) {
            goto("/dashboard")
        }
    })
</script>

<div class="container">
    <h1>Quick Surveys, Quicker Analytics</h1>

    {#if !$page.data.session}
    <Button on:click={() => {signIn("google")}}>
        Sign In with <b>Google</b>
    </Button>
    {:else}
        <p>Logged in as <b>{$page.data.session.user.name}</b></p>
        <Button on:click={() => {signOut()}}>
            Sign Out
        </Button>
    {/if}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;

        background-color: var(--color-light);
        color: var(--color-dark);
    }

</style>