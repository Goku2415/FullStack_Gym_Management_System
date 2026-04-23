const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./DBConn/conn");

// Connect DB
connectDB();

const app = express();


app.use(cors());



app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);

    if (
      origin.includes("vercel.app") || 
      origin === "http://localhost:5173"
    ) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));







// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());






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