
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
require("./DBConn/conn");

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))// I have enables cors to share data between frontend and backend which are running on different ports and i have manually told that allow the data sharing between port 3000 form frontend. 


const GymRoutes = require('./Routes/gym');
const membershipRoutes = require('./Routes/membership');
const memberRoutes = require('./Routes/member');


app.use('/auth', GymRoutes);
app.use('/plans', membershipRoutes);
app.use('/members', memberRoutes);


app.get("/", (req,res)=>{
    res.send("hello form express server");
})

app.post("/add/user", (req,res)=>{
    const {name , age} = req.body; 
    res.send("user added successfully at 4000");
})

app.listen(PORT, ()=>{
    console.log(`app is listening at port ${PORT} `);

})
