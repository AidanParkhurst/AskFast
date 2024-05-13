import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "$env/static/private";

const stripe = Stripe(STRIPE_SECRET_KEY);

export default stripe;