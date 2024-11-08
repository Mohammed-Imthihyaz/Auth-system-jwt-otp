import cors from "cors";
import express from "express";
import { connectDB } from "./db/connectDB.js";

import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT|| 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Use middleware to parse JSON
app.use(express.json()); // Corrected to use parentheses
app.use(cookieParser());
app.use("/api/auth", authRoutes); // Un-comment this if you want to use auth routes

app.get('/', (req, res) => {
    res.status(200).send("Welcome to root URL of Server");
});

app.listen(PORT, (error) => {
    connectDB();
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start", error);
});
