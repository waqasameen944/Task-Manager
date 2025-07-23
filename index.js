import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import dbConnect from "./config/db.js";

//rest object
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

//db
dbConnect();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1/tasks", taskRoutes);

//error middleware
app.use(errorMiddleware);

//server listen
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
