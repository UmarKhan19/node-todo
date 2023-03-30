import ErrorHandler from "../middlewares/error.js";
import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/features.js";

// *******************************
// Get all users
// *******************************
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    if (!users) return next(new ErrorHandler("No users found", 404));

    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

// *******************************
// Create a user
// *******************************
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendToken(user, res, 200, "User created successfully");
  } catch (error) {
    next(error);
  }
};

// *******************************
// Login a user
// *******************************
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token } = req.cookies;

    if (token) return next(new ErrorHandler("User is already logged in", 400));

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User does not exist with this email", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Incorrect email or password", 400));

    sendToken(user, res, 200, "User logged in successfully");
  } catch (error) {
    next(error);
  }
};

// *******************************
// Logout user
// *******************************
export const logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({ success: true, message: "User logged out Successfully" });
  } catch (error) {
    next(error);
  }
};

// *******************************
// Get User's Own Profile
// *******************************
export const getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// *******************************
// Get single user
// *******************************
export const getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) return next(new ErrorHandler("User not found", 404));

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// *******************************
// Update user
// *******************************
export const updateUser = async (req, res, next) => {};

// *******************************
// Delete user
// *******************************
export const deleteUser = async (req, res, next) => {};
