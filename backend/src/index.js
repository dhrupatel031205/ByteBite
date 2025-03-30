import express from 'express'
import authRoute from './routes/auth.route.js'
import dotenv from 'dotenv';
import { connectDb } from './libs/db.js';
import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config();

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api/auth',authRoute)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
    connectDb()
})