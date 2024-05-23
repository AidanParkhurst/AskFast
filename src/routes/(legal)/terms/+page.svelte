<script>
    import Button from "$lib/components/Button.svelte";
    import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
    <title>AskFast - Terms of Service</title>
    <meta name="description" content="The terms of service, outlining the terms users agree to when signing up for AskFast, a survey building webapp.">
</svelte:head>

<div class="container">
    <div class="contents">
        <Button class="back start" on:click={() => {window.history.back()}}>
            <h4>← Back</h4>
        </Button>

        <h1>Terms of Service</h1>

        <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using Ask Fast (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Service.</p>

        <h2>2. Description of Service</h2>
            <p>Ask Fast allows users to sign up via Google or email, pay an access fee (processed through Stripe), and create questionnaires. Users can send these questionnaires to others and store responses in our MongoDB database. The Service also provides access to the GPT-4 API for analyzing questionnaire responses.</p>

        <h2>3. User Accounts</h2>
            <ul>
                <li><b>Registration:</b> Users can sign up using their Google account or email. By signing up, you agree to provide accurate information.</li>
                <li><b>Account Security:</b> You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account.</li>
            </ul>

        <h2>4. Payments and Balances</h2>
            <ul>
                <li><b>Access Fee:</b> A one-time fee is required to access the Service, which provides an initial balance equivalent to the amount paid.</li>
                <li><b>Balance Management:</b> Users can refill their balance as needed. All payments are processed securely through Stripe.</li>
            </ul>

        <h2>5. Use of Service</h2>
            <ul>
                <li><b>Questionnaire Creation:</b> Users can create and send questionnaires to collect responses.</li>
                <li><b>Data Storage:</b> All questionnaire data and responses are stored securely in our MongoDB database.</li>
                <li><b>Data Analysis:</b> Users can utilize the GPT-4 API to analyze collected responses.</li>
            </ul>

        <h2>6. Privacy and Data Protection</h2>
            <ul>
                <li><b>Data Collection:</b> We collect profile information for Google sign-ins and email addresses for email sign-ups. Payment information is handled by Stripe.</li>
                <li><b>Data Use:</b> Collected data is used to provide and improve the Service. We do not sell your data to third parties.</li>
                <li><b>Data Security:</b> We implement industry-standard security measures to protect your data.</li>
            </ul>

        <h2>7. User Conduct</h2>
            <ul>
                <li><b>Prohibited Activities:</b> Users may not use the Service for any unlawful purposes or in a way that violates these Terms.</li>
                <li><b>Content Responsibility:</b> Users are responsible for the content they create and distribute via the Service.</li>
            </ul>

        <h2>8. Intellectual Property</h2>
            <ul>
                <li><b>Ownership:</b> All content and materials on the Service are the property of Ask Fast or its licensors.</li>
                <li><b>User Content:</b> By submitting content to the Service, you grant us a license to use, reproduce, and distribute your content as necessary to provide the Service.</li>
            </ul>

        <h2>9. Termination</h2>
            <p>We reserve the right to suspend or terminate your access to the Service at our discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users.</p>

        <h2>10. Disclaimer of Warranties</h2>
            <p>The Service is provided "as is" and "as available" without warranties of any kind. We do not guarantee that the Service will be uninterrupted or error-free.</p>

        <h2>11. Limitation of Liability</h2>
            <p>In no event shall Ask Fast be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Service.</p>

        <h2>12. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Your continued use of the Service constitutes acceptance of the updated Terms.</p>

        <h2>13. Contact Information</h2>
            <p>For any questions about these Terms, please contact us at support@askfa.st.</p>
    </div>
    <Footer />
</div>

<style>
    .container {
        position: absolute;
        top: 0;
        left: 0;

        min-height: 100vh;
        height: fit-content;

        background-color: var(--color-light);
    }

    .contents {
        width: 60%;
        height: 100%;

        padding: 1rem 20% 5rem 20%;
        display: flex;
        flex-direction: column;
        
        color: var(--color-dark);
    }
</style>