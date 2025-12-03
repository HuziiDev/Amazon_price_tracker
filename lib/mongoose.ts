import mongoose from 'mongoose';

let isConnected = false;
export const conenctToDb = async () => {
    mongoose.set('strictQuery', true);
    if(!process.env.MONGO_URI) return console.log("MONGO_URI is not defined");
    if(isConnected){
        console.log("Already connected to database");
        return;
    }

    try {
        await  mongoose.connect(process.env.MONGO_URI)
     
        isConnected = true;
        console.log("Connected to database successfully");
    } catch (error: any) {
        console.log(error.message)
    }

}