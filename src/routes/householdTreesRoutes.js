import express from "express";
import verifyRole from "../middlewares/verifyRole";
import verifyToken from "../middlewares/auth";
import HouseholdTreeServey from "../controllers/householdTreeServey";
const householdTreesRoutes = express.Router();

householdTreesRoutes.get("/allTrees", HouseholdTreeServey.getAllHouseholdTrees);
householdTreesRoutes.get("/allTreerecord", HouseholdTreeServey.insertRecord);
householdTreesRoutes.put(
  "/approve",
  verifyToken,
  verifyRole,
  HouseholdTreeServey.approveHouseholdTree
);
householdTreesRoutes.put(
  "/verify",
  verifyToken,
  verifyRole,
  HouseholdTreeServey.verifyHouseholdTree
);

export default householdTreesRoutes;
