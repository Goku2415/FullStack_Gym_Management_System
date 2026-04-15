import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./DBConn/conn.js";

// ✅ Load env FIRST
dotenv.config();

// ✅ Connect DB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS
app.use(cors({
  origin: "https://full-stack-gym-management-system-ih.vercel.app",
  credentials: true
}));

// ✅ Routes
import GymRoutes from "./Routes/gym.js";
import membershipRoutes from "./Routes/membership.js";
import memberRoutes from "./Routes/member.js";

app.use("/auth", GymRoutes);
app.use("/plans", membershipRoutes);
app.use("/members", memberRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running on Render 🚀");
});

// ✅ VERY IMPORTANT FOR RENDER
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});