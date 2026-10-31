import { Router } from "express";
import { getMe, loginUser, logoutUser, refreshAccessToken, registerUser, verifyOtp } from "./auth.services.js";

import { validateRegister,validateVerifyOtp,validateLogin, requireAuth } from "./auth.middleware.js";

const router = Router();


router.post("/register",validateRegister,(async(req,res,next)=>{
    try {
        const register = await registerUser(req.body);

        res.status(201).json(register);
    } catch (error) {
        next(error);
    }
}));


router.post("/verify-otp",validateVerifyOtp,(async(req,res,next)=>{
    try {
        const result = await verifyOtp(req.body);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}));


router.post("/login",validateLogin,(async(req,res,next)=>{
    try {
        const result = await loginUser(req.body);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}));


router.post("/refresh",(async(req,res,next)=>{
    try {
        const result = await refreshAccessToken(req.body);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}));


router.post("/logout",requireAuth,(async(req,res,next)=>{
    try {
        const result = await logoutUser(req.user.id);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}))


router.get("/me",requireAuth,(async(req,res,next)=>{
    try {
        const result = await getMe(req.user.id);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}));


export default router;