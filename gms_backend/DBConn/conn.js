// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/gymBackend')
// .then(()=>
//     console.log("DB connection successful"))
// .catch(err=>{
//         console.log("DB connection failed", err);
//     })

// module.exports = mongoose;


import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connection successful");
  } catch (err) {
    console.error("DB connection failed", err);
    process.exit(1);
  }
};

export default connectDB;