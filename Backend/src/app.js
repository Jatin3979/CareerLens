const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const interviewRoutes = require("./routes/interview.route");

const app = express();
app.use(cors({
  
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true, // Crucial for cookies!
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/portfolio", require("./routes/portfolio.routes"));
module.exports = app;



