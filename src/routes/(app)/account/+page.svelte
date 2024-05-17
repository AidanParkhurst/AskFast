<script>
    import Button from "$lib/components/Button.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { signOut } from "@auth/sveltekit/client";
    
    let addBalanceLink = "https://buy.stripe.com/6oEaIG5IfgP9cQo145";
    
    let formatBalance = (balance) => {
        if (!balance) return "$0.00";
        return `$${(balance/100).toFixed(2)}`;
    }
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
    <Button class="icon green"
        on:click={() => {window.location = addBalanceLink}}>
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
</style>