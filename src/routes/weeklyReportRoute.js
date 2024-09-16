import express from "express";
import FieldReportController from "../controllers/weeklyReportController";
const weeklyReportRoute = express.Router();

weeklyReportRoute.get("/weeklyReport", FieldReportController.getFieldReport);
export default weeklyReportRoute;
