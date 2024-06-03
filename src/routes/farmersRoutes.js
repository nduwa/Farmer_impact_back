import express from "express";
import FarmersController from "../controllers/farmersController";
const farmersRouter = express.Router();

farmersRouter.get("/allFarmers", FarmersController.getAllFarmers);
export default farmersRouter;
