<script>
    import { page } from "$app/stores"
    import { goto } from "$app/navigation"
    import Button from "$lib/components/Button.svelte"
    import Footer from "$lib/components/Footer.svelte"
    import {access} from "$lib/pay/links"

    let show = (page) => {
        // scroll to the pricing div
        document.getElementById(page).scrollIntoView({behavior: "smooth"})
    }
</script>

<svelte:head>
    <title>AskFast</title>
    <meta name="description" content="Ask questions. Learn from responses. Surveying made simple with AI analysis. Ask Fast allows you to create questionnaires, read responses in real time, and parse results with AI.">
</svelte:head>

<div class="container">
    <div class="nav">
        <h4 class="name"> AskFast </h4>
        <Button class="start"
        on:click={() => {goto("/dashboard")}}>
            <b>Dashboard</b> 
        </Button>
    </div>
    <div class="hero">
        <h1>Make Surveys that Listen</h1>
        <h2>Then analyze natural, open ended responses, fast.</h2>
        <Button class="hero" on:click={() => {goto("/create")}}>
            Start Surveying Fast
        </Button>
        <h4 class="underhero">Start now for free!</h4>
        <div class="visual">
            ¿?
        </div>

    </div>

    <h4 class="bottom">or learn more<br>↓</h4>

    <div class="banner">
        <div class="info">
            <h2>Curious what people think?</h2>
            <p>Set an objective, write some questions, and find out!</p>
        </div>
        <div class="fakeForm">
            <h4 class="title">Objective</h4>
            <h4 class="input">Learn how people make surveys</h4>
            <h4 class="title">Questions</h4>
            <h4 class="input">Got something to ask people?</h4>
            <h4 class="input">What questions will you use?</h4>
            <h4 class="input">Would AI be helpful?</h4>
            <Button style="margin: 0; width: 100%; text-align: left; margin-top: 1rem;"
                    class="small green">
                Create Survey 
            </Button>
        </div>
    </div>

    <div class="banner green">
        <div class="fakeForm">
            <h4 class="title">How would you rate this app?</h4>
            <h4 class="input">9.5/10, needs more cowbell</h4>
            <h4 class="input">It's the best ever!</h4>
            <h4 class="input">Hmm... I'm thinking a strong ten.</h4>
            <h4 class="input">⭐⭐⭐⭐⭐</h4>
        </div>
        <div class="info">
            <h2>Get Authentic Answers</h2>
            <p>Participants express their voice with open ended responses</p>
        </div>
    </div>
    
    <div class="banner blue">
        <div class="info">
            <h2>See The Big Picture</h2>
            <p>Use AI to discover actionable takeaways.</p>
        </div>
        <div class="fakeForm">
            <div class="chat">
                <div class="prompt">
                    <h4>Which features do users enjoy?</h4>
                </div>
                <div class="response">
                    <h4>Based on the responses, several users mention the AI assistance being helpful and efficient.</h4>
                </div>
            </div>
            <div class="message">
                <h4 class="input">
                    <span>What will you ask?</span>
                </h4>
                <Button 
                style="margin: 0.2rem; padding: 0.4rem 0.5rem; width: 20%; border-radius: 10px;"
                class="ai">
                ↑
                </Button>
            </div>
        </div>
    </div>

    <div class="options" id="pricing">
        <div class="pay">
            <h3>Try it Out</h3>
            <span class="pricing">
                <h2>Free!</h2>
            </span>
            <ul class="perks">
                <li>Up to 3 surveys</li>
                <li>Uncapped survey length</li>
                <li>Response viewer</li>
                <li>Non-priority support</li>
            </ul>
            <a href="/signin" class="buy">Try <b>AskFast</b></a>
        </div>
        <div class="pay promo">
            <h3>Access Everything</h3>
            <span class="pricing">
                <h4>$8</h4><h2>$4</h2><h3>USD</h3>
            </span>
            <ul class="perks">
                <li>Unlimited surveys</li>
                <li>Uncapped survey length</li>
                <li>Real time response viewer</li>
                <li>$4 credit for AI analysis</li>
                <li>Responsive support</li>
            </ul>
            <a href="{access}" class="buy promo">Buy <b>AskFast</b></a>
        </div>
    </div>
    <Footer/>
