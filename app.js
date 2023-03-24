import express from "express";
import userRouter from "./routes/user.js";

export const app = express();

// Middlewares
// req.body ko access krne ke liye kiya hai ye
app.use(express.json());
app.use(userRouter);
