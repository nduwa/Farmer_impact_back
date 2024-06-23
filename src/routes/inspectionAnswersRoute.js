import express from "express";
import InspectionAnswersController from "../controllers/inspectionAnswersController";
import verifyToken from "../middlewares/auth";
const inspectionAnswersRoutes = express.Router();

inspectionAnswersRoutes.get(
  "/answer/:id",
  InspectionAnswersController.getAnswerByID
);
inspectionAnswersRoutes.post(
  "/create/:id",
  verifyToken,
  InspectionAnswersController.addNewInspectionAnswer
);
inspectionAnswersRoutes.delete(
  "/delete",
  InspectionAnswersController.deleteInspectionAnswer
);
inspectionAnswersRoutes.put(
  "/update",
  InspectionAnswersController.editInspectionAnswer
);

export default inspectionAnswersRoutes;
