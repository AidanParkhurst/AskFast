import db from "$lib/db/mongo";

export async function load({ cookies }) {
    /* Fetch the user from the session*/
    let sessionToken = cookies.get('authjs.session-token');
    let userSession = await db.collection('sessions').findOne({sessionToken: sessionToken});
    let userId = userSession.userId;

    /* Fetch the surveys for the user */
    let user = await db.collection('users').findOne({ _id: userId });
    let surveys = user.surveys;
    let getSurveyData = async () => {
        let surveyData = [];
        for(let surveyId of surveys) {
            let surveyEntry = await db.collection('surveys').findOne({ _id: surveyId });
            if(!surveyEntry) continue;

            let survey = surveyEntry.survey;
            /* all the survey's questions are stored individually with the key as the question number */
            let questions = [];
            for(let question in survey) {
                if(question.at(0) === 'q') {
                    questions.push(survey[question]);
                }
            }

            surveyData.push({
                id: surveyEntry._id.toString(),
                title: survey.title,
                objective: survey.objective,
                questions: questions,
                responses: surveyEntry.responses,
                published: surveyEntry.published,

            });
        }
        return surveyData;
    }

	return {
        streamed: {
            user: { name: user.name, surveys: user.surveys.length, balance: user.balance},
            surveys: getSurveyData(), 
        }
	};
}