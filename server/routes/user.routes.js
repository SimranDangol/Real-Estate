import express from "express";
import { deleteUser, updateUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.patch("/update", verifyJWT, updateUser);
router.delete("/delete", verifyJWT, deleteUser);

export default router;
