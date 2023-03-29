import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendToken } from "../utils/features.js";

// *******************************
// Get all users
// *******************************
export const getAllUsers = async (req, res) => {
  const users = await User.find({});

  if (!users)
    return res.status(404).json({ success: false, message: "No users found" });

  res.status(200).json({ success: true, users });
};

// *******************************
// Create a user
// *******************************
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res
      .status(400)
      .json({ message: "User already exists with this email" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashedPassword });

  sendToken(user, res, 200, "User created successfully");
};

// *******************************
// Login a user
// *******************************
export const login = async (req, res) => {
  const { email, password } = req.body;
  const { token } = req.cookies;

  if (token)
    return res
      .status(404)
      .json({ success: false, message: "User is already logged in" });

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res
      .status(404)
      .json({ message: "User does not exist with this email" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res
      .status(400)
      .json({ success: false, message: "Incorrect email or password" });

  sendToken(user, res, 200, "User logged in successfully");
};

// *******************************
// Logout user
// *******************************
export const logout = async (req, res) => {
  res
    .status(200)
    .clearCookie("token")
    .json({ success: true, message: "User logged out Successfully" });
};

// *******************************
// Get User's Own Profile
// *******************************
export const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, user });
};

// *******************************
// Get single user
// *******************************
export const getSingleUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  res.status(200).json({ success: true, user });
};

// *******************************
// Update user
// *******************************
export const updateUser = async (req, res) => {
  const { id } = req.params;

  const { name, email, password } = req.body;

  let user = await User.findById(id);

  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  user = await User.findByIdAndUpdate(id, { name, email, password });
};

// *******************************
// Delete user
// *******************************
export const deleteUser = async (req, res) => {};
