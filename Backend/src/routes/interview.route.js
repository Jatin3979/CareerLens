const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth.middleware");
const upload = require("../middleware/file.middleware");
const {
  generateInterviewReportController,
  interviewReportController,
  getAllInterviewReportsController,
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
module.exports = router;
