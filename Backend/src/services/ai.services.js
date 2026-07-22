const { GoogleGenAI, Type } = require("@google/genai");
const puppeteer = require("puppeteer");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const questionItemSchema = {
  type: "object",
  properties: {
    question: {
      type: "string",
      description: "The question that can be asked in the interview",
    },
    intention: {
      type: "string",
      description:
        "The intention of the interviewer behind asking this question",
    },
    answer: {
      type: "string",
      description:
        "How to answer this question, what points to cover, what approach to take etc.",
    },
  },
  required: ["question", "intention", "answer"],
  propertyOrdering: ["question", "intention", "answer"],
};

const interviewReportJsonSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description:
        "The title of the job for which the interview report is generated",
    },
    matchScore: {
      type: "number",
      description:
        "A score between 0 and 100 indicating how well the candidate's profile matches the job description",
    },
    technicalQuestions: {
      type: "array",
      description:
        "Technical questions that can be asked in the interview along with their intention and how to answer them",
      items: questionItemSchema,
    },
    behavioralQuestions: {
      type: "array",
      description:
        "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
      items: questionItemSchema,
    },
    skillGaps: {
      type: "array",
      description:
        "List of skill gaps in the candidate's profile along with their severity",
      items: {
        type: "object",
        properties: {
          skill: {
            type: "string",
            description: "The skill which the candidate is lacking",
          },
          severity: {
            type: "string",
            enum: ["low", "medium", "high"],
            description:
              "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances",
          },
        },
        required: ["skill", "severity"],
        propertyOrdering: ["skill", "severity"],
      },
    },
    preparationPlan: {
      type: "array",
      minItems: 7,
      description:
        "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
      items: {
        type: "object",
        properties: {
          day: {
            type: "number",
            description:
              "The day number in the preparation plan, starting from 1",
          },
          focus: {
            type: "string",
            description:
              "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc.",
          },
          tasks: {
            type: "array",
            items: { type: "string" },
            description:
              "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
          },
        },
        required: ["day", "focus", "tasks"],
        propertyOrdering: ["day", "focus", "tasks"],
      },
    },
  },
  required: [
    "title",
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
  ],
  propertyOrdering: [
    "title",
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
  ],
};

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: interviewReportJsonSchema,
    },
  });

  if (
    response.candidates?.[0]?.finishReason &&
    response.candidates[0].finishReason !== "STOP"
  ) {
    console.warn(
      "Unexpected finishReason:",
      response.candidates[0].finishReason,
    );
  }

  return JSON.parse(response.text);
}

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });
  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });
  await browser.close();
  return pdfBuffer;
}

// async function generateResumePdf({ resume, selfDescription, jobDescription }) {
//   const resumePdfSchema = z.object({
//     html: z
//       .string()
//       .describe("The HTML content of the resume to be converted to PDF"),
//   });
//   const prompt = `Generate resume for a candidate with the following details:
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}

//                         the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
//                         The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
//                         The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
//                         you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
//                         The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
//                         The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
//                     `;
// try {
//   const response = await ai.models.generateContent({
//     model: "gemini-3.1-flash-lite",
//     contents: prompt,
//     config: {
//       responseMimeType: "application/json",
//       responseJsonSchema: resumePdfSchema,
//     },
//   });

//   const JsonContent= JSON.parse(response.text);
//   console.log("Generated JSON content for resume PDF:", JsonContent);
//   return await generatePdfFromHtml(JsonContent.html);
// }
// catch (error) {
//   console.error("Error generating resume PDF:", error);
//   throw new Error("Failed to generate resume PDF");
// }
// }

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  // 1. Define the schema natively for Gemini to guarantee success
  const geminiResponseSchema = {
    type: Type.OBJECT,
    properties: {
      html: {
        type: Type.STRING,
        description:
          "The complete, well-formatted, ATS-friendly HTML content of the resume, including inline CSS.",
      },
    },
    required: ["html"],
  };

  const prompt = `Generate a tailored resume for a candidate with the following details:
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}

    The response MUST be a JSON object with a single field "html" containing the HTML content of the resume. 
    The HTML should be ready to be converted to PDF using Puppeteer.
    
    Requirements:
    - Tailor the resume to highlight strengths relevant to the job description.
    - Use semantic HTML and clean inline CSS (or a <style> block).
    - Design should be professional, simple, and ATS-friendly.
    - Write in a natural, human-like tone.
    - Keep it concise (1-2 pages when converted to PDF).`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite", // 2. Updated to a valid model
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: geminiResponseSchema, // 3. Used the correct key and schema format
      },
    });

    const jsonContent = JSON.parse(response.text);

    // Safety check before passing to Puppeteer
    if (!jsonContent.html) {
      throw new Error("AI failed to generate the HTML content.");
    }

    return await generatePdfFromHtml(jsonContent.html);
  } catch (error) {
    console.error("Error generating resume HTML:", error);
    throw error;
  }
}
module.exports = { generateInterviewReport, generateResumePdf };
