import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

//routes import
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(express.json({ limit: "16kb" }));

//routes
app.use("/api/v1/auth", authRouter);

export { app };
