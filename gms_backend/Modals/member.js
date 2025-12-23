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
})


const memberModel = mongoose.Model("member",memberSchema);
module.exports = memberModel;