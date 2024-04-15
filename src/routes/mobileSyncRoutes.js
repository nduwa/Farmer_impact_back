import express from "express";
import mobileSyncController from "../controllers/mobileSyncController.js";
const mobileSyncRoutes = express.Router();

mobileSyncRoutes.get("/groups/:stationId", mobileSyncController.retrieveGroups);
mobileSyncRoutes.get(
  "/stations/:userId",
  mobileSyncController.retrieveStations
);
mobileSyncRoutes.get(
  "/suppliers/:stationId",
  mobileSyncController.retrieveSupplier
);
mobileSyncRoutes.get(
  "/houseHolds/:stationId",
  mobileSyncController.retrieveHouseholds
);
mobileSyncRoutes.get(
  "/trainingModules",
  mobileSyncController.retrieveTrainingModules
);
mobileSyncRoutes.get("/seasons", mobileSyncController.retrieveSeason);
mobileSyncRoutes.get(
  "/inspectionQuestions",
  mobileSyncController.retrieveInspectionQuestions
);
mobileSyncRoutes.get(
  "/inspectionAnswers",
  mobileSyncController.retrieveAnswers
);
mobileSyncRoutes.get(
  "/farmers/:stationId",
  mobileSyncController.retrieveFarmers
);

mobileSyncRoutes.post("/journal", mobileSyncController.submitJournal);

export default mobileSyncRoutes;
