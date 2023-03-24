import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
});

export const User = mongoose.model("user", userSchema);
