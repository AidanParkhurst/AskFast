<script>
    import Button from "$lib/components/Button.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { signOut } from "@auth/sveltekit/client";
    import { addBalance } from "$lib/pay/links"
    
    let formatBalance = (balance) => {
        if (!balance) return "$0.00";
        return `$${(balance/100).toFixed(2)}`;
    }
    export let data;
</script>

<svelte:head>
    <title>AskFast - Account</title>
    <meta name="description" content="The account tab for AskFast, an AI powered question asking app, where users can sign out, or add balance.">
</svelte:head>

<div class="container">
    {#await data.streamed.user}
    <h1>Loading...</h1>
    {:then user} 
    <Button class="icon red"
        on:click={signOut}>
        <h2>Sign out</h2>
        {#if user.name}
            <h1>{user.name}</h1>
        {:else}
            <h1>{user.email}</h1>
        {/if}
    </Button>
    <Button class="icon green"
        on:click={() => {window.location = addBalance}}>
        <h2>Add Balance</h2>
        <h1>{formatBalance(user.balance)}</h1>
    </Button>
    {/await}
</div>
<Footer />
<style>
    .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 100vh;

        background-color: var(--color-light);
    }

    @media (max-width: 700px) {
        .container {
            padding: 5vh 0 15vh 0;
            height: 60vh;
            flex-direction: column;
        }
    }
</style>