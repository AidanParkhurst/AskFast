<script>
    import Button from "$lib/components/Button.svelte";
    import { goto } from "$app/navigation";
    import { fade } from "svelte/transition";

    export let data;
    $: title = data.title ?? "Survey Not Found...";
    $: id = data.id ?? "0";
    $: questions = data.questions ?? [];

    let questionIndex = 0;
    let answers = [];
    $: valid =
        answers.length == (questionIndex+1) && answers.every(a => a.length > 0);

    export let form;
</script>

<div class="container">
    {#if form?.success}
        <p>Answers submitted.</p>
        <h1>Thank you for your time!</h1>
        <Button class="green" 
        on:click={() => {goto('/')}}>
            Return to Home 
        </Button>
    {:else if form?.error}
        <p>Try again later.</p>
        <h1>Woops! There was an error submitting your answers</h1>
        <Button class="red"
        on:click={() => {goto('/')}}>
            Return to Home 
        </Button>
    {:else if data?.error}
        <p>Survey unavailable.</p>
        <h1>This survey is currently closed, or the URL is incorrect.</h1>
        <Button on:click={() => {goto('/')}}>
            Return to Home 
        </Button>
    {:else}
    <form method="POST" enctype="multipart/form-data">
        <input type="hidden" name="surveyId" value="{id}"/>
        {#each questions as question, i}
            {#if i <= questionIndex}
                <div class="q" transition:fade>
                    <h2>{question}</h2>
                    <textarea rows="2" name="a{i}" bind:value={answers[i]}/>
                </div>
            {/if}
        {/each}
        {#if questionIndex < questions.length-1}
        <Button
            on:click={() => {questionIndex += 1}}
            type="button"
            disabled="{!valid}"
            class="large blue form">
               Continue 
        </Button>
        {:else}
        <Button
            type="submit"
            disabled="{!valid}"
            class="large green form">
                Submit Survey
        </Button>
        {/if}
    </form>
    {/if}
    <div class="watermark">
        <a href="/">Powered by <b>Ask Fast</b></a>
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
        min-height: 90vh;
        height: fit-content;
        padding: 5vh 0;

        background-color: var(--color-light);
        color: var(--color-dark);
    }

    form {
        display: flex;
        flex-direction: column;
        width: 60%;

        padding: 10px 20px;

        background-color: var(--color-light);
        color: var(--color-dark);
        
        border-radius: 15px;
        border: 2px solid var(--color-border);
        box-shadow: 5px 5px 20px var(--color-border);
    }

    h2 {
        max-width: 30em;
    }
    textarea{
        font-family: 'Inter', sans-serif;
        font-size: 1.2em;
        
        width: calc(100% - 2em);
        margin-bottom: 1em;
        padding: 0.5em 1em;

        background-color: var(--color-border);
        color: var(--color-dark);

        border-radius: 15px;
        border: 2px solid var(--color-border);

        resize: vertical;
    }
    textarea::placeholder {
        color: var(--color-mid);
        opacity: 1;
    }
    textarea::ms-input-placeholder {
        color: var(--color-mid);
    }

    h1 {
        font-size: 2em;
        font-weight: bold;
        color: var(--color-dark);
        margin: 0;
    }

    .watermark {
        position: absolute;
        bottom: 0;
        right: 0;

        padding: 1em;
        color: var(--color-mid);
    }
    .watermark a {
        margin: 0 0 0.5em 0;

        font-size: 1.2em;
        text-decoration: none;
        color: var(--color-mid);
    }
    .watermark a b {
        font-weight: bold;
        transition: 0.3s all;
    }
    .watermark a:hover b {
        color: var(--color-info);
    }

    @media (max-width: 700px) {
        form {
            width: 90%;
        }
    }
</style>