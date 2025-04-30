import mongoose from "mongoose";
import "dotenv/config";
import chalk from "chalk";

// Database building
const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
            console.log(chalk.cyan("Database server connected..."))
    } catch (error) {
        console.log(error)
    }
}

export default  connectDB;