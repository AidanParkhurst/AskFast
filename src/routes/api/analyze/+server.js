import db from "$lib/db/mongo";
import { openai } from "$lib/ai/openai";
import { json } from "@sveltejs/kit";

export async function POST({ request, cookies }) {

    /* Fetch the user from the session*/
    let sessionToken = cookies.get('authjs.session-token');
    let userSession = await db.collection('sessions').findOne({sessionToken: sessionToken});
    let userId = userSession.userId;

    /* Fetch the surveys for the user */
    let user = await db.collection('users').findOne({ _id: userId });
    let surveys = user.surveys;

    /* confirm the user owns the survey */
    let body = await request.json();
    let surveyId = body.survey;
    let userCopy = surveys.find(survey => survey.valueOf() == surveyId);
    if (userCopy === undefined) {
        return json({ status: 401, message: "You do not have permission to access this survey." })
    }

    /* Otherwise fetch the survey */
    let surveyEntry = await db.collection('surveys').findOne({ _id: userCopy});
    let survey = surveyEntry.survey;

    /* all the survey's questions are stored individually with the key as the question number */
    let questions = [];
    for(let question in survey) {
        if(question.at(0) === 'q') {
            questions.push(survey[question]);
        }
    }

    let prompt = body.prompt;
    try {
        /* Todo, figure out how to chunk response data if it gets too large*/
        return openai.chat.completions.create({
            messages: [
                { role: "system",
                    content: "You will analyze a survey titled \"" + survey.title + "\", with the objective: \"" + survey.objective + "\"."
                    },
                { role: "system",
                    content: "The questions were: [" + questions.join("\", \"") + "]."
                },
                { role: "system",
                    content: "The responses were: [" + surveyEntry.responses.join("\", \"") + "]."
                },
                { role: "user",
                    content: prompt 
                    },
                ],
            model: "gpt-3.5-turbo",
        }).then((completion) => {
            console.log(completion);
            return json({ status: 200, message: "Successfully analyzed the survey.", data: completion.choices[0].message.content});
        });
    } catch(err) {
        console.log(err);
    }

    return json({ status: 500, message: "An error occurred while analyzing the survey." });
}