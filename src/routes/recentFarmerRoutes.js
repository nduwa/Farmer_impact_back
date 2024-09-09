import express from "express";
import FarmerController from "../controllers/recentFarmersController";
import verifyToken from "../middlewares/auth";
const FarmerRouter = express.Router();

FarmerRouter.get("/recentFarmers",verifyToken, FarmerController.getRecentFarmers);
FarmerRouter.put("/approve", FarmerController.approveFarmer);
FarmerRouter.put("/pending", FarmerController.approveApprovedFarmer);
FarmerRouter.post("/farmers", FarmerController.addApprovedFarmers);

export default FarmerRouter;
