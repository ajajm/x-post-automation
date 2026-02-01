import express from "express"
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({
    path: "./src/.env" 
});

const app = express();

// Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,

}));

// Add CSP header that allows API calls
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; connect-src 'self' http://localhost:3000"
    );
    next();
});

// Resource import 
import devRouter from "./routes/dev.routes.js";

// Routes
app.use("/v1/dev", devRouter);

export { app }