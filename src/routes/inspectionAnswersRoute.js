import express from "express";
import InspectionAnswersController from "../controllers/inspectionAnswersController";

const inspectionAnswersRoutes = express.Router();

inspectionAnswersRoutes.get("/answer/:id", InspectionAnswersController.getAnswerByID)

export default inspectionAnswersRoutes