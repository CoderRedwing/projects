const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// user registration

const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
     
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide all required fields: name, email, and password." });
    }

    try {
        // check if user already exists 
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({message: 'user already exists'});
        }

        //hash password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password,salt);   
        
        // create new user 

        user = new User({name, email, password: hashedPassword});
        await user.save();

        // create jwt token

        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.status(201).json({token});
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({message: 'server error',error: error.message});
        
    }

};

// user login 

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        
        if (!user) {
            return res.status(400).json({message:'invalid credential'});
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'invalid credential'});
        }

        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn: '1d'});
        res.status(200).json({token});
        
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({message: 'server error'});
        
    }
};

module.exports = {registerUser,loginUser};