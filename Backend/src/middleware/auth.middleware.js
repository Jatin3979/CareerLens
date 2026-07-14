const jwt= require('jsonwebtoken');
const blacklistModel=require('../models/blacklist.model');

const authenticateToken = async(req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }
   const isBlacklisted = await blacklistModel.findOne({ token });
   if(isBlacklisted){
    return res.status(401).json({ message: "Token is blacklisted" });
   }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};





module.exports = { authenticateToken };