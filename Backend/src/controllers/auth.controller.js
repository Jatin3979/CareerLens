const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.cookie("token", token, {
  httpOnly: true,
  // 🔴 In production, these two MUST be configured this way for cross-domain cookies:
  secure: true, 
  sameSite: "none", 
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});
    await user.save();
    res.status(201).json({
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Must be true in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'none' allows cross-domain cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.cookie("token", token, {
  httpOnly: true,
  // 🔴 In production, these two MUST be configured this way for cross-domain cookies:
  secure: true, 
  sameSite: "none", 
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
}

async function logoutUser(req, res) {
  try {
    // Add the token to the blacklist
    const token = req.cookies.token;
    await blacklistModel.create({ token });
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging out", error: error.message });
  }
}

async function getUserProfile(req, res) {
  try {
    const userId = req.user.userId;
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user profile", error: error.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
};
