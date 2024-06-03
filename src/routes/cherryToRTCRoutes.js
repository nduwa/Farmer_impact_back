import express from "express";
import CherryToRTCController from "../controllers/cherryToRTCController";

const cherryRoutes = express.Router();

cherryRoutes.post(
  "/add/:cherry_lot_id",
  CherryToRTCController.saveCherryToSubmit
);

export default cherryRoutes;
