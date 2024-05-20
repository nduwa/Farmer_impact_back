import express from "express";
import TrainingController from "../controllers/trainingsController";
const trainingsRouter = express.Router();

trainingsRouter.get(
  "/allTrainings",
TrainingController.getAllTraining
);
trainingsRouter.put(
  "/update/courseId",
TrainingController.editCourse
);
trainingsRouter.delete(
  "/delete/courseId",
TrainingController.deleteCourse
);
export default trainingsRouter;
