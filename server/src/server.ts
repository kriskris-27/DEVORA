import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { mechanicsRouter } from "./routes/mechanics.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: ["http://localhost:5173"], credentials: false }));
app.use(express.json());

// Simple request/response logger
app.use((req, res, next) => {
    const start = Date.now();
    console.log(`[REQ] ${req.method} ${req.originalUrl}`, { query: req.query, body: req.body });
    res.on('finish', () => {
        const ms = Date.now() - start;
        console.log(`[RES] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`);
    });
    next();
});

app.get("/",(req,res)=>{
    res.status(200).json({
        message:'hello from backend breakdown buddy'
    })
})

app.use("/api/mechanics", mechanicsRouter);

app.listen(PORT , ()=>{
    console.log(`🚀 Server running on port http://localhost:${PORT}`);
})

