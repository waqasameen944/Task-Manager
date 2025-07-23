import { body, param } from "express-validator";

export const taskValidator = [
  body("title")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("description")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Status must be 'pending', 'in-progress' or 'completed'"),

  body("priority")
    .notEmpty()
    .withMessage("Priority is required")
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be 'low', 'medium' or 'high'"),

  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .withMessage("Due date must be a valid date in ISO 8601 format")
    .toDate(),
];

export const checkMongoId = param("id")
  .isMongoId()
  .withMessage("Invalid task ID");
