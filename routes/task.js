import express from "express";
import {
  createTask,
  deleteTask,
  fetchUserTasks,
  updateTask,
  updateTaskStatus,
} from "../controller/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", isAuthenticated, createTask);
router.get("/all", isAuthenticated, fetchUserTasks);
router.put("/update/:id", isAuthenticated, updateTask);
router
  .route("/:id")
  .delete(isAuthenticated, deleteTask)
  .put(isAuthenticated, updateTaskStatus);

export default router;
