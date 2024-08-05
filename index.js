import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import ShipRouter from "./Routers/ShipRouter.js";
import authRouter from "./Routers/authRouter.js";
import { StatusCodes } from "http-status-codes";
import cookieParser from "cookie-parser";
import userRouter from "./Routers/userRoutr.js"; // Note the corrected file name
import { authenticateUser } from "./middleware/authMiddleware.js";
import path from "path";
import cors from 'cors';
import { dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));



app.use("/api/v1/auth", authRouter);
app.use("/api/v1/ships", authenticateUser, ShipRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./public")));
const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "Data received", data: req.body });
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(StatusCodes.BAD_REQUEST).json({ msg: "something went wrong" });
});

app.use(errorHandlerMiddleware);
