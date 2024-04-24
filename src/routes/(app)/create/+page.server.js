
export const actions = {
    default: async ({request}) => {
        const survey = await request.formData();
        console.log(survey);

        try {
            /* todo upload this to a mongoDB*/

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