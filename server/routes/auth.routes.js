import { Router } from "express";
import {
  google,
  login,
  register,
  signout,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, signout);
router.route("/google").post(google);

export default router;
