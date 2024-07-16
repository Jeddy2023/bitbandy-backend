import express from "express";
import dotenv from "dotenv";
import dbConnect from "../config/database";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "../routes/auth.routes";
import eventRoutes from "../routes/event.routes";
import ticketRoutes from "../routes/ticket.routes";
import PaystackRoutes from "../routes/paystack.routes";
import { Request, Response, NextFunction } from "express";
dotenv.config();

dbConnect();
const app: express.Application = express();
app.use(express.json({ limit: "50mb" }));
const corsOptions = {
  origin: '*', // Allow requests from all origins (adjust for production)
  credentials: true, // Allow cookies for CORS requests
  allowedHeaders: '*', // Allow all headers (adjust as needed)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow all HTTP methods
};

try {
  mongoose.connect(process.env.MONGODB_CONNECTION as string)
  .then(() => {
    console.log("connected to database");
  });
} catch (error) {
  process.exit(1);
}

app.use(cors(corsOptions));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/tickets", ticketRoutes);
app.use("/api/v1/paystack", PaystackRoutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error.stack);
  return res.status(error.statusCode).json({ message: error.message });
});

app.use((req: Request, res: Response) => {
  return res.status(404).json({ message: "Oops, not found" });
})

export default app;