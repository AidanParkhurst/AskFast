import db from "$lib/db/mongo";
import { ObjectId } from "mongodb";

export async function load({ params, cookies }) {
    /* Fetch the user from the session*/
    let sessionToken = cookies.get('authjs.session-token');
    let userSession = await db.collection('sessions').findOne({sessionToken: sessionToken});
    let userId = userSession.userId;

    /* Fetch the surveys for the user */
    let user = await db.collection('users').findOne({ _id: userId });
    let surveyId = params.slug;
    let surveys = user.surveys;

    /* find the survey in the user's surveys */
    let userCopy = surveys.find(survey => survey.valueOf() == surveyId);

    if (userCopy !== undefined) {
        let surveyEntry = await db.collection('surveys').findOne({ _id: userCopy});
        let survey = surveyEntry.survey;
        /* all the survey's questions are stored individually with the key as the question number */
        let questions = [];
        for(let question in survey) {
            if(question.at(0) === 'q') {
                questions.push(survey[question]);
            }
        }

        /* Then return all the data */
        return {
            id: surveyEntry._id.toString(),
            title: survey.title,
            objective: survey.objective,
            questions: questions,
            responses: surveyEntry.responses,
            published: surveyEntry.published,
        };
    } 
}

export const actions = {
    default: async ({ request, cookies }) => {
        /* Get the form data from our frontend */
        const responses = await request.formData();
        const jresponses = Object.fromEntries(responses);

        try { 
            let publishStatus = jresponses.publish === 'on';
            let surveyId = jresponses.surveyId;
           
            /* Update the survey's published status in our database */
            let surveyIdObj = ObjectId.createFromHexString(surveyId);
            await db.collection('surveys').updateOne(
                { _id: surveyIdObj },
                { $set: { published: publishStatus }}
            ); 

            return {
                success: true,
                result: publishStatus,
            };

        } catch(err) {
            console.log(err);
        }

        return {
            success: false,
            result: false,
        };
    }
}