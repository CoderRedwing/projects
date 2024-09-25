const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// user registration
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please provide all required fields: name, email, and password.",
    });
  }

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    // Create a new user
    user = new User({ name, email, password });
    await user.save();

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set the token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure flag set to true if in production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    });

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(password);
  console.log("Login attempt:", { email }); // Log the email being used to log in

  try {
    const user = await User.find({ email: email }).exec();
    if (!user) {
      console.warn("User not found:", email); // Log if the user is not found
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("User found:", user[0].password); // Log the found user ID

    const isMatch = await bcrypt.compare(password, user[0].password);
    console.log(isMatch);
    if (!isMatch) {
      console.warn("Password mismatch for user:", email); // Log if the password does not match
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log("JWT token created for user:", user._id); // Log token creation

    // Set the token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure flag set to true if in production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    });

    console.log("Login successful for user:", user._id); // Log successful login
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error in loginUser:", error); // Log any errors
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser };
