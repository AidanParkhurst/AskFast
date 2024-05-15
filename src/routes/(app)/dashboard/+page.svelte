<script>
    import { goto } from "$app/navigation"

    export let data;
    
    let handleKey = (e) => {
        if (e.key === "Enter") {
            createSurvey()
        }
    }
    
    let createSurvey = () => {
        goto("/create");
    }

    let inspect = (id) => {
        goto(`/dashboard/${id}`)
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
        {#await data.streamed.surveys then surveys}
        {#each surveys as survey}
            <div class="survey" role="button" tabindex="0"
                on:click={() => {inspect(survey.id)}}
                on:keydown={handleKey}>
                <div class="stat header">
                    <h2>{survey.title}</h2>
                    <p>{survey.objective}</p>
                </div>
                <div class="stat">
                    <h3>Questions</h3>
                    <p>{survey.questions.length}</p>
                </div>
                <div class="stat">
                    <h3>Responses</h3>
                    <p>{survey.responses.length}</p>
                </div>
                <div class="stat">
                    <h3>Open</h3>
                    <p>{survey.published ? "Yes" : "No"}</p>
                </div>
            </div>
        {/each}
        {:catch error}
        <p>{error.message}</p>
        {/await}
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
    .toprow h1 {
        font-size: 2rem;
    }

    .surveys {
        width: 80%;
        height: 80%;

        display: flex;
        flex-direction: column;
        align-items: center;

        overflow-y: scroll;
        scroll-behavior: smooth;

        background-color: var(--color-light);
        color: var(--color-dark);

        border-radius: 15px;
        border: 2px solid var(--color-border);

        box-shadow: 5px 5px 20px var(--color-border); 
    }
    .survey {
        width: 90%;
        min-height: 20%;
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
        background-color: var(--color-dark);
        color: var(--color-light);
    }
    .survey.create:hover {
        background-color: var(--color-success);
        color: var(--color-light);
    }
    .survey:nth-last-child(1) {
        margin-bottom: 1rem;
    }

    .stat {
        height: 100%;
        max-width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        padding: 0 1rem;
    }
    .stat.header {
        max-width: 40%;
        width: 40%;
        align-items: start;
    }
    .stat h2 {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--color-dark);
        margin: 0 0 0.5rem 0;
    }
    .stat h3 {
        font-size: 1rem;
        font-weight: 500;
        color: var(--color-mid);
        margin: -1rem 0 0.5rem 0;
    }
    .stat p {
        font-size: 1rem;
        font-weight: 500;
        color: var(--color-dark);
        margin: 0;
    }

    @media (max-width: 700px) {
        .surveys {
            width: 90%;
        }
        .survey {
            height: 30%;
            min-height: 30%;
        }
        .stat h2 {
            font-size: 1.2rem;
        }
        .stat h3 {
            font-size: 0.8rem;
        }
    }
</style>