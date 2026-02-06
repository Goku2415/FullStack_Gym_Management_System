
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
require("./DBConn/conn");


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
