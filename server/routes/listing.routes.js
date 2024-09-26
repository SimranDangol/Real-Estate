import express from "express";
import { deleteUser, updateUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createListing, deleteListing, getListing } from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/create", verifyJWT, createListing);
router.delete("/delete/:id", verifyJWT, deleteListing);
router.get('/get/:id', getListing);

export default router;
