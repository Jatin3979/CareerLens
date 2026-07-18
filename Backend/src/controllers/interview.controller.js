// 1. Inject DOMMatrix globally so pdf-parse doesn't crash
global.DOMMatrix = require("dommatrix");

const pdfParse = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.services");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res) {
  try {
    // 2. Validate the file exists before processing
    const resumeFile = req.file;
    if (!resumeFile) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const { selfDescription, jobDescription } = req.body;
    
    // Parse the PDF
    const resumeContent = await  (new pdfParse.PDFParse(Uint8Array.from(resumeFile.buffer))).getText();

    // Generate the AI Report
    const report = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
    });

    // 3. Save to Database (Now safely inside the try block)
    // Using .create() handles both building and saving the document
    const interviewReport = await interviewReportModel.create({
      user: req.user._id,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      ...report, // 'report' is now safely in scope
    });

    // 4. Send a single, final success response
    return res.status(200).json({
      message: "Interview report generated and saved successfully",
      interviewReport,
    });

  } catch (error) {
    // If ANY step above fails, it drops down to here safely
    console.error("Error generating interview report:", error);
    return res.status(500).json({ message: "Failed to generate interview report" });
  }
}

module.exports = { generateInterviewReportController };