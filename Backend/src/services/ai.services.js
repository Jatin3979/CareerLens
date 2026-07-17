// import { GoogleGenAI } from "@google/genai";
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

async function invokeAI() {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: "hello gemini, what is AI?",
  });

  console.log(response);
  const text = response.candidates[0].content.parts[0].text;
  console.log(text);
}

module.exports = {
  invokeAI,
};
