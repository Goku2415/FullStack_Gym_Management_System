
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./DBConn/conn.js";

connectDB();

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(cors({
    origin: "https://full-stack-gym-management-system-ih.vercel.app",
    credentials: true
}));
// I have enables cors to share data between frontend and backend which are running on different ports and i have manually told that allow the data sharing between port 3000 form frontend. 

// Routes
import GymRoutes from "../Routes/gym.js";
import membershipRoutes from "../Routes/membership.js";
import memberRoutes from "../Routes/member.js";

app.use("/api/auth", GymRoutes);
app.use("/api/plans", membershipRoutes);
app.use("/api/members", memberRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Vercel backend");
});

export default app;