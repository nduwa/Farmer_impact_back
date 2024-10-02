import express from "express";
import verifyRole from "../middlewares/verifyRole";
import verifyToken from "../middlewares/auth";
import HouseholdTreeServey from "../controllers/householdTreeServey";
import verifyRoleToApprove from "../middlewares/verifyRoleToApprove";
const householdTreesRoutes = express.Router();

householdTreesRoutes.get("/allTrees", HouseholdTreeServey.getAllHouseholdTrees);
householdTreesRoutes.get(
  "/allTreessurvey",
  HouseholdTreeServey.getAllTreeSurveys
);
householdTreesRoutes.get("/allTreerecord", HouseholdTreeServey.insertRecord);
householdTreesRoutes.get(
  "/treedetails",
  HouseholdTreeServey.getTreeSurveyDetails
);
householdTreesRoutes.get(
  "/treesurveybydate",
  HouseholdTreeServey.getTreeSurveysByDate
);
householdTreesRoutes.put(
  "/approve",
  verifyToken,
  verifyRoleToApprove,
  HouseholdTreeServey.approveHouseholdTree
);
householdTreesRoutes.put(
  "/verify",
  verifyToken,
  verifyRole,
  HouseholdTreeServey.verifyHouseholdTree
);

export default householdTreesRoutes;
