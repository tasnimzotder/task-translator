import { NextRequest, NextResponse } from 'next/server';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set');
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  const prompt = `Translate this natural language into CLI commands:\n\nInput: ${query}\n\nOutput:

    Rules:
    - the command should work on linux
    - the command should be as short as possible
    - only output the command, not the description, nor any other text, just the command
    - if any file_name or directory_name is mentioned, it should be replaced with a placeholder
    - if no possible command exists, output "no command found"


    The example format is as follows:
    "cat /etc/passwd"

    The output should be in bash format.
    `;
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt,
      temperature: 0.5,
      max_tokens: 2048,
      n: 1,
      stop: '\\n',
      model: 'text-davinci-003',
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
      logprobs: 10,
    }),
  });

  if (response.status !== 200) {
    return new Response(response.statusText, { status: response.status });
  }

  const data = await response.json();

  return new Response(JSON.stringify(data.choices[0].text.trim()));
}

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }

// // access this endpoint at /api/translate

// export default async function GET(req: NextApiRequest, res: NextApiResponse) {
//   // if (req.method !== 'POST') {
//   //   res.status(405).json({ error: 'Method not allowed' });
//   //   return;
//   // }

//   res.status(200).json({ message: 'Hello world' });
//   return;

//   const { query } = req.body;

//   const prompt = `Translate this natural language into CLI commands:\n\nInput: ${query}\n\nOutput:

//     The output should be in the following format:
//         - The first line should be the command to run in bash (e.g. "ls -l")
//         - The second line should be brief description of what the command does
//     `;

//   const response = await fetch(
//     'https://api.openai.com/v1/engines/davinci/completions',
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         prompt,
//         max_tokens: 1024 * 3,
//         temperature: 0.3,
//         top_p: 1,
//         stop: ['\n'],
//       }),
//     }
//   );

//   const data = await response.json();

//   res.status(200).json(data);
// }
