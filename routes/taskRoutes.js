import express from "express";
import {
  createTask,
  deleteTask,
  getTaskBetweenDate,
  getTaskByDueDate,
  getTaskById,
  getTasks,
  getTaskStatusSummary,
  updateTask,
} from "../controllers/taskControllers.js";

import { taskValidator, checkMongoId } from "../validators/taskValidator.js";
import validationResult from "../middleware/errorValidator.js";

//router object
const router = express.Router();

//routes
// POST /api/tasks
router.post("/createTask", taskValidator, validationResult, createTask);

// GET /api/tasks
router.get("/getTasks", getTasks);

// GET /api/tasks/:id
router.get("/getById/:id", checkMongoId, validationResult, getTaskById);

// PUT /api/tasks/:id
router.put("/updateTask/:id", checkMongoId, validationResult, updateTask);

// DELETE /api/tasks/:id
router.delete("/deleteTask/:id", checkMongoId, validationResult, deleteTask);

// GET /api/tasks/due-today
router.get("/getTaskByDueDate", getTaskByDueDate);

// GET /api/tasks?start=2025-07-01&end=2025-07-31
router.get("/getTaskBetweenDate", getTaskBetweenDate);

// GET /api/tasks/status-summary
router.get("/getTaskStatusSummary", getTaskStatusSummary);

export default router;
