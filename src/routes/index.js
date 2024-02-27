import { Router } from "express";
import userRoutes from "./userRoute";
import accessControlRoutes from "./accessControlRoute";
import mobileSyncRoutes from "./mobileSyncRoutes";

const router = Router();
router.use("/user", userRoutes);
router.use("/accessControl", accessControlRoutes);
router.use("/sync", mobileSyncRoutes);
export default router;
