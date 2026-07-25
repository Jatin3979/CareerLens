const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth.middleware");
const upload = require("../middleware/file.middleware");
const { aiGenerationLimiter } = require("../middleware/ratelimiter.middleware");
const {
  generateInterviewReportController,
  interviewReportController,
  getAllInterviewReportsController,
  getResumePdfController,
} = require("../controllers/interview.controller");

router.post(
  "/",
  authenticateToken,
  upload.single("resume"),
  aiGenerationLimiter,
  generateInterviewReportController,
);

router.get(
  "/report/:interviewId",
  authenticateToken,
  interviewReportController,
);
// api to get all interview reports for a user
router.get("/", authenticateToken, getAllInterviewReportsController);

router.post( "/resume/pdf/:interviewId", aiGenerationLimiter, getResumePdfController);


module.exports = router;
