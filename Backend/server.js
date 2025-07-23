import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import dashRoutes from "./routes/dashboards.js"
import donor from "./routes/donorroutes.js"
import Camps from "./routes/campsroutes.js"
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import cors from "cors";


dotenv.config();
connectDB();
const app = express();


app.use(cors({
      origin: 'http://localhost:5173',   // ✅ Your frontend origin
  credentials: true,   
}));
app.use('/uploads', express.static('uploads'));
// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api",dashRoutes)
app.use("/api",donor)
app.use("/api",Camps);

// Start Server
const PORT = process.env.PORT  || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
