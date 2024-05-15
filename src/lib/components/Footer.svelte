<div class="container">
    <div class="contents">
        <div class="company">
            <h1>Ask Fast</h1>
            <p>Create, share, and analyze surveys fast!</p>
            <p>Copyright © 2024 - All rights reserved</p>
        </div>
        <div class="links">
            <h2>Links</h2>
            <a href="mailto:aidanp@rkhur.st">Support</a>
            <a href="https://rkhur.st">Made by Aidan Parkhurst</a>
        </div>
        <div class="links">
            <h2>Legal</h2>
            <a href="/terms">Terms of Service</a>
            <a href="/privacy">Privacy Policy</a>
        </div>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        width: 100%;

        min-height: 30vh;
        height: fit-content;

        background-color: var(--color-light);

        border-top: 2px solid var(--color-border);
        box-shadow: 5px 5px 20px var(--color-border);
    }
    .contents {
        width: var(--reasonable-width);
        
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    .company {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .company h1 {
        font-size: 1.5em;
        color: var(--color-dark);
        margin: 0;
    }
    .company p {
        font-size: 1em;
        color: var(--color-mid);
        margin: 0;
    }

    .links {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .links h2 {
        font-size: 1.2em;
        color: var(--color-mid);
        margin: 0;
    }
    .links a {
        font-size: 1em;
        color: var(--color-dark);
        text-decoration: underline;
        margin: 0.2em 0;

        transition: 0.3s all;
    }
    .links a:hover {
        color: var(--color-mid);
    }

    @media (max-width: 700px) {
        .contents {
            flex-direction: column;
            justify-content: center;
            padding: 1rem 0;
            gap: 1em;

            text-align: center;
        }
    }
</style>