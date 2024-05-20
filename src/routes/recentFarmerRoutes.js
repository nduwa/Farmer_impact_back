import express from "express";
import FarmerController from "../controllers/recentFarmersController";
import verifyToken from "../middlewares/auth";
const FarmerRouter = express.Router()

FarmerRouter.get('/recentFarmers', FarmerController.getRecentFarmers )

export default FarmerRouter