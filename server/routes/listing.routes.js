import express from "express";
import { deleteUser, updateUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createListing } from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/create", verifyJWT, createListing);

export default router;
