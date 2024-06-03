import express from "express";
import DryingControler from "../controllers/apparchmentController";
const dryingRoutes = express.Router();

dryingRoutes.get("/dryings", DryingControler.getAllDryings);

export default dryingRoutes;
