import mongoose from "mongoose";
import Task from "../models/taskModel.js";
import ErrorHandler from "../utils/errorHandler.js";
// POST /api/tasks
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, dueDate, priority } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      priority,
    });
    task.save();

    res.status(201).json({
      success: true,
      message: "task created successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/tasks
export const getTasks = async (req, res, next) => {
  try {
    const task = await Task.find();
    if (!task) return next(new ErrorHandler("Task not found", 404));

    res.status(200).json({
      success: true,
      Count: task.length,
      task,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/tasks/:id
export const getTaskById = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Check if ID is missing or not a valid MongoDB ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid or missing task ID", 400));
    }

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/tasks/:id
export const updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) return next(new ErrorHandler("Task not found", 404));

    res.status(200).json({
      success: true,
      message: "task updated successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    res.status(200).json({
      success: true,
      message: "task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/tasks/due-today
export const getTaskByDueDate = async (req, res, next) => {};

// GET /api/tasks?start=2025-07-01&end=2025-07-31
export const getTaskBetweenDate = async (req, res, next) => {};

// GET /api/tasks/status-summary
export const getTaskStatusSummary = async (req, res, next) => {};
