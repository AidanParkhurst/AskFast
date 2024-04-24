<script>
    import Button from "$lib/components/Button.svelte"
    import { fade } from "svelte/transition";

    let questionIndex = -1;
    let name = "";
    let objective = "";
    let questions = [];

    $: valid = 
        name.length > 0 && objective.length > 0
        && (questions.length > 0 ? questions.every(q => q.length > 0) : true)

    let addQuestion = () => {
        questionIndex += 1;
        questions = [...questions, ""]
    }

    let deleteQuestion = (e, i) => {
        if ((e.key === "Backspace" || e.key === "Delete") && questions[i].length === 0) {
            questions = questions.filter((_, index) => index !== i);
            questionIndex -= 1;

            /* Previously, holding down the backspace key would delete all questions */
            /* So this solution just moves the focus to the create button */
            /* Then removes the focus entirely */
            let button = document.getElementsByClassName('create')[0];
            button.focus();
            button.blur();
        }
    }
</script>

<div class="container">
    <form method="POST" enctype="multipart/form-data">
        <h2>Title</h2>
        <input type="text" class="entry" name="title" placeholder="Survey on..." bind:value={name}/>
        <h2>Objective(s)</h2>
        <textarea class="entry" name="objective" cols="80" rows="3" placeholder="Find out how people feel about..." bind:value={objective}/>
        {#if questionIndex >= 0}
            <div style="width: 100%;" transition:fade>
            <h2>Questions</h2>
            {#each questions as _, i}
                <textarea 
                    class="entry question"
                    name="q{i}"
                    cols=30 rows="2"
                    bind:value={questions[i]}
                    on:keydown={(e) => {deleteQuestion(e, i)}}
                    placeholder="What do you think about..." />
            {/each}
            <button type="button" class="create" on:click={addQuestion}>
                <h2>+ Add A Question</h2>
            </button>
            </div>
            <Button
                style= "text-align: left; font-weight: bold; margin-top: 2em;"
                disabled="{questionIndex < 1 || !valid}"
                class="large green">
                    Create Survey 
            </Button>
        {:else}
        <Button
            on:click={() => {questionIndex += 1}}
            type="button"
            style= "text-align: left; font-weight: bold; margin-top: 2em;"
            disabled="{!valid}"
            class="large blue">
               Continue 
        </Button>
        {/if}
    </form>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 90vh;
        height: fit-content;
        padding: 5vh 0;

        background-color: var(--color-light);
        color: var(--color-dark);
    }
    
    form {
        display: flex;
        flex-direction: column;

        width: 50%;
        height: fit-content;

        margin-top: 2em 0 2em 0;

        padding: 1em 2em;

        background-color: var(--color-light);
        color: var(--color-dark);
        
        border-radius: 15px;
        border: 2px solid var(--color-border);

        box-shadow: 5px 5px 20px var(--color-border); 

        transition: 0.3s all;
    }

    h2 {
        font-size: 1.5em;
        color: var(--color-mid);
        margin-bottom: 0.5em;
        transition: 0.3s all;
    }

    .entry {
        font-family: 'Inter', sans-serif;
        font-size: 2em;
        
        margin-bottom: 1em;
        padding: 0.2em .5em;

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
    .entry.question {
        columns: 80;
        margin-bottom: 1em;

        background-color: var(--color-light);
        resize: none;

        transition: 0.3s all;
    }
    .entry.question:hover {
        background-color: var(--color-border);
    }

    textarea {
        resize: none;
    }

    .create {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        background-color: var(--color-border);
        color: var(--color-mid);

        width: 100%;

        border-radius: 15px;
        border: 2px solid var(--color-border);

        cursor: pointer;
        transition: 0.3s all;

        margin: 0.5em 0;
    }

    .create:hover {
        background-color: var(--color-info);
    }
    .create:hover h2 {
        color: var(--color-light);
    }

    .create:active {
        scale: 0.95;
    }
</style>