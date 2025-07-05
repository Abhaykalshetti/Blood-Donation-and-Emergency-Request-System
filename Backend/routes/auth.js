import express from "express";
import bcrypt  from "bcryptjs";
import jwt  from "jsonwebtoken";
import User  from "../models/User.js";

const router = express.Router();
const jwtSecret = "your_jwt_secret"; // Use environment variable in production

// Register User
router.post("/register", async (req, res) => {
  
  try {
    const { name, email, password, role } = req.body;

    if (!["donor", "organization", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: "1h" });
    
    res.json({ token, role: user.role });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
