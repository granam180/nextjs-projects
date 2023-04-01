import openai from "./chatgpt";

// passing in information called a 'createCompletion'
const query = async (prompt: string, chatId: string, model: string) => {
    const res = await openai.createCompletion({
        model,
        prompt,
        temperature: 0.2,
        top_p: 1,
        max_tokens: 2000, // how many calls, or characters ChatGPT will spit out
        frequency_penalty: 0,  // a number between -2 and 2. Positive values penalize new tokens based on their existing frequency in the text, decreasing the model's likelihood to repeat the same line verbatim.
        presence_penalty: 0,  // a number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
        // stream: true  // TODO: implement ChatGPT typewriter effect
    })
        .then((res) => res.data.choices[0].text)
        .catch(
            (err) =>  // implicit return
                `BADD ChatGPT was unable to find an answer for that! (Error: ${err.message})`
        );

        return res;
};

export default query