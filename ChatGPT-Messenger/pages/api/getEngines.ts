// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import openai from '../../lib/chatgpt';

type Option = {
  value: string;
  label: string;
}

type Data = {
    modelOptions: Option[];  // the dropdown selection options
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>  // response from ChatInput
) {

  // get ALL the OpenAI API Models, BOOM!
    const models = await openai.listModels().then((res) => res.data.data);  // extract the data that's being returned

    const modelOptions = models.map((model) => ({  // mapping the models
        value: model.id,
        label: model.id
    }));

    res.status(200).json({
        modelOptions,
    });
}