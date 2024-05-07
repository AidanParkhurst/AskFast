<button on:click
		on:mouseover
		on:mouseenter
		on:mouseleave
           on:focus
	{...$$restProps}>
		<slot/>
</button>

<style>
    button {
        font-family: 'Inter', sans-serif;
        font-size: 1rem;

        padding: 0.5rem 1rem;
        margin: 1rem;

        border: none;
        border-radius: 0.25rem;

        background-color: var(--color-dark);
        color: var(--color-light);
        cursor: pointer;

        transition: all 0.3s;
    }

    button:hover {
        background-color: var(--color-border);
        color: var(--color-dark);
    }

    button:active {
        scale: 0.95;
    }

    button:disabled {
        background-color: var(--color-border);
        color: var(--color-mid);
        cursor: not-allowed;
    }

    button.signin {
        margin-bottom: 11rem;
    }

    button.form {
        text-align: left;
        font-weight: bold;
        margin: 0;
        margin-top: 1.5rem;
        width: 100%;
    }
    .green {
        background-color: var(--color-success);
        color: var(--color-light);
    }
    .green:hover {
        color: var(--color-success);
    }

    .blue {
        background-color: var(--color-info);
        color: var(--color-light);
    }
    .blue:hover {
        color: var(--color-info);
    }

    .large {
        font-size: 1.5rem;
        padding: 1rem 2rem;
    }
    .bold {
        font-weight: bold;
    }

    .small {
        font-size: .8rem;
        padding: 0.25rem 0.5rem;
    }

    .icon {
        background-color: transparent;
        color: var(--color-mid);
        width: 75%;
        height: 25%;
    }
    .icon:hover {
        background-color: var(--color-border);
    }
    .icon:active {
        background-color: var(--color-dark);
        color: var(--color-light);
    }
    .icon.green {
        background-color: var(--color-light);
        color: var(--color-mid);
    }
    .icon.green:hover {
        background-color: var(--color-border);
        color: var(--color-success);
    }
    .icon.green:active {
        background-color: var(--color-success);
        color: var(--color-light);
    }
    .icon.blue {
        background-color: var(--color-light);
        color: var(--color-mid);
    }
    .icon.blue:hover {
        background-color: var(--color-border);
        color: var(--color-info);
    }
    .icon.blue:active {
        background-color: var(--color-info);
        color: var(--color-light);
    }
</style>