import { User } from "../model/user.js";

// *******************************
// Get all users
// *******************************
export const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.json({ success: true, users });
};

// *******************************
// Create a user
// *******************************
export const createUser = async (req, res) => {
  const { name, gender, age } = req.body;

  await User.create({
    name,
    gender,
    age,
  });

  res.status(200).json({ success: true, message: "User has been created" });
};

// *******************************
// Get single user
// *******************************
export const getSingleUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  res.status(200).json({ success: true, user });
};
