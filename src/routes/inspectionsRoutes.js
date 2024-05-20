import express from "express";
import InspectionsController from "../controllers/inspectionsController";
const inspectionsRouter = express.Router();

inspectionsRouter.get(
  "/allInspections",
  InspectionsController.getAllUserInspections
);
export default inspectionsRouter;
