import mongoose from "mongoose";

const DB_NAME = "backend_project"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB conected !! DB HOST: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB connection error\n", error);
        process.exit(1); //nodejs feature
    }
}

export default connectDB;