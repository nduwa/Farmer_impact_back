import { Router } from "express";
import userRoutes from "./userRoute";
import accessControlRoutes from "./accessControlRoute";

const router = Router()
router.use('/user',userRoutes)
router.use('/accessControl',accessControlRoutes)
export default router