import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/authentication.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

const connect = () => {
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Connected to DB");
    }).catch((err) => {
        throw err;
    });
}
app.use(express.static("build"));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/api/authentication",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/videos",videoRoutes);
app.use("/api/comments",commentRoutes);
app.use((err, req, res, next) => {
    const status = err.json || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message,
    })
})

app.listen(PORT,()=>{
    connect();
    console.log("Connected");
})