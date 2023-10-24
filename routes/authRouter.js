import express from "express";
import {
  login,
  logout,
  signup,
  createAdmin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/create-admin", createAdmin);
export default router;
