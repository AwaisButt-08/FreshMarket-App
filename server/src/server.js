import app from "./app.js";
import dotenv from 'dotenv'


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Port is running on http://localhost:${PORT}` )
});