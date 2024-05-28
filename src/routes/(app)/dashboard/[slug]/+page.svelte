<script>
    import Button from "$lib/components/Button.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { addBalance } from "$lib/pay/links"

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
    $: balance = data.balance ?? 0;

    let copyLink = () => {
        navigator.clipboard.writeText(`http://www.askfa.st/s/${id}`);
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

    let prompt = "";
    let sent = undefined;
    let response = undefined;

    let sendPrompt = () => {
        if (prompt.length <= 0) return;

        sent = prompt;
        prompt = "";
        response = undefined;

        fetch("/api/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                survey: id,
                prompt: sent 
            })
        }).then(res => res.json())
        .then(res => {
            response = res.data;
            balance = res.balance;
        });
    }

    export let form;
</script>

<div class="container">
    <h1 class="title">{title}</h1>
    <h2 class="objective">{objective}</h2>
    <div class="details card">
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
    <div class="card ai">
        <h3>Ask about your data</h3>
        <div class="chat">
            {#if sent}
                <div class="sent">
                    <p>{sent}</p>
                </div>
                <div class="inference">
                {#if response}
                    <p>{response}</p>
                {:else}
                    <p style="color: var(--color-mid);">Analyzing {responses.length * questions.length} responses...</p>
                {/if}
                </div>
            {/if}
        </div>
        <div class="message">
            {#if balance}
                <input bind:value={prompt} class="entry" placeholder="What would you like to know?">
                <Button class="ai"
                    on:click={sendPrompt}>
                    <!--Up Arrow-->
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        stroke="currentColor" fill="currentColor">
                        <path d="M12 2l10 10h-7v10h-6v-10h-7z" />
                </Button>
            {:else}
                <input class="entry" disabled=true placeholder="To use AI analysis, first add balance to your account.">
                <Button class="ai" on:click={() => {window.open(addBalance)}}>Add Balance</Button>   
            {/if}
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
<Footer />

<style>
    .container {
        margin: 0;
        padding-top: 5vh;

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
        color: var(--color-dark);
    }
    h2.objective {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0 0 1rem 0;
        color: var(--color-mid);
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

    .card.details {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        border: 2px solid var(--color-border);
        background-color: var(--color-light);
        color: var(--color-dark);
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
        color: var(--color-dark);
        text-align: center;
    }
    .stat h3 {
        color: var(--color-mid);
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
        border: 1px solid var(--color-border);
        background-color: var(--color-border);
        color: var(--color-dark);
    }
    .question.label:active {
        transform: scale(0.95);
        background-color: var(--color-light);
        color: var(--color-dark);
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

    .chat {
        padding: 0 0.5rem 0 0.5rem;
        margin-bottom: 1rem;
    }
    .message {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .sent {
        padding: 0.5rem 1rem;
        margin: 0 0 0.5rem auto;
        width: fit-content;

        border-radius: 15px 15px 0px 15px;

        background-color: var(--color-info);
        color: var(--color-light);
    }
    .inference {
        padding: 0.5rem 1rem;
        margin: 0;
        width: 80%;
       
        border-radius: 15px 15px 15px 0;
        
        background-color: var(--color-border);
        color: var(--color-dark);
    }
    p {
        font-size: 1.2rem;
    }
    .entry {
        font-family: 'Inter', sans-serif;
        font-size: 1.5em;
        
        padding: 0.2em .5em;
        width: 100%;
        background-color: var(--color-border);
        color: var(--color-dark);

        border-radius: 15px;
        border: 2px solid var(--color-border);
    }
    .entry::placeholder {
        color: var(--color-mid);
        opacity: 1;
    }
    .entry::ms-input-placeholder {
        color: var(--color-mid);
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

    @media (max-width: 768px) {
        .container {
            padding-bottom: 10vh;
        }
    }
</style>