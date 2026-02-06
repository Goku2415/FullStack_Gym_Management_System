const mongoose = require('mongoose')
const memberSchema = mongoose.Schema({
    name:{
        type:String,
        required : true,
    },
    mobileNo:{
        type: String
    },
    address:{
        type:String,
    },
    membership:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'membership',
        required: true
    },
    gym:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"gym",
        required:true
    },
    profilePic:{
        type:String,
        default:"Active"
    },
    status:{
        type:String,
        default:"ACtive"
    },
    lastPayment:{
        type:Date,
        default:new Date()
    },
    nextBillDate:{
        type:Date,
        required:true        
    }
},{timestamps:true});
//timestamps: true will automatically add createdAt and updatedAt fields to the schema at the terminal where the history of created and updated timing will be stored.

const memberModel = mongoose.model("member",memberSchema);
module.exports = memberModel;