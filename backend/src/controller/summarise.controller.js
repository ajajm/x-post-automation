import {GoogleGenAI} from '@google/genai';

const GEMINI_API_KEY=process.env.GEMINI_API_KEY

const ai = new GoogleGenAI({vertexai: false, apiKey: GEMINI_API_KEY});

async function main(articleData) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `${JSON.stringify(articleData)} write a concise summary for x post in 250 characters`,
  });
  console.log(response.text);
  return response.text;
}

export default main;
