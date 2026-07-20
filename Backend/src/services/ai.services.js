const { GoogleGenAI } = require("@google/genai");

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

module.exports = { generateInterviewReport };
