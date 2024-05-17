import db from "$lib/db/mongo";

export async function load({ cookies }) {
    /* Fetch the user from the session*/
    let sessionToken = cookies.get('authjs.session-token') || cookies.get('__Secure-authjs.session-token');
    let userSession = await db.collection('sessions').findOne({sessionToken: sessionToken});
    let userId = userSession.userId;

    /* Fetch the surveys for the user */
    let user = await db.collection('users').findOne({ _id: userId });
    return {
        streamed: {
            user: { name: user.name, balance: user.balance},
        }
    };
}