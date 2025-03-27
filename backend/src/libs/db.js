import mongoose from "mongoose";

export const connectDb = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongodb connected to : ${conn.connection.host}`);
        
    } catch (error) {
        console.log("Mongo db connection error : ",error);
        
    }
}