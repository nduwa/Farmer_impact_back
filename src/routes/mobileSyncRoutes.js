import express from "express";
import mobileSyncController from "../controllers/mobileSyncController.js";
const mobileSyncRoutes = express.Router();

mobileSyncRoutes.get("/groups/:stationId", mobileSyncController.retrieveGroups);
mobileSyncRoutes.get(
  "/stations/:userId",
  mobileSyncController.retrieveStations
);
mobileSyncRoutes.get(
  "/houseHolds/:stationId",
  mobileSyncController.retrieveHouseholds
);
mobileSyncRoutes.get(
  "/trainingModules",
  mobileSyncController.retrieveTrainingModules
);
mobileSyncRoutes.get("/crops", mobileSyncController.retrieveCrops);
mobileSyncRoutes.get(
  "/inspectionQuestions",
  mobileSyncController.retrieveInspectionQuestions
);
mobileSyncRoutes.get(
  "/farmers/:stationId",
  mobileSyncController.retrieveFarmers
);

export default mobileSyncRoutes;
