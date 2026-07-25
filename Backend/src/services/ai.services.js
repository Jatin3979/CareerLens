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
      minItems: 5,
      maxItems: 7,
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
  const prompt = `
You are a Senior Technical Recruiter, Hiring Manager, FAANG Interviewer, Career Coach, and ATS Specialist.

Your job is to analyze the candidate's profile against the target job description and generate a highly personalized interview preparation report.

=========================
CANDIDATE INFORMATION
=========================

Resume:
${resume}

Self Description:
${selfDescription}

Target Job Description:
${jobDescription}

=========================
OBJECTIVE
=========================

Carefully compare the candidate's profile with the job description.

Evaluate:

- Technical skills
- Projects
- Practical experience
- Technologies
- Resume quality
- Communication ability (if inferable)
- Problem-solving ability
- ATS keyword relevance
- Overall job readiness

Generate a personalized interview preparation report.

The report should be specific to THIS candidate and THIS job description.

Do not generate generic interview advice.

=========================
MATCH SCORE
=========================

Generate an honest match score between 0 and 100.

Scoring should consider:

- Required technical skills
- Preferred skills
- Relevant projects
- Work experience
- Education
- ATS keyword alignment
- Project quality
- Overall interview readiness

Do NOT always generate high scores.

Be realistic.

=========================
TECHNICAL QUESTIONS
=========================

Generate 12-15 highly personalized technical interview questions.

Requirements:

- Questions must directly relate to the candidate's projects.
- Questions must also reflect the technologies mentioned in the job description.
- Include beginner, intermediate, and advanced questions.
- Include conceptual questions.
- Include practical implementation questions.
- Include debugging or optimization questions when appropriate.
- Include API, database, authentication, deployment, architecture, and scalability questions whenever relevant.

For each question:

- Explain WHY the interviewer asks it.
- Explain HOW the candidate should answer it.
- Mention important concepts to discuss.
- Mention common mistakes to avoid.
- The answer should be detailed enough for interview preparation.

=========================
BEHAVIORAL QUESTIONS
=========================

Generate 8-10 behavioral interview questions.

Focus on:

- Leadership
- Teamwork
- Communication
- Conflict resolution
- Ownership
- Deadlines
- Problem solving
- Learning ability
- Adaptability
- Failure handling

Every answer should:

- Recommend using the STAR method.
- Explain exactly what interviewer wants to hear.
- Suggest strong talking points.
- Warn against weak answers.

=========================
SKILL GAPS
=========================

Identify ONLY meaningful missing skills.

Do NOT list every missing technology.

Only include skills that would significantly improve the candidate's chances.

For each skill:

Choose severity carefully.

High:
Required skill missing that is critical for the job.

Medium:
Important but not mandatory.

Low:
Nice-to-have skill.

Avoid unnecessary gaps.

=========================
PREPARATION PLAN
=========================

Generate a realistic preparation plan.

Length:
5 to 7 days.

Every day should have ONE primary focus.

Tasks should:

- Build progressively.
- Prioritize high-impact topics first.
- Include project revision.
- Include interview practice.
- Include resume revision.
- Include coding practice if relevant.
- Include mock interviews near the end.
- Be actionable and measurable.

Do NOT repeat tasks.

=========================
IMPORTANT RULES
=========================

- Personalize everything.
- Base every recommendation on the resume and job description.
- Never invent companies, degrees, certifications, or work experience.
- Do not hallucinate technologies not supported by the candidate unless listing them as missing skills.
- Avoid generic career advice.
- Think like a recruiter preparing this candidate for THIS specific interview.
- Optimize recommendations to maximize interview success.

=========================
OUTPUT
=========================

Return ONLY valid JSON matching the provided response schema.

Do NOT return markdown.

Do NOT return explanations.

Do NOT wrap JSON in code blocks.

Return only the JSON object.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
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
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
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

 const prompt = `
You are an expert Senior Technical Recruiter, ATS Resume Specialist, Career Coach, and Professional Resume Writer.

Your objective is to transform the candidate's resume into a highly optimized, ATS-friendly resume that maximizes interview chances for the TARGET JOB DESCRIPTION.

========================
INPUT
========================

Original Resume:
${resume}

Self Description:
${selfDescription}

Target Job Description:
${jobDescription}

========================
YOUR RESPONSIBILITIES
========================

Analyze the job description and identify:
- Required technical skills
- Preferred skills
- Keywords
- Responsibilities
- Experience expectations
- Soft skills
- Industry terminology
- ATS keywords

Then rewrite and optimize the candidate's resume.

IMPORTANT:
- NEVER fabricate companies, degrees, certifications, employment history, or years of experience.
- You MAY rewrite, reorganize, expand, and professionally enhance existing experience.
- You MAY improve wording, quantify achievements when reasonably inferred, and make project descriptions stronger without changing their core functionality.
- You MAY incorporate information from the Self Description where relevant.
- If a project can naturally demonstrate skills required by the job description, emphasize those aspects.
- Include missing ATS keywords only when they are genuinely supported by the candidate's experience or projects.
- Do NOT keyword stuff.
- Everything should read naturally.

========================
ATS OPTIMIZATION
========================

Optimize the resume to:

- Maximize ATS compatibility
- Improve keyword relevance
- Increase recruiter readability
- Highlight measurable achievements
- Prioritize the most relevant experience
- Improve project impact
- Improve technical depth
- Improve action verbs
- Reduce unnecessary content
- Remove weak statements
- Improve professional tone

The generated resume should clearly be an improved version of the original, not just a reformatted copy.

========================
PROJECT OPTIMIZATION
========================

If the candidate has projects:

Rewrite each project to emphasize:

- Business impact
- Technical complexity
- Scalability
- Performance improvements
- Security
- Authentication
- API integration
- Database optimization
- Responsive UI
- Modern development practices
- Testing (if applicable)
- Deployment (if applicable)
- AI integration (if applicable)

Whenever possible, convert generic descriptions into achievement-oriented bullet points.

Example:

Instead of:
"Built an e-commerce website."

Write something like:
"Developed a full-stack MERN e-commerce platform featuring secure JWT authentication, payment gateway integration, role-based administration, responsive UI, and optimized MongoDB queries for improved performance."

========================
RESUME QUALITY
========================

The final resume should:

- Look like it was written by an experienced professional resume writer.
- Feel personalized for this specific job.
- Have excellent ATS compatibility.
- Be concise.
- Be easy to scan.
- Use strong action verbs.
- Be recruiter-friendly.
- Follow modern resume standards.

========================
DESIGN REQUIREMENTS
========================

Generate clean HTML suitable for Puppeteer PDF generation.

Requirements:

- Semantic HTML
- Professional typography
- ATS-friendly formatting
- Black text on white background
- No icons
- No tables for main content
- Print optimized
- A4 page size
- Maximum 2 pages
- Consistent spacing
- Proper section hierarchy
- Elegant styling using a <style> block
- No external CSS
- No external fonts
- No JavaScript

Include sections only if data exists:

- Header
- Professional Summary
- Technical Skills
- Experience
- Projects
- Education
- Certifications
- Achievements
- Leadership
- Open Source
- Languages

========================
OUTPUT FORMAT
========================

Return ONLY valid JSON.

The JSON must contain exactly one property:

{
  "html": "<complete HTML document>"
}

The value of "html" must be a complete HTML document beginning with:

<!DOCTYPE html>

and ending with:

</html>

Do not include markdown.
Do not include explanations.
Do not include comments.
Do not include any text outside the JSON object.
`;

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
