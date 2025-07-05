import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin Dashboard
router.get("/admin", authMiddleware(["admin"]), (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

// Organization Dashboard
router.get("/organization", authMiddleware(["organization"]), (req, res) => {
  res.json({ message: "Welcome to Organization Dashboard" });
});

// Donor Dashboard
router.get("/donor", authMiddleware(["donor"]), (req, res) => {
  res.json({ message: "Welcome to Donor Dashboard" });
});

export default router;
