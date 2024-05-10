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
    <Button class="large signin" on:click={() => {signIn("google")}}>
        Sign In with <b>Google</b>
    </Button>
    {/if}

    <h4 class="bottom">or learn more<br>↓</h4>

    <div class="banner">
        <div class="info">
            <h2>Curious what people think?</h2>
            <p>Set an objective, write some questions, and find out!</p>
        </div>
        <div class="fakeForm">
            <h4 class="title">Objective</h4>
            <h4 class="input">Find out how people survey</h4>
            <h4 class="title">Questions</h4>
            <h4 class="input">Got something to ask people?</h4>
            <h4 class="input">What questions will you use?</h4>
            <h4 class="input">Would AI be helpful?</h4>
            <Button style="margin: 0; width: 100%; text-align: left; margin-top: 1rem;"
                    class="small green">
                Start Surveying
            </Button>
        </div>
    </div>

    <div class="banner green">
        <div class="fakeForm">
            <h4 class="title">How would you rate this app?</h4>
            <h4 class="input">9.5/10, needs more cowbell</h4>
            <h4 class="input">It's the best ever!</h4>
            <h4 class="input">Hmm... I'm thinking a strong ten.</h4>
            <h4 class="input">⭐⭐⭐⭐⭐</h4>
        </div>
        <div class="info">
            <h2>Get Real Answers</h2>
            <p>Participants express their voice with open ended responses</p>
        </div>
    </div>
    
    <div class="banner blue">
        <div class="info">
            <h2>See The Big Picture</h2>
            <p>Use AI, and discover actionable takeaways.</p>
        </div>
        <div class="fakeForm">
            <h4 class="input">
                <span>How likely are users to </span>
            </h4>
        </div>
    </div>
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
        margin: 15rem 0 0.5rem 0;
        color: var(--color-dark);
    }
    h2 {
        font-size: 2rem;
        margin: 0 0 1rem 0;
        color: var(--color-mid);
    }
    h4 {
        font-size: 1.5rem;
        margin: 1rem 0;
    }
    h4.bottom {
        margin: 0 0 20rem 0;
        font-size: 1rem;
        text-align: center;
        color: var(--color-info);
    }

    .banner {
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        width: var(--reasonable-width);

        padding: 2rem 1rem;
        margin: 0 0 20rem 0;

        background-color: var(--color-dark);
        color: var(--color-light);
    }
    .banner h2{
        color: var(--color-light);
        margin: 0 0 1rem 0;
    }
    .banner p {
        color: var(--color-light);
        margin: 0;
    }
    .banner.red {
        background-color: var(--color-danger);
    }
    .banner.green {
        background-color: var(--color-success);
    }
    .banner.blue {
        background-color: var(--color-info);
    }
    .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0;
        margin: 0;
    }
    .fakeForm {
        padding: 1rem;
        width: 20%;
        height: 50%;
        transform: scale(1.8);

        color: var(--color-dark);

        background-color: var(--color-light);
        border: 2px var(--color-border) solid;
        border-radius: 10px;

        transition: 0.3s all;
    }
    .fakeForm .title {
        font-size: .8rem;
        margin: 0.5rem 0;
        color: var(--color-mid);
    }
    .fakeForm .input {
        font-size: 0.75rem;
        font-weight: normal;
        background-color: var(--color-border);
        border-radius: 5px;
        padding: 0.5rem;
        margin: 0.5rem 0;

        transition: 0.3s all;
    }
    .fakeForm .input:hover {
        transform: scale(1.1);
    }

</style>