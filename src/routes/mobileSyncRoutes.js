import express from "express";
import mobileSyncController from "../controllers/mobileSyncController.js";
import multer from "multer";
import fs from "fs";

const mobileSyncRoutes = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let str = req.query.filepath;
    const splitStr = str.split("/");
    splitStr.pop();
    const dir = splitStr.join("/");
    const directory = `${dir}`;

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    cb(null, directory);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

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

mobileSyncRoutes.post(
  "/training",
  upload.single("attendance_sheet"),
  (req, res, next) => {
    next();
  },
  mobileSyncController.submitTraining
);

mobileSyncRoutes.post("/journal", mobileSyncController.submitJournal);
mobileSyncRoutes.post("/inspection", mobileSyncController.submitInspection);

mobileSyncRoutes.post(
  "/farmers/registration",
  mobileSyncController.submitFarmer
);
mobileSyncRoutes.post(
  "/groups/status",
  mobileSyncController.groupStatusChanges
);
mobileSyncRoutes.post(
  "/farmer/assign",
  mobileSyncController.groupAssignChanges
);
mobileSyncRoutes.post(
  "/farmer/report",
  mobileSyncController.submitFieldWeeklyReports
);

mobileSyncRoutes.post("/farmer/trees", mobileSyncController.submitFarmerTrees);
mobileSyncRoutes.post("/farmer/farms", mobileSyncController.submitFarms);

export default mobileSyncRoutes;
