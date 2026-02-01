import dotenv from 'dotenv';
import connectDB from "./database/connect.database.js";
import { app } from "./app.js"

dotenv.config({
    path: "./.env" 
});

await connectDB()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running at PORT : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Mongo db connection failed !!", err);
});
   