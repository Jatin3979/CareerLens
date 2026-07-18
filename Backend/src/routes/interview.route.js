const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth.middleware");
const upload = require("../middleware/file.middleware");
const {
  generateInterviewReportController,
} = require("../controllers/interview.controller");

router.post(
  "/",
  authenticateToken,
  upload.single("resume"),
  generateInterviewReportController,
);

module.exports = router;
