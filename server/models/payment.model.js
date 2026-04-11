import mongoose from "mongoose"
import User from "./user.model"
const paymentSchema = new mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
planId:String,
amount:Number,
credits:Number,
razorpayPaymentId:String,
razorpayOrderId:String,

status:{
    type:String,
    enum:["created" , "paod" , "failed"],
    default:"created",
}
},{timestamps:true})