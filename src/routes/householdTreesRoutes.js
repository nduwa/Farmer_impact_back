import express from "express";
//import HouseholdTreesController from "../controllers/householdTreesController";
import HouseholdTreeServey from "../controllers/householdTreeServey";
const householdTreesRoutes = express.Router();

householdTreesRoutes.get("/allTrees",HouseholdTreeServey.getAllHouseholdTrees);
householdTreesRoutes.get("/allTreerecord",HouseholdTreeServey.insertRecord);

export default householdTreesRoutes;
