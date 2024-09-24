import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.patch("/update", verifyJWT, updateUser);

export default router;
