import ErrorHandler from "../middlewares/error.js";
import { Task } from "../model/task.js";

// ********************************************
// Create New Task
// ********************************************
export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description)
      return next(
        new ErrorHandler("Please enter both title and description", 400)
      );

    const task = await Task.create({ title, description, user: req.user });
    res.json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

// ********************************************
// Fetch user's Tasks
// ********************************************
export const fetchUserTasks = async (req, res, next) => {
  try {
    const userTasks = await Task.find({ user: req.user.id });
    if (userTasks.length === 0)
      return next(new ErrorHandler("You have no tasks at the moment", 404));
    res.json({
      message: "All of your tasks",
      "your total tasks": userTasks.length,
      userTasks,
    });
  } catch (error) {
    next(error);
  }
};

// ********************************************
// Delete Task
// ********************************************
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.find({ _id: req.params.id });
    if (task.length === 0)
      return next(new ErrorHandler("No Task found with the id", 404));
    await Task.deleteOne({ _id: req.params.id });
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// ********************************************
// Update Task
// ********************************************
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    let task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("No Task found with the id", 404));
    if (!title || !description)
      return next(
        new ErrorHandler("Please enter both title and description", 400)
      );

    task.title = title;
    task.description = description;
    task = await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated successfully",
      updatedTask: task,
    });
  } catch (error) {
    next(error);
  }
};

// ********************************************
// Update Task Status
// ********************************************
export const updateTaskStatus = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("No Task found with the id", 404));

    task.isCompleted = !task.isCompleted;
    task = await task.save();

    res.status(200).json({
      success: true,
      message: "Task Status Updated successfully",
      updatedTask: task,
    });
  } catch (error) {
    next(error);
  }
};
