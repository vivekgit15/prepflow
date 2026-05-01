import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import connectDB from "./config/connectDB.js";

import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.routes.js";
import paymentRouter from "./routes/payment.routes.js";


connectDB()
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())

// const allowedOrigins = [
//   process.env.FRONTEND_URL || "https://prepflow-xi.vercel.app"
// ]


app.use(cors({
    origin: process.env.FRONTEND_URL || "https://prepflow-xi.vercel.app",
     credentials: true,
}))

app.use('/api/auth' , authRouter)
app.use('/api/user' , userRouter)
app.use('/api/interview' , interviewRouter)
app.use('/api/payment' , paymentRouter)


app.get('/' , (req,res) =>{
    return res.send("Server is running") 
})

app.listen(PORT , ()=>{
    console.log(`Server is runnin on port ${PORT}`) 
}) 