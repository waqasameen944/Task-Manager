import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async () => {
  try {
    const state = mongoose.connection.readyState;
    if (state === 1) return console.log("Data base is already connected");
    if (state === 2) return console.log("Database is connecting");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Database is conected");
  } catch (error) {
    console.log(error.message);
  }
};

export default dbConnect;
