const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./DBConn/conn");

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
app.use(cors({
   origin: [
    "http://localhost:5173",
    "https://full-stack-gym-management-system-ih.vercel.app"
  ],
  credentials: true
}));

// Routes
const GymRoutes = require("./Routes/gym");
const membershipRoutes = require("./Routes/membership");
const memberRoutes = require("./Routes/member");

app.use("/auth", GymRoutes);
app.use("/plans", membershipRoutes);
app.use("/members", memberRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running on Render 🚀");
});

// Start server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});