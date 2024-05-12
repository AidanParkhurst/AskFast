<script>
    import Button from "$lib/components/Button.svelte";
    import { signOut } from "@auth/sveltekit/client";

    export let data;
</script>
<div class="container">
    {#await data.streamed.user}
    <h1>Loading...</h1>
    {:then user} 
    <Button class="icon red"
        on:click={signOut}>
        <h2>Sign out</h2>
        <h1>{user.name}</h1>
    </Button>
    <Button class="icon green">
        <h2>Add Balance</h2>
        <h1>{user.balance}</h1>
    </Button>
    {/await}
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 100vh;

        background-color: var(--color-light);
    }
</style>