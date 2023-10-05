import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set');
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const parseJsonPart = (data: string) => {
  const jsonStartIndex = data.indexOf('{');
  const jsonEndIndex = data.lastIndexOf('}') + 1;

  const response_data = data.substring(jsonStartIndex, jsonEndIndex);

  return JSON.parse(JSON.stringify(response_data));
};

export async function POST(req: NextRequest) {
  const { query, os } = await req.json();

  const prompt = `Generate CLI command from natural language for the following query: "${query}"

    Rules:
    - The generated <command> should be compatible with ${os}.
    - The <command> should be accurate and reflect the intended task.
    - The output should only contain the most relevant <command>.
    - If no suitable command is found, please provide an alternative suggestion or output <command> as "no command found".
    - The <description> should clearly explain what the command does in a very short sentence and also provide an example usage.

    Always provide the output in the following JSON format:
    {
      "command": "<command>",
      "description": "<description>"
    }
    `;

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0,
  });

  if (response.status !== 200) {
    return new Response(response.statusText, { status: response.status });
  }

  let res_data = response.data;

  if (!res_data.choices[0].text) {
    const res = {
      command: 'no command found',
      description: 'no command found',
    };

    return new Response(JSON.stringify(res));
  }

  let data = res_data.choices[0].text.trim();

  const response_data = parseJsonPart(data);

  return new Response(response_data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
