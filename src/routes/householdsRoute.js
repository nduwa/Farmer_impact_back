import express from "express";
import HouseholdController from "../controllers/householdsController";
const householdRouter = express.Router();

householdRouter.get("/allHouseholds", HouseholdController.getAllHouseholds);
export default householdRouter;
