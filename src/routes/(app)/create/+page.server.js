import db from "$lib/db/mongo";

export const actions = {
    default: async ({ request, cookies }) => {
        /* Get the form data from our frontend */
        const survey = await request.formData();
        const jsurvey = Object.fromEntries(survey);

        /* Get the user ID from our session database */
        let sessionToken = cookies.get('authjs.session-token') || cookies.get('__Secure-authjs.session-token');
        let userSession = await db.collection('sessions').findOne({sessionToken: sessionToken});
        let userId = userSession.userId;
        
        let user = await db.collection('users').findOne({ _id: userId});
        if (user.balance === undefined) {
            // If the user doesn't have a balance, they can only create 5 surveys
            if (user.surveys.length > 4)
                return {
                    success: false,
                    error: true,
                };
        }

        try {
            /* Insert the survey into the database */
            let result = await db.collection('surveys').insertOne({
                userId: userId,
                survey: jsurvey,
                responses: [],
                published: false,
            });
            
            if(result?.insertedId) {
                let surveyId = result.insertedId;
                await db.collection('users').updateOne(
                    { _id: userId },
                    { $push: { surveys: surveyId }}
                );
            }
            
            return {
                success: true,
                error: false,
            };

        } catch(err) {
            console.log(err);
        }

        return {
            success: false,
            error: true,
        };
    }
}