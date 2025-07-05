import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import dashRoutes from "./routes/dashboards.js"
import donor from "./routes/donorroutes.js"
import Camps from "./routes/campsroutes.js"
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api",dashRoutes)
app.use("/api",donor)
app.use("/api",Camps);
// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/blood_donation")
.then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
