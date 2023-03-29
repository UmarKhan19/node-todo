import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.js";

export const app = express();

config({ path: "./data/config.env" });

// Middlewares
// req.body ko access krne ke liye kiya hai ye
app.use(express.json());
app.use(cookieParser());

// Using routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

// Using error handler
app.use(errorHandler);
