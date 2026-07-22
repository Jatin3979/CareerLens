const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth.middleware");
const upload = require("../middleware/file.middleware");
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
  generateInterviewReportController,
);

router.get(
  "/report/:interviewId",
  authenticateToken,
  interviewReportController,
);
// api to get all interview reports for a user
router.get("/", authenticateToken, getAllInterviewReportsController);

router.post( "/resume/pdf/:interviewId", authenticateToken, getResumePdfController);


module.exports = router;
