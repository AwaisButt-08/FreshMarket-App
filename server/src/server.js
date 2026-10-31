import 'dotenv/config';
import app from "./app.js";
import { config } from './shared/config.js';


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Port is running on http://localhost:${PORT}` )
});