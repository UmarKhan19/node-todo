import jwt from "jsonwebtoken";

export const sendToken = (user, res, statusCode, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("token", token, { httpOnly: true, maxAge: 15 * 60 * 1000 })
    .json({ success: true, message: message });
};