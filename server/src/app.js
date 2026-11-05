import express from 'express'
import cors from 'cors'
import { connectDB } from './shared/db.js';
import "dotenv/config";
import mongoose from 'mongoose'
import authRoutes from './modules/auth/auth.routes.js'

const app = express();


app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

connectDB();

app.get("/",(req,res)=>{
    res.status(200).send("Api is Working!!")
    
});
app.get("/health",(req,res)=>{
    const connect = mongoose.connection.readyState === 1;

    if(!connect){
        res.status(503).json({
            status:"degraded",
            db: "disconnected",
        })
    };

    res.status(200).json({
        status:"Ok!",
        db: "Connected"
    })
});

app.use('/api/auth', authRoutes)
// app.get("/health",(req,res)=>{
//     res.status(200).json({
//         message: "OK!"
//     });
    
// });


export default app;