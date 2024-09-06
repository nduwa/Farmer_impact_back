import express from "express";
import DashboardFMController from "../controllers/dashboardFMController";
import FMtoDashboard from "../controllers/FMtoDashboard";
import DashboardtoFM from "../controllers/DashboardtoFM";

const dashboardFMRoutes = express.Router();

dashboardFMRoutes.get('/pushSeason', DashboardFMController.fetchAllAndPush);
dashboardFMRoutes.get('/getAllfromFM', FMtoDashboard.GetAllFMData);
dashboardFMRoutes.get('/pushalltoFM', DashboardtoFM.PushAllFMData);

export default dashboardFMRoutes;