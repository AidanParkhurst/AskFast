<script>
    import { signIn, signOut } from "@auth/sveltekit/client";
    import { onMount } from "svelte";
    import { page } from "$app/stores"
    import { goto } from "$app/navigation"
    import Button from "$lib/components/Button.svelte";

    let email = "";
    let isValid = (email) => {
        return !email.includes("@") || !email.includes(".");
    }
    onMount(() => {
        if ($page.data.session) {
            console.log($page.data.session)
            goto("/dashboard")
        }
    })
</script>

<svelte:head>
    <title>AskFast - Sign In</title>
    <meta name="description" content="Sign in, or create a free account with Ask Fast! Start surveying and learning from responses easily, with this AI powered webapp.">
</svelte:head>

<div class="container">
    <div class="menu">
        <h1>Sign in to <b>Ask Fast</b></h1>
        <form on:submit={() => {signIn("nodemailer", {email, callbackUrl: '/dashboard'})}}>
            <input bind:value={email} class="entry" type="text" name="email" placeholder="Email" />
            <Button class="signin"
                disabled={isValid(email)}>
                <h3>Continue with <b>Email</b></h3>
            </Button>
        </form>
        <h3 class="or">——— or ———</h3>
        <Button class="signin" on:click={() => {signIn("google")}}>
            <div class="label">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google logo">
                <h3>Sign in with <b>Google</b></h3>
            </div>
        </Button>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;

        background-color: var(--color-light);
    }
    .menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        border-radius: 15px;
        border: 2px solid var(--color-border);
        background: var(--color-light);
        box-shadow: 5px 5px 20px var(--color-border);
        
        padding: 1em;
    }

    h1 {
        font-size: 1.5em;
        font-weight: normal;
        margin: 0 0 1em 0;
        color: var(--color-mid);
    }
    h1 b {
        color: var(--color-info);
    }

    form {
        display: flex;
        flex-direction: column;
        margin: 0;
    }
    .entry {
        margin: 0 0 0.5em 0;
        padding: 0.5em;

        font-size: 1.5em;
        border-radius: 5px;
        border: none;
        background: var(--color-border);
        color: var(--color-dark);
    }
    .entry::placeholder {
        color: var(--color-mid);
    }

    h3.or {
        font-size: 1.2em;
        font-weight: normal;

        margin: 0.5em 0;
        color: var(--color-mid);
    }

    .label {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
    }
    h3 {
        font-weight: normal;
    }
</style>