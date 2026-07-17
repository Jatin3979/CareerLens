const mongoose = require("mongoose");

// job description , resume  , self description , Matchscore
// Technical questions ->-> [{
//     question: String,
//     answer: String,
//     intention: Stirng
// }]
//  , behavioral questions ,
// skill gaps -> [{
// skill: String,
// severity: String,
// enum : [low , medium, high]
//
// }], preparation plan -> [{
//          day: Number,
//          task: [String],
//          focus: String
// }]

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
    },

    intention: {
      type: String,
    },
    answer: {
      type: String,
    },
  },
  { _id: false },
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
    },
    intention: {
      type: String,
    },
    answer: {
      type: String,
    },
  },
  { _id: false },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
    },
  },
  { _id: false },
);

const preparationPlanSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
    },
    task: {
      type: [String],
    },
    focus: {
      type: String,
    },
  },
  { _id: false },
);

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
  },
  { timestamps: true },
);

const InterviewReport = mongoose.model(
  "InterviewReport",
  interviewReportSchema,
);

module.exports = InterviewReport;
