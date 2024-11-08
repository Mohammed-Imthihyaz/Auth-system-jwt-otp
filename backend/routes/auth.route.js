import express from "express";
import { checkAuth, forgetpassword, login, logout, resetPassword, signup, verifyEamil } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router=express.Router();

router.get("/check-auth",verifyToken,checkAuth);
router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)

router.post("/verify-email",verifyEamil)
router.post("/forget-password",forgetpassword)

router.post("/reset-password/:token",resetPassword);


export default router;