import express from "express";
import userRouter from "./routes/user.js";
import { config } from "dotenv";

export const app = express();

config({ path: "./data/config.env" });

// Middlewares
// req.body ko access krne ke liye kiya hai ye
app.use(express.json());
app.use(userRouter);
