import express from "express";
import DashboardFMController from "../controllers/dashboardFMController";

const dashboardFMRoutes = express.Router();

dashboardFMRoutes.get('/pushSeason', DashboardFMController.fetchAllAndPush)

export default dashboardFMRoutes;