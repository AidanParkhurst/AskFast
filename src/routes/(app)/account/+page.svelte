<script>
    import Button from "$lib/components/Button.svelte";
    import { signOut } from "@auth/sveltekit/client";

    let addBalanceLink = "https://buy.stripe.com/test_14kaF12AxfxqcUgcMN";
    
    let formatBalance = (balance) => {
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
    <!--
    <a href={addBalanceLink} class="icon green">
        <h2>Add Balance</h2>
        <h1>{formatBalance(user.balance)}</h1>
    </a>-->
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
    a h2 {
        margin: 0;
    }
    a.icon {
        text-decoration: none;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background-color: transparent;
        color: var(--color-mid);
        width: 75%;
        height: 25%;

        padding: 0.5rem 1rem;
        margin: 1rem;

        border: none;
        border-radius: 0.25rem;

        transition: 0.3s all;
    }
    .green {
        background-color: var(--color-light);
        color: var(--color-mid);
    }
    .green:hover {
        background-color: var(--color-border);
        color: var(--color-success);
    }
    .green:active {
        background-color: var(--color-success);
        color: var(--color-light);
    }
    
    @media (max-width: 700px) {
        a.icon {
            width: 100%;
            height: 75%;
            font-size: 0.8rem;
        }
    }
</style>