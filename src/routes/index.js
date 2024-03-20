import { Router } from "express";
import userRoutes from "./userRoute";
import accessControlRoutes from "./accessControlRoute";
import mobileSyncRoutes from "./mobileSyncRoutes";
import CoffeePurchaseRoutes from "./coffeePurchaseRouter";
import stationRoutes from "./stationRoute";
import daylotsRoutes from "./dayLotsRoute";
import harvestRouter from "./harvestRoute";
const router = Router();
router.use("/user", userRoutes);
router.use("/accessControl", accessControlRoutes);
router.use("/sync", mobileSyncRoutes);
router.use('/user',userRoutes)
router.use('/accessControl',accessControlRoutes)
router.use('/coffeePurchase',CoffeePurchaseRoutes)
router.use('/station',stationRoutes)
router.use('/lots',daylotsRoutes)
router.use("/harvests",harvestRouter)

export default router
