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

    button.start {
        background-color: var(--color-border);
        color: var(--color-mid);
    }
    button.start:hover {
        background-color: var(--color-dark);
        color: var(--color-light);
    }

    button.signin {
        margin: 0;
        padding: 0;
        width: 100%;

        background-color: var(--color-border);
        color: var(--color-dark);
    }
    button.signin:disabled {
        color: var(--color-mid);
    }
    button.signin:disabled:hover {
        background-color: var(--color-border);
        color: var(--color-mid);
    }
    button.signin:hover {
        background-color: var(--color-dark);
        color: var(--color-light);
    }
    button.ai {
        width: 10%;
        margin-top: 0;
        margin-bottom: 0;
        border-radius: 15px;
        color: var(--color-mid);
        background-color: var(--color-border);
    }
    button.ai:hover {
        color: var(--color-light);
        background-color: var(--color-info);
    }
    button.ai:active {
        background-color: var(--color-info);
        color: var(--color-highlight);
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

    .back {
        position: absolute;
        top: 1rem;
        left: 1rem;
        
        margin: 0;
        padding: 0 1rem;
        
        width: fit-content
    }

    .small {
        font-size: .8rem;
        padding: 0.25rem 0.5rem;
    }
    
    .hero {
        margin: 0;
        padding: 1rem 2rem;
        font-size: 1.5rem;
        border-radius: 0.25rem;
        font-weight: bold;
        background-color: var(--color-info);
    }
    .hero:hover {
        color: var(--color-info);
        transform: scale(1.05);
    }
    .hero:active {
        animation: wiggle 0.4s forwards;
    }

    @keyframes wiggle {
        0% {
            transform: scale(1.05) rotate(0deg);
        }
        33% {
            transform: scale(1.03) rotate(2deg);
        }
        66% {
            transform: scale(1.01) rotate(-2deg);
        }
        100% {
            transform: scale(0.98) rotate(0deg);
        }
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
    .icon.red {
        background-color: var(--color-light);
        color: var(--color-mid);
    }
    .icon.red:hover {
        background-color: var(--color-border);
        color: var(--color-danger);
    }
    .icon.red:active {
        background-color: var(--color-danger);
        color: var(--color-light);
    }

    @media (max-width: 700px) {
        button.icon {
            width: 100%;
            height: 75%;
            font-size: 0.8rem;
        }
        button.ai {
            width: 25%;
        }
        button.back {
            font-size: 0.8rem;
            padding: 0rem 0.5rem;
            top: 0.5rem;
            left: 0.5rem;
        }
        button.hero {
            margin: 1rem 0 0.2rem 0;
        }
    }
</style>