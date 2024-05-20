import {client_promise} from "$lib/db/mongo";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET, NODE_ENV } from "$env/static/private";
import Nodemailer from "@auth/core/providers/nodemailer";
import { sendVerificationRequest, EMAIL_FROM, EMAIL_SERVER } from "$lib/mail/mailtrap";

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
    const authOptions = {
        providers: [
            Nodemailer({
                server: EMAIL_SERVER,
                from: EMAIL_FROM,
                sendVerificationRequest
            }),
            Google({
                clientId: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
            })
        ],
        pages: {
            signIn: '/signin',
        },
        adapter: MongoDBAdapter(client_promise, {databaseName: NODE_ENV}),
        secret: AUTH_SECRET,
        trustHost: true
    };

    return authOptions;
});