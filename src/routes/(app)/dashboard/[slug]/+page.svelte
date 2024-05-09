<script>
    import Button from "$lib/components/Button.svelte";
    import { fade } from "svelte/transition";

    let publishForm;
    /*
        id: surveyEntry._id.toString(),
        title: survey.title,
        objective: survey.objective,
        questions: questions,
        responses: surveyEntry.responses,
        published: surveyEntry.published,
    */
    export let data;

    $: id = data.id ?? "0";
    $: title = data.title ?? "Survey Not Found...";
    $: objective = data.objective ?? "Objective Not Found...";
    $: questions = data.questions ?? [];
    $: responses = data.responses ?? [];
    $: published = data.published ?? false;
    let copyLink = () => {
        navigator.clipboard.writeText(`http://localhost:5173/s/${id}`);
    }

    let selected = -1;
    $: shownResponses = [];
    let select = (i) => {
        shownResponses = responses.map(r => r[i]);
        selected = i;
    }
    let deselect = () => {
        shownResponses = [];
        selected = -1;
    }

    export let form;
</script>

<div class="container">
    <div class="details card">
        <h1 class="title">{title}</h1>
        <h2 class="objective">{objective}</h2>
        <div class="stats">
            <div class="stat">
                <h3>Responses</h3>
                <h2>{responses.length}</h2>
            </div>
            <div class="stat">
                <h3>Questions</h3>
                <h2>{questions.length}</h2>
            </div>
            <div class="stat">
                <h3>Public</h3>
                <form bind:this={publishForm} method="POST" enctype="multipart/form-data">
                    <input type="hidden" name="surveyId" value={id}>
                    <label class="switch">
                        <input type="checkbox" name="publish" checked={published} on:change={publishForm.submit()}>
                        <span class="slider"></span>
                    </label>
                </form>
            </div>
            <Button style="margin: 0;" class="blue" on:click={copyLink}>Copy Link</Button>
        </div>
    </div>
    <div class="card">
        <h3>Responses By Question</h3>
        {#if shownResponses.length > 0}
            <div role="button" tabindex="0" class="question label"
                on:click={deselect}
                on:keydown={deselect}>
                <h2>{questions[selected]}</h2>
            </div>
            {#each shownResponses as response}
                <div class="response">
                    <p>{response}</p>
                </div>
            {/each}
        {:else}
        {#each questions as question, i}
            <div role="button" tabindex="0" class="question"
                on:click={()=>{select(i)}}
                on:keydown={()=>{select(i)}}>
                <h2>{question}</h2>
            </div>
        {/each}
        {/if}
    </div>
    <div class="card">
        <h3>Analyze with AI <b>Pro</b></h3>
        {#await data.streamed.aiSummary}
            <p>Processing...</p>
        {:then aiSummary}
        {#each aiSummary.split("\n") as newline}
            <p>{newline}</p>
        {/each}
        {:catch error}
            <p>Error: {error.message}</p>
        {/await}
    </div>

    {#if form?.success && form?.result}
    <div class="notif success">
        <h3>Survey Opened!</h3>
    </div>
    {:else if form?.success}
    <div class="notif success">
        <h3>Survey Closed</h3>
    </div>
    {:else if form?.error}
    <div class="notif error">
        <h3>Error Updating Survey</h3>
    </div>
    {/if}
</div>

<style>
    .container {
        margin: 0;
        padding-top: 2vh;

        min-height: 100vh;
        height: fit-content;
        width: 100%;

        overflow: auto;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background-color: var(--color-light);
        color: var(--color-dark);
    }

    h1.title {
        font-size: 2rem;
        font-weight: bold;
        margin: 0 0 0.5rem 0;
        color: var(--color-light);
    }
    h2.objective {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0 0 2rem 0;
        color: var(--color-border);
    }

    .card {
        width: var(--reasonable-width);

        margin: 2em 0;
        padding: 1rem;

        background-color: var(--color-light);
        
        border: 2px solid var(--color-border);
        border-radius: 15px;

        box-shadow: 5px 5px 20px var(--color-border);

    }
    .card h3 {
        color: var(--color-mid);
        font-size: 1rem;
        margin: 0 0 0.5rem 0;
    }
    .card h3 b {
        background-color: var(--color-highlight);
        color: var(--color-light);
        padding: 0.2rem 0.4rem;
        margin-left: 0.5rem;
        border-radius: 5px;
    }

    .card.details {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        border: 2px solid var(--color-dark);
        background-color: var(--color-dark);
        color: var(--color-light);
    }
    .stats {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .stat {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .stat h2 {
        margin: 0;
        font-size: 1.5rem;
        color: var(--color-light);
        text-align: center;
    }
    .stat h3 {
        color: var(--color-border);
        margin: 0;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    .switch {
        position: relative;
        cursor: pointer;
        display: inline-block;
        width: 3rem;
        height: 1.5rem;
    }
    .slider {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;

        border-radius: 1.5rem;
        border: 2px solid var(--color-border); 
        background-color: var(--color-border);
        transition: .3s all;
    }
    .slider:before {
        position: absolute;
        width: 50%;
        height: 100%;
        content: "";
        border-radius: 50%;
        background-color: var(--color-mid);
        transition: .3s all;
    }
    .switch input:checked + .slider:before {
        background-color: var(--color-light);
        transform: translateX(100%);
    }

    .switch input:checked + .slider{
        background-color: var(--color-info);
        border: 2px solid var(--color-info); 
    }

    .question {
        margin: 0.5rem 0;
        padding: 0.5rem 1rem;

        cursor: pointer;

        border-radius: 10px;
        border: 1px solid var(--color-border);
        background-color: var(--color-light);
        color: var(--color-dark);

        transition: 0.3s all;

    }
    .question:hover {
        background-color: var(--color-border);
    }
    .question:active {
        transform: scale(0.95);
        background-color: var(--color-dark);
        color: var(--color-light);
    }
    .question.label {
        border: 1px solid var(--color-dark);
        background-color: var(--color-dark);
        color: var(--color-light);
    }
    .question.label:hover {
        border: 1px solid var(--color-danger);
        background-color: var(--color-danger);
        color: var(--color-light);
    }
    .question h2 {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 500;
    }

    .response {
        margin: 0.5rem 0;
        padding: 0.5rem 1rem;

        border-radius: 10px;
        border: 1px solid var(--color-border);
        background-color: var(--color-light);
        color: var(--color-dark);
    }
    .notif {
        position: fixed;
        right: 1rem;
        bottom: 1rem;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        color: var(--color-light);

        border-radius: 10px;
        box-shadow: 5px 5px 20px var(--color-border); 

        transition: 0.3s all;
        animation: fade 1s 3s forwards;
    }
    .notif h3 {
        font-size: 1rem;
        margin: 0;
        padding: 0.5rem 1rem;
    }
    .notif.success {
        background-color: var(--color-info);
    }
    .notif.error {
        background-color: var(--color-danger);
    }

    @keyframes fade {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
</style>