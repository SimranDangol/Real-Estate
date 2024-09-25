import express from "express";
import { uploadImage } from "../controllers/upload.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/image", upload.array("images", 6), uploadImage);

export default router;
