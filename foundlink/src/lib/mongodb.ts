import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

export default async function connectToDatabase(){
    if(mongoose.connection.readyState === 1){
        return mongoose;
    }
    const opts = {
        bufferCommands: false,
    }
    await mongoose.connect(MONGODB_URI,opts);
    return mongoose;
}