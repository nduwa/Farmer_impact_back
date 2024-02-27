import { Router } from "express";
import userRoutes from "./userRoute";
import accessControlRoutes from "./accessControlRoute";
import CoffeePurchaseRoutes from "./coffeePurchaseRouter";


const router = Router()
router.use('/user',userRoutes)
router.use('/accessControl',accessControlRoutes)
router.use('/coffeePurchase',CoffeePurchaseRoutes)

export default router