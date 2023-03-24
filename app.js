import express from "express";
import mongoose from "mongoose";

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017", { dbName: "backendAPI" })
  .then(() => {
    console.log("connected to the database");
  })
  .catch((e) => {
    console.log(e);
  });

const userSchema = mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
});

const User = mongoose.model("user", userSchema);

app.get("/", (req, res) => {
  res.send("helooooooooo");
});

app.listen(8000, () => {
  console.log(`Server is running on http://localhost:8000`);
});
