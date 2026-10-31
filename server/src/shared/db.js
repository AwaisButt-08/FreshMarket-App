import mongoose from 'mongoose'
import { config } from './config.js'

export const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(config.mongoURI);
    if(connect){
        console.log("MongoDB is connected Successfully!")
    }
    } catch (error) {
        throw error("MongoDB is not connected!!");
    }
    
};