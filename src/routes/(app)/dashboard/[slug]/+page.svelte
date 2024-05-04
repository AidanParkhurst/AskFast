<script>
    import Button from "$lib/components/Button.svelte";
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

    let publish = () => {
        // Todo: Publish the survey
    }
</script>

<div class="container">
    <div class="contents">
        <h1 class="title">{title}</h1>
        <h2 class="objective">{objective}</h2>

        <div class="section">
            <h3 class="">Publicity</h3>
            <div class="stat">
                <h2>Accepting Answers:</h2> 
                <label class="switch">
                    <input type="checkbox" checked={published} on:change={publish}>
                    <span class="slider"></span>
                </label>
            </div>
            <div class="stat">
                <h2>Shareable Link:</h2>
                <a href="/s/{id}">http://localhost:5173/s/{id}</a>
                <Button class="blue" on:click={copyLink}>Copy Link</Button>
            </div>
        </div>
    </div>
</div>

<style>
    .container {
        margin: 0;
        height: 100%;
        width: 100%;

        overflow: auto;
        
        display: flex;
        flex-direction: column;

        background-color: var(--color-light);
        color: var(--color-dark);
    }
    .contents {
        padding: 5% 10%;
    }

    h1.title {
        font-size: 2rem;
        font-weight: bold;
        margin: 0 0 0.5em 0;
        color: var(--color-dark);
    }
    h2.objective {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0;
        color: var(--color-mid);
    }

    .section {
        margin: 2em 0;
    }
    .section h3 {
        color: var(--color-mid);
        font-size: 1rem;
        margin: 0 0 0.5em 0;
    }
    .stat {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1em;

        margin: 0 0 1em 0;
        color: var(--color-dark);
    }
    .stat h2 {
        margin: 0;
    }
    a {
        font-size: 1.2rem;
        color: var(--color-info);
        text-decoration: none;
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
        width: 3em;
        height: 1.5em;
    }
    .slider {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;

        border-radius: 2em;
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
</style>