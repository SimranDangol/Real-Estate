import express from "express";
import { deleteUser, updateUser, getUserListings} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.patch("/update", verifyJWT, updateUser);
router.delete("/delete", verifyJWT, deleteUser);
router.get("/listings/:id", verifyJWT, getUserListings);


export default router;
