import db from "$lib/db/mongo";
import { openai } from "$lib/ai/openai";
import { json } from "@sveltejs/kit";

// Rough, slightly overestimated cost of using OpenAI's GPT-3.5 model
const OPENAI_TOKEN_RATE = 0.0005 / 1000;
const OPENAI_TOKENS_PER_WORD = 3 / 4;

const UPSALE_RATE = 2;

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
        // Estimate the cost of the request
        let wordCount = prompt.split(" ").length;
        wordCount += questions.join("\", \"").split(" ").length;
        wordCount += surveyEntry.responses.join("\", \"").split(" ").length;
        let estimatedCost = wordCount * OPENAI_TOKENS_PER_WORD * OPENAI_TOKEN_RATE * UPSALE_RATE;
        if (!user.balance || user.balance < estimatedCost) {
            return json({ status: 402, message: "Insufficient funds to analyze the survey." });
        }

        /* Todo, figure out how to chunk response data if it gets too large*/
        let completion = await openai.chat.completions.create({
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
        });
        console.log(completion);
        let data = completion.choices[0].message.content;
        let tokensUsed = completion.usage.total_tokens;
        let cost = tokensUsed * OPENAI_TOKEN_RATE * UPSALE_RATE;
        user.balance -= cost;
        await db.collection('users').updateOne({ _id: userId }, { $set: { balance: user.balance } });

        return json({ status: 200, message: "Successfully analyzed the survey.", data: data, balance: user.balance});
    } catch(err) {
        console.log(err);
    }

    return json({ status: 500, message: "An error occurred while analyzing the survey." });
}