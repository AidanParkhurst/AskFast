# Survey Tool
Create surveys and analyze responses fast with this **AI powered** webapp!👋 <br>
Built using **SvelteKit**, and tested using **Vite**. 🏎️

### Setting up
1. ``git clone`` this repo
2. ``npm install`` in the project directory
3. Create a .env file containing:
    - `NODE_ENV`: "development" or "production"
    - `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Google OAuth API keys
    - `AUTH_SECRET`: A string of your choosing, at least 32 characters long
    - `MONGO_URI`: A MongoDB database URL
4. ``npm run dev`` at any time to launch the reactive webserver