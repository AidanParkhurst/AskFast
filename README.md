# Ask Fast 
Create surveys and analyze responses fast with this **AI powered** webapp!👋 <br>
Built using **SvelteKit**, and tested using **Vite**. 🏎️

### Setting up
1. ``git clone`` this repo
2. ``npm install`` in the project directory
3. Create a .env file containing:
    - `NODE_ENV`: "development" or "production"
    - `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Google OAuth API keys
    - `AUTH_SECRET`: A string of your choosing, at least 32 characters long
    - `MONGO_URI`: A MongoDB database connection string 
    - `OPENAI_SECRET_KEY`: An OpenAI api key for ChatGPT completions
    - `STRIPE_SECRET_KEY` & `STRIPE_ENDPOINT_SECRET`: Stripe keys, for your account and webhooks
    - `MAILTRAP_PASS`: The password for SMTP email sending via Mailtrap
### Running
- Run ``npm run dev`` at any time to launch the reactive webserver.
- To test on mobile:
    1. Connect to the same wifi as your phone (If on public wifi, use a hotspot)
    2. Run ``npm run dev -- --host`` (note the two sets of --)
