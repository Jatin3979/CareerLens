const rateLimit = require("express-rate-limit");
const aiGenerationLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 1 day window
  max: 2, // 2 requests per day
  message: {
    success: false,
    message: "You have reached your limit of 2 interview plans per day. Please take a break and try again later!",
  },
});
module.exports = { aiGenerationLimiter };