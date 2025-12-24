
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
require("./DBConn/conn");

const GymRoutes = require('./Routes/gym');

app.use('/auth', GymRoutes);


app.get("/", (req,res)=>{
    res.send("hello form express server");
})

app.post("/add/user", (req,res)=>{
    const {name , age} = req.body; 
    console.log(name);
    console.log(age);
    res.send("user added successfully at 4000");
})

app.listen(PORT, (req,res)=>{
    console.log(`app is listning at port ${PORT} `);

})