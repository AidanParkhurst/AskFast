import { json } from "@sveltejs/kit";
import db from "$lib/db/mongo";
import stripe from "$lib/pay/stripe";
import { STRIPE_ENDPOINT_SECRET } from "$env/static/private";

export async function POST({ request }) {
    // Verify the event came from Stripe
    let event;
    try {
        const sig = request.headers.get('stripe-signature');
        const body = await request.text();
        event = stripe.webhooks.constructEvent(body, sig, STRIPE_ENDPOINT_SECRET);
    } catch (err) {
        console.error(err);
        return json({ status: 400, message: `Webhook Error: ${err.message}` });
    }

    if(event.type === 'checkout.session.completed') {
        // Successful payment!
        console.log(event.data.object.amount_total / 100 + " received at " + event.data.object.created + "!")
        let customer = event.data.object.customer_details;
        console.log(customer.email);
        console.log(customer.name);
    }

    return json({
        status: 200,
        message: "Successfully processed the payment.",
    })
}