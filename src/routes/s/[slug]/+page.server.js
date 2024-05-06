import db from "$lib/db/mongo";
import { ObjectId } from "mongodb";

export async function load({ params, cookies }) {
    let surveyId = params.slug;
    try {
        let surveyIdObj = ObjectId.createFromHexString(surveyId);
        let surveyEntry = await db.collection('surveys').findOne({_id: surveyIdObj});
        if (surveyEntry === null || surveyEntry.published === false) {
            return {
                status: 404,
                error: "Survey not found",
            }
        }

        let survey = surveyEntry.survey;
        let questions = [];
        for(let question in survey) {
            if(question.at(0) === 'q') {
                questions.push(survey[question]);
            }
        }
        return {
            id: surveyEntry._id.toString(),
            title: survey.title,
            questions: questions,
        }
    } catch(err) {
        console.log(err);
    }

    return {
        status: 404,
        error: "Survey not found",
    }
}


export const actions = {
    default: async ({ request, cookies }) => {
        /* Get the form data from our frontend */
        const responses = await request.formData();
        const jresponses = Object.fromEntries(responses);

        try { 
            /* Save the responses to the database */
            let surveyId = jresponses.surveyId;
            let surveyIdObj = ObjectId.createFromHexString(surveyId);

            let responses = [];
            for(let response in jresponses) {
                if(response.at(0) === 'a') {
                    responses.push(jresponses[response]);
                }
            }

            await db.collection('surveys').updateOne(
                { _id: surveyIdObj },
                { $push: { responses: responses }}
            );

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