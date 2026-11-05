import { Router } from "express";
import { requireAuth, requireRole } from "../auth/auth.middleware.js";
import { assertStoreOwner } from "../../shared/ownership.js";
import { updateStore } from "./store.service.js";

const router = Router();

router.patch("/:id",requireAuth,requireRole("vendor"),(async(req,res,next)=>{
    try {
        const register = await updateStore(req.body);

        res.status(201).json(register);
    } catch (error) {
        next(error);
    }
}));


export default router;