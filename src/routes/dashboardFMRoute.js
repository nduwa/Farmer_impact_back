import express from "express";
import DashboardFMController from "../controllers/dashboardFMController";
import FMtoDashboard from "../controllers/FMtoDashboard";

const dashboardFMRoutes = express.Router();

dashboardFMRoutes.get('/pushSeason', DashboardFMController.fetchAllAndPush);
dashboardFMRoutes.get('/getAllfromFM', FMtoDashboard.GetAllFMData);

export default dashboardFMRoutes;