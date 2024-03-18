import { Router } from "express";
import userRoutes from "./userRoute";
import accessControlRoutes from "./accessControlRoute";
<<<<<<< HEAD
import CoffeePurchaseRoutes from "./coffeePurchaseRouter";


const router = Router()
=======
import mobileSyncRoutes from "./mobileSyncRoutes";
import CoffeePurchaseRoutes from "./coffeePurchaseRouter";
const router = Router();
router.use("/user", userRoutes);
router.use("/accessControl", accessControlRoutes);
router.use("/sync", mobileSyncRoutes);
>>>>>>> fc108a494e1b2c2d03e8f116e23aa9f5129a9fec
router.use('/user',userRoutes)
router.use('/accessControl',accessControlRoutes)
router.use('/coffeePurchase',CoffeePurchaseRoutes)

<<<<<<< HEAD
export default router
=======
export default router
>>>>>>> fc108a494e1b2c2d03e8f116e23aa9f5129a9fec
