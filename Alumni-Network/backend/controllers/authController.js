const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Institute = require("../models/Institute");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
  try {
    const { role, email, password } = req.body;

    // validation
    if (!role || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      role,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const registerInstitute = async (req, res) => {
  try {
    const {
      instituteName,
      email,
      phone,
      address,
      city,
      state,
      website,
      password,
      confirmPassword,
    } = req.body;

    // validation
    if (
      !instituteName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // check if admin already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Institute already registered" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create admin user
    const adminUser = await User.create({
      role: "admin",
      email,
      password: hashedPassword,
    });

    // create institute
    const institute = await Institute.create({
      instituteName,
      email,
      phone,
      address,
      city,
      state,
      website,
      adminUser: adminUser._id,
    });

    res.status(201).json({
      success: true,
      message: "Institute registered successfully",
      instituteId: institute._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, password and role required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.role !== role) {
      return res.status(403).json({ message: "Unauthorized role access" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  register,
  login,
  registerInstitute,
};