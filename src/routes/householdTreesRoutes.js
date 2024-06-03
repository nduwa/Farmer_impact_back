import express from "express";
import HouseholdTreesController from "../controllers/householdTreesController";
const householdTreesRoutes = express.Router();

householdTreesRoutes.get(
  "/allTrees",
  HouseholdTreesController.getAllHouseholdTrees
);
export default householdTreesRoutes;
