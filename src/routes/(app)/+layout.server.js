import {redirect} from '@sveltejs/kit';
import db from '$lib/db/mongo';

export const load = async (event) => {
    const session = await event.locals.getSession();

    if (!session) return redirect(307, '/signin');

    // Use email to identify the user
    const user = await db.collection('users').findOne({ email: session.user.email });

    // Use email to identify the user's payments
    const payments = await db.collection('payments').find({ email: session.user.email }).toArray();

    // Iterate over payments, applying them to the user's balance if they haven't been applied yet
    for (const payment of payments) {
        if (!payment.balanceUpdated) {
            // Update the user's balance in the database
            if(!user.balance) user.balance = 0;
            user.balance += payment.amount;
            await db.collection('users').updateOne({ email: session.user.email }, { $set: { balance: user.balance } });
            
            payment.balanceUpdated = true;
            await db.collection('payments').updateOne({ _id: payment._id }, { $set: { balanceUpdated: true } });
        }
    }
}