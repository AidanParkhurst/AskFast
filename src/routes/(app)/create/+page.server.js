import db from "$lib/db/mongo";

export const actions = {
    default: async ({ request, cookies }) => {
        /* Get the form data from our frontend */
        const survey = await request.formData();
        const jsurvey = Object.fromEntries(survey);
       
        /* Get the user ID from our session database */
        let sessionToken = cookies.get('authjs.session-token');
        let userSession = await db.collection('sessions').findOne({sessionToken: sessionToken});
        let userId = userSession.userId

        try {
            /* Insert the survey into the database */
            await db.collection('surveys').insertOne({
                userId: userId,
                survey: jsurvey,
                published: false,
            });

            return {
                status: 200,
                body: {
                    message: 'Survey published successfully',
                },
            };

        } catch(err) {
            console.log(err);
        }

        return {
            status: 500,
            body: {
                message: 'Survey publish failed',
            },
        };
    }
}