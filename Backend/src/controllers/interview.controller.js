// 1. Inject DOMMatrix globally so pdf-parse doesn't crash
global.DOMMatrix = require("dommatrix");

const pdfParse = require("pdf-parse");
const {
  generateInterviewReport,
  generateResumePdf,
} = require("../services/ai.services");
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
    const resumeContent = await new pdfParse.PDFParse(
      Uint8Array.from(resumeFile.buffer),
    ).getText();

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
    return res
      .status(500)
      .json({ message: "Failed to generate interview report" });
  }
}

const interviewReportController = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const report = await interviewReportModel.findById(interviewId);
    return res.status(200).json({ report });
  } catch (error) {
    console.error("Error fetching interview report:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch interview report" });
  }
};

const getAllInterviewReportsController = async (req, res) => {
  try {
    const userId = req.user._id;
    const reports = await interviewReportModel
      .find({ user: userId })
      .sort({ createdAt: -1 });
    return res.status(200).json({ reports });
  } catch (error) {
    console.error("Error fetching all interview reports:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch all interview reports" });
  }
};

const getResumePdfController = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const report = await interviewReportModel.findById(interviewId);
    if (!report) {
      return res.status(404).json({ message: "Interview report not found" });
    }
    const pdfBuffer = await generateResumePdf({
      resume: report.resume,
      selfDescription: report.selfDescription,
      jobDescription: report.jobDescription,
    });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=resume_${interviewId}.pdf`,
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating resume PDF:", error);
    return res.status(500).json({ message: "Failed to generate resume PDF" });
  }
};

module.exports = {
  generateInterviewReportController,
  interviewReportController,
  getAllInterviewReportsController,
  getResumePdfController,
};
