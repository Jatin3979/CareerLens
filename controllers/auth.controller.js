const userModel=require('../models/user.model');

async function registerUser(req,res){
    try{
        const {username,email,password}=req.body;
        const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            username,
            email,
            password
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
}


module.exports = {
    registerUser
};