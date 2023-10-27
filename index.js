import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import bookRouter from "./routes/bookRouter.js";
import authCheck from "./middleware/authMiddelware.js";
export const app = express();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch((err) => {
    console.error(err);
  });

// middelwares
app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

//auth routes
app.use("/", authRouter);
//book routes
app.use("/", authCheck, bookRouter);
