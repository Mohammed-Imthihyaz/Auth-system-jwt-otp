import mongoose from "mongoose"; 
import dotenv from "dotenv";
dotenv.config();

export  const connectDB=async()=>{
    try{
        console.log(`mongoDB url: ${process.env.DB_URI}`);
        const conn =await mongoose.connect(process.env.DB_URI);
        console.log(`mongoDB connected: ${conn.connection.host}`);

    }catch(error){
        console.log("error connection to mongoDB",error.message);
        process.exit(1);
    }
}