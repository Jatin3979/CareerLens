const rateLimit = require("express-rate-limit");
const aiGenerationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min window
  max: 2, // 2 requests per 15 minutes
  message: {
    success: false,
    message: "You have reached your limit of 2 interview plans per 15 minutes. Please take a break and try again later!",
  },
});
module.exports = { aiGenerationLimiter };