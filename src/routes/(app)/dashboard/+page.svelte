<script>
    import { page } from "$app/stores"
    import { goto } from "$app/navigation"

    /* TODO: Fetch this, possibly in +page.server.js */
    let surveys = [
        {
            title: "Opinions on Surveys",
            objective: "Find out how people feel about being surveyed.",
            responses: 103
        }
    ]

    let handleKey = (e) => {
    /* TODO: Some kind of key handling
        if (e.key === "Enter") {
            createSurvey()
        }
    */
    }
    
    let createSurvey = () => {
        goto("/create");
    }

    let inspect = (title) => {
        console.log(`Inspecting survey: ${title}`)
    }
</script>

<div class="container">
    <div class="toprow">
        <h1>Your Surveys</h1>
    </div>
    <div class="surveys">
        <div class="survey create" role="button" tabindex="0" 
            on:click={createSurvey}
            on:keydown={handleKey}>
            <h2>+ Create a New Survey</h2>
        </div>
        {#each surveys as survey}
            <div class="survey" role="button" tabindex="0"
                on:click={() => {inspect(survey.title)}}
                on:keydown={handleKey}>
                <div class="stat">
                    <h3>Title</h3>
                    <h2>{survey.title}</h2>
                </div>
                <div class="stat">
                    <h3>Objective</h3>
                    <p>{survey.objective}</p>
                </div>
                <div class="stat">
                    <h3>Responses</h3>
                    <p>{survey.responses}</p>
                </div>
            </div>
        {/each}
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
        align-items: center;
        justify-content: center;

        background-color: var(--color-light);
        color: var(--color-dark);
    }

    .toprow {
        width: 80%;
        height: 10%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .surveys {
        width: 80%;
        height: 80%;

        display: flex;
        flex-direction: column;
        align-items: center;

        background-color: var(--color-light);
        color: var(--color-dark);

        border-radius: 15px;
        border: 2px solid var(--color-border);

        box-shadow: 5px 5px 20px var(--color-border); 
    }
    .survey {
        width: 90%;
        height: 20%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        margin: 1rem 0 0 0;
        padding: 0.5rem 2rem 0.5rem 1rem;

        background-color: var(--color-light);
        color: var(--color-dark);

        border-radius: 15px;
        border: 2px solid var(--color-border);

        cursor: pointer;
        transition: 0.3s all;
    }
    .survey:hover {
        background-color: var(--color-border);
    }
    .survey:active {
        scale: 0.95;
    }
    .survey.create {
        justify-content: center;
        background-color: var(--color-border);
        color: var(--color-mid);
    }
    .survey.create:hover {
        background-color: var(--color-success);
        color: var(--color-light);
    }

    .stat {
        height: 100%;
        max-width: 30%;
        display: flex;
        flex-direction: column;
    }
    .stat h2 {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--color-dark);
        margin: 0;
    }
    .stat h3 {
        font-size: 1rem;
        font-weight: 500;
        color: var(--color-mid);
        margin: 1rem 0 0.5rem 0;
    }
    .stat p {
        font-size: 1rem;
        font-weight: 500;
        color: var(--color-dark);
        margin: 0;
    }
</style>