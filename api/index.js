import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
app.use(cors());
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

//middleware for handling the errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "error received";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
