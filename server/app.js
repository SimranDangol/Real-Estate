import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

//routes import
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import listingRouter from "./routes/listing.routes.js";
import uploadRouter from "./routes/upload.routes.js";

const __dirname = path.resolve();

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
const corsOptions = { origin: process.env.URL, credentials: true };
app.use(cors(corsOptions));

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/listing", listingRouter);
app.use("/api/v1/upload", uploadRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  })

export { app };
