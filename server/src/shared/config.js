
const mongoURI = process.env.MONGODB_URI;
if(!mongoURI || mongoURI === ""){
    throw Error("MongoDB url is missing!!")
    
};

const port = process.env.PORT || 5000;

const env = process.env.NODE_ENV || "developement";

export const config =  {
    mongoURI,
    port,
    env,
};



