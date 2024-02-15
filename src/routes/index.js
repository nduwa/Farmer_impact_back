import { Router } from "express";
import userRoutes from "./userRoute";

const router = Router()
router.use('/user',userRoutes)
export default router