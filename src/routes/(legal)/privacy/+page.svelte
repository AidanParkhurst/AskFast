<script>
    import Button from "$lib/components/Button.svelte";
    import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
    <title>AskFast - Privacy Policy</title>
    <meta name="description" content="The privacy policy outlining how AskFast, an AI powered form building webapp, protects and uses data.">
</svelte:head>

<div class="container">
    <div class="contents">
        <Button class="back start" on:click={() => {window.history.back()}}>
            <h4>← Back</h4>
        </Button>

        <h1>Privacy Policy</h1>

        <h2>1. Introduction</h2>
            <p>Ask Fast ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our web application, Ask Fast (the "Service").</p>

        <h2>2. Information We Collect</h2>
            <ul>
                <li><b>Account Information:</b> When you sign up for the Service via Google, we collect your Google profile information. If you sign up with an email, we collect your email address.</li>
                <li><b>Payment Information:</b> Payments are processed through Stripe, which collects your payment details. We do not store your payment information.</li>
                <li><b>Questionnaire Data:</b> We collect and store the questionnaires you create and the responses you receive in our MongoDB database.</li>
                <li><b>Usage Data:</b> We collect information about your interactions with the Service, such as your IP address, browser type, and usage patterns.</li>
            </ul>

        <h2>3. How We Use Your Information</h2>
            <ul>
                <li><b>To Provide and Improve the Service:</b> We use your information to operate, maintain, and enhance the Service.</li>
                <li><b>To Process Payments:</b> We use Stripe to process payments and manage your balance.</li>
                <li><b>To Communicate with You:</b> We may use your email address to send you updates, technical notices, and support messages.</li>
                <li><b>To Analyze Data:</b> We use the GPT-4 API to analyze the questionnaire responses you collect.</li>
            </ul>

        <h2>4. Sharing Your Information</h2>
            <ul>
                <li><b>Service Providers:</b> We may share your information with third-party service providers, such as Stripe, to facilitate payment processing and other essential services.</li>
                <li><b>Legal Requirements:</b> We may disclose your information if required by law or in response to valid requests by public authorities.</li>
                <li><b>Business Transfers:</b> In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
            </ul>

        <h2>5. Data Security</h2>
            <p>We implement industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.</p>

        <h2>6. Data Retention</h2>
            <p>We retain your information for as long as necessary to provide the Service and fulfill the purposes outlined in this Privacy Policy. We may also retain and use your information to comply with legal obligations, resolve disputes, and enforce our agreements.</p>

        <h2>7. Your Rights</h2>
            <ul>
                <li><b>Access and Correction:</b> You have the right to access and correct your information. You can update your account information through the Service.</li>
                <li><b>Deletion:</b> You can request the deletion of your account and personal data by contacting us at support@askfa.st. We will comply with your request in accordance with applicable laws.</li>
                <li><b>Opt-Out:</b> You can opt out of receiving promotional communications from us by following the unsubscribe instructions in those communications or by contacting us directly.</li>
            </ul>

        <h2>8. Children's Privacy</h2>
            <p>The Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.</p>

        <h2>9. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. Your continued use of the Service after the changes become effective constitutes acceptance of the updated Privacy Policy.</p>

        <h2>10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at support@askfa.st.</p>
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