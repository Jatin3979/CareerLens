const express = require("express");
const router = express.Router();
const {registerUser} = require("../controllers/auth.controller");


const User = require("../models/user.model");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

router.post("/register", registerUser);





module.exports = router;