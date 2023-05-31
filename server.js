import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
//import 'bootstrap/dist/css/bootstrap.css';
//import cors1 from 'cors';
import helmet from 'helmet'; // Import the helmet package

const app = express();

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('connected to mongodb')
  } catch (err) {
    console.log(err);
  }
};

app.use(helmet()); // Use the helmet middleware to set security headers
//app.use(cors());      //5173
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
//app.use(cors1({ origin: "http://localhost:8800", credentials: true }));
app.use(cors({ origin: "https://6473d799ae27a57fb46fe762--grand-banoffee-878364.netlify.app", credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errMessage = err.message || "something went wrong";
  return res.status(errorStatus).send(errMessage);
});

app.listen(8800, () => {
  connect();
  console.log("Backend server is running!");
});