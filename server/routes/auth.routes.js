import { Router } from "express";
import { google, login, register } from "../controllers/auth.controller.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/google").post(google);

export default router;