</div>

<style>
    .container {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -2;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
        min-height: 100vh;
        height: fit-content;

        background-color: var(--color-light);
        color: var(--color-dark);
    }
    .nav {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        width: var(--reasonable-width);
    }
    h4 {
        font-size: 1.5rem;
        margin: 1rem 0;
    }
    h4.name {
        font-size: 1.2rem;
        margin: 0;
        color: var(--color-mid);

        transition: 0.3s all;
    }
    h4.name:hover {
        color: var(--color-info);

        cursor: default;
    }
    a {
        font-size: 1.1rem;
        margin: 1rem 0;
        font-weight: 500;
        color: var(--color-mid);
        text-decoration: none;
        cursor: pointer;

        transition: 0.3s all;
    }
    a:hover {
        color: var(--color-info);
    }
    
    .hero {
        height: fit-content;
        width: var(--reasonable-width);
    }
    h1 {
        font-size: 3rem;
        font-weight: bold;
        margin: 10rem 0 0.5rem 0;
        color: var(--color-dark);
    }
    h2 {
        font-size: 1.5rem;
        margin: 0 0 3rem 0;
        color: var(--color-mid);
    }
    h4.underhero {
        margin-top: 2rem;
        margin-bottom: 23rem;
        font-size: 1.2rem;
        color: var(--color-mid);
    }
    .visual {
        position: absolute;
        top: 0;
        left: 54rem;

        user-select: none;
        -webkit-user-select: none;
        pointer-events: none;

        font-family: 'Inter', sans-serif;
        font-size: 30rem;
        font-weight: 600;
        --top-color: var(--color-info);
        --side-color: #ccc;
        color: var(--top-color);
        transform: rotate(10deg);
        text-shadow: 0 5px 0 var(--side-color),
                     0 10px 0px var(--side-color),
                     15px 20px 20px var(--color-border);
    }
    h4.bottom {
        position: absolute;
        top: 90vh;
        font-size: 1rem;
        text-align: center;
        color: var(--color-info);
    }

    .banner {
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        width: var(--reasonable-width);

        padding: 2rem 1rem;
        margin: 0 0 20rem 0;

        background-color: var(--color-dark);
        color: var(--color-light);
    }
    .banner h2{
        color: var(--color-light);
        margin: 0 0 1rem 0;
    }
    .banner p {
        color: var(--color-light);
        margin: 0;
    }
    .banner.green {
        padding-left: 2rem;
        padding-right: 0;
        background-color: var(--color-success);
    }
    .banner.blue {
        background-color: var(--color-info);
        margin-bottom: 15rem;
    }
    .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0;
        margin: 0;
    }
    .fakeForm {
        padding: 1rem;
        width: 20%;
        height: 50%;
        transform: scale(1.8);

        color: var(--color-dark);

        background-color: var(--color-light);
        border: 2px var(--color-border) solid;
        border-radius: 10px;

        transition: 0.3s all;
    }
    .fakeForm .title {
        font-size: .8rem;
        margin: 0.5rem 0;
        color: var(--color-mid);
    }
    .fakeForm .input {
        font-size: 0.75rem;
        font-weight: normal;
        background-color: var(--color-border);
        border-radius: 5px;
        padding: 0.5rem;
        margin: 0.5rem 0;

        transition: 0.3s all;
    }
    .fakeForm .input:hover {
        transform: scale(1.1);
    }

    .prompt {
        width: fit-content;

        margin: 0 0 0.5rem auto;

        border-radius: 10px 10px 0 10px;
        background-color: var(--color-info);
        color: var(--color-light);

        transition: 0.3s all;
    }
    .prompt h4 {
        font-size: 0.75rem;
        padding: 0.5rem;
        margin: 0;
        font-weight: normal;
    }
    .prompt:hover {
        transform: scale(1.1);
    }
    .response {
        width: 80%;

        margin: 0 0 0.5rem 0;

        border-radius: 10px 10px 10px 0;
        background-color: var(--color-border);
        color: var(--color-dark);
        
        transition: 0.3s all;
    }
    .response h4 {
        font-size: 0.75rem;
        padding: 0.5rem;
        margin: 0;
        font-weight: normal;
    }
    .response:hover {
        transform: scale(1.1);
    }
    .message {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .message .input {
        width: 100%;
        margin: 0;
        color: var(--color-mid);
    }
    .message .input:hover {
        transform: none;
    }
    .options {
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        width: var(--reasonable-width);
    }
    .pay {
        display: flex;
        flex-direction: column;

        height: fit-content;
        width: calc(var(--reasonable-width) / 2);

        margin-bottom: 10rem;
        padding: 2rem;

        border-radius: 15px;
        border: 2px solid var(--color-border);
        box-shadow: 5px 5px 20px var(--color-border);

        background-color: var(--color-light);

        transition: 0.3s all;
    }
    .pay.promo {
        border: 2px solid var(--color-success);
    }
    .pay h3 {
        margin: 0 0 1rem 0;
    }
    .pricing h4 {
        display: inline;

        color: var(--color-mid);
        text-decoration: line-through;
        font-size: 1.5rem;

        margin: 0 0.5rem 0 0;
    }
    .pricing h2 {
        display: inline;

        color: var(--color-dark);
        font-size: 2.5rem;

        margin: 0 0.5rem 0 0;
    }
    .pricing h3 {
        display: inline;

        color: var(--color-mid);
        font-size: 1rem;
        margin: 0;
    }

    .perks {
        list-style: none;
        padding: 0;
        font-size: 1.5rem;
        color: var(--color-mid);
    }
    .perks li {
        margin-bottom: 1rem;
        padding: 0.5rem 0.1rem;

        border-radius: 10px;
        color: var(--color-dark);

        transition: 0.3s all;
    }
    .perks li:before {
        color: var(--color-success);
        content: "✓ ";
    }
    .perks li:hover {
        color: var(--color-success);
        transform: scale(1.05);
    }
    
    a.buy {
        margin: 1rem 0 0 0;
        padding: 0.5rem 1rem;

        font-size: 1.5rem;

        border-radius: 10px;
        background-color: var(--color-dark);
        
        color: var(--color-light);
        text-decoration: none;
        text-align: center;

        transition: 0.3s all;
    }
    a.buy.promo {
        background-color: var(--color-success);
        transition: 0.3s all;
    }
    a.buy:hover {
        background-color: var(--color-info);
    }
    a.buy:active {
        transform: scale(0.95);
    }

    @media (max-width: 700px) {
        .visual {
            position: unset;
            font-size: 18rem;
            margin: -4rem 0 10rem 0;
        }
        .hero {
            text-align: center;
        }
        .hero h1 {
            margin-top: 2rem;
        }
        .hero h2 {
            margin-bottom: 0;
        }
        h4.underhero {
            margin-top: 0.5rem;
            margin-bottom: 1rem;
        }
        h1 {
            font-size: 1.8rem;
        }
        h2 {
            font-size: .9rem;
        }
        h4.underhero {
            font-size: 0.8rem;
            margin-top: 0rem;
        }
        h4.bottom {
            top: 80vh;
        }
        
        .info {
            margin: 0;
            padding: 0 2rem;
        }
        .info h2 {
            font-size: 1.5rem;
        }
        .banner {
            flex-direction: column;
            align-items: center;

            height: 90vh;
            padding: 1rem;
            
            border-radius: 15px;

            margin-bottom: 10rem;
        }
        .banner.green {
            padding: 1rem;
        }
        .banner.green .fakeForm {
            margin: 2rem 0 0 0;
        }
        .banner.blue {
            margin-bottom: 7rem;
        }
        .banner.blue .fakeForm {
            margin: 0 0 3rem 0;
        }
        .fakeForm {
            width: 50%;
            height: fit-content;
            transform: scale(1.5);
            margin: 2rem 0 3rem 0;
        }
        .pay {
            width: 70%;
        }
        .perks {
            font-size: 1.2rem;
        }

        .options {
            flex-direction: column;
            align-items: center;
        }
    }
</style>